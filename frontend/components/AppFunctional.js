
import React, { useState, useEffect } from 'react'

export default function AppFunctional(props) {

const [initialMessage, setInitialMessage] = useState('')
const [initialEmail, setInitialEmail] = useState('')
const [initialSteps, setInitialSteps] = useState(0)
const [currentUserIndex, setcurrentUserIndex] = useState(0)
const [currentCoordinate, setCurrentCoordinate] = useState()
const [error, setError] = useState()
const[initialIndex, setInitialIndex] = useState(4)

  const grid = [
    [1,1],[1,2],[1,3],
    [2,1],[2,2],[2,3],
    [3,1],[3,2],[3,3]
  ]
 
  const buttonDirection = {
    left: (index, block) => block.toString() !== "2,1" && block.toString() !== "1,1" && block.toString() !== "3,1"? index - 1 : index, 
    right: (index, block) => block.toString() !== "1,3" && block.toString() !== "2,3" && block.toString() !== "3,3"? index + 1 : index,
    up: (index, block) => block.toString() !== "1,1" && block.toString() !== "1,2" && block.toString() !== "1,3"? index - 3 : index,
    down: (index, block) => block.toString() !== "3,1" && block.toString() !== "3,2" && block.toString() !== "3,3"? index + 3: index
  }

function errorHandling (coordinates) {
  console.log(`line 27`, coordinates)
 coordinates.toString() === "2,1" ? setError("You can't move left") : null;
}

  function getXY(grid,idx) {
    const coordinatess = grid.find((block,index) => {
      
      if (index === idx){
        return [block[0], block[1]];
      }
    })
      return coordinatess;
  }

  useEffect(()=> {
 if (initialSteps < 2){
      setcurrentUserIndex(4)
 } 
}, [initialSteps])

  useEffect(()=> {
    
    setCurrentCoordinate(getXY(grid, currentUserIndex))
   
  }, [currentUserIndex])
  
  function reset() {
    setInitialEmail('');
    setInitialSteps(0);
    setInitialMessage('');
    setcurrentUserIndex(4);
  }

  function getNextIndex(direction, grid, e, currentUserIndex) {
    let coordinate = getXY(grid, currentUserIndex);

    let userDirection = e.target.id 
    console.log(`line 56`, userDirection)
    let currentUserIndexLocation = grid.reduce((acc, block,index)  =>{ 
      if (coordinate === block){
        let data = {index:index, block:block}
      return data;
      }
     return acc; 
  },{});
      const nextIndex= direction[userDirection](currentUserIndex.index, currentUserIndexLocation.block)
      console.log(`line 64 userIndex`, currentUserIndex)
      console.log(`line 67 nextIndex`, nextIndex)
      return nextIndex;
      
    
  }

  function move(buttonDirection, grid, e, currentUserIndex) {
    if(e.target)
if (e.target.id === 'up'){
  onChange(e);
    setcurrentUserIndex(getNextIndex(buttonDirection, grid, e, currentUserIndex));
    errorHandling(getXY(grid, currentUserIndex));
console.log(`line 77`, getXY(grid, currentUserIndex))
  } else if (e.target.id === 'down'){
  onChange(e);
   setcurrentUserIndex(getNextIndex(buttonDirection, grid, e, currentUserIndex));
   errorHandling(getXY(grid, currentUserIndex))
} else if (e.target.id === 'left'){
  onChange(e);
   setcurrentUserIndex(getNextIndex(buttonDirection, grid, e, currentUserIndex));
   errorHandling(getXY(grid, currentUserIndex))
} else if (e.target.id === 'right'){ 
  onChange(e);
  setcurrentUserIndex(getNextIndex(buttonDirection, grid, e, currentUserIndex));
  errorHandling(getXY(grid, currentUserIndex))
}
  }
  function onChange(evt) {
    if (initialSteps < 2){
      setcurrentUserIndex(4)
    }
if (evt) {
      setInitialSteps((prev) => prev+ 1)
      setCurrentCoordinate(getXY(grid, currentUserIndex))
    }
  }

  function onSubmit(evt) {
    // Use a POST request to send a payload to the server.
  }

  return (
    <div  id="wrapper" className={props.className}>
      <div className="info">
        <h3 id="coordinates">{`Coordinates ${currentCoordinate}`}</h3>
        <h3 id="steps">You moved {initialSteps} times</h3>
      </div>
      <div id="grid">
        {
          [0, 1, 2, 3, 4, 5, 6, 7, 8].map(idx => (
            <div key={idx} className={`square${idx === currentUserIndex ? ' active' : ''}`}>
              {idx === currentUserIndex ? 'B' : null}
            </div>
          ))
        }
      </div>
      <div className="info">
        <h3 id="message">{error}</h3>
      </div>
      <div id="keypad">
        <button onClick={(e) => move(buttonDirection, grid, e, currentUserIndex)} id="left">LEFT</button>
        <button onClick={(e) => move(buttonDirection, grid, e, currentUserIndex)} id="up">UP</button>
        <button onClick={(e) => move(buttonDirection, grid, e, currentUserIndex)} id="right">RIGHT</button>
        <button onClick={(e) => move(buttonDirection, grid, e, currentUserIndex)} id="down">DOWN</button>
        <button id="reset" onClick={(e)=> reset()}>reset</button>
      </div>
      <form>
        <input id="email" type="email" placeholder="type email"></input>
        <input id="submit" type="submit"></input>
      </form>
    </div>
  )
}





