
import React, { useState, useEffect } from 'react'

export default function AppFunctional(props) {

const [initialMessage, setInitialMessage] = useState('')
const [initialEmail, setInitialEmail] = useState('')
const [initialSteps, setInitialSteps] = useState(0)
const [currentIndex, setCurrentIndex] = useState(4)
const [currentCoordinate, setCurrentCoordinate] = useState()

  const grid = [
    [1,1],[1,2],[1,3],
    [2,1],[2,2],[2,3],
    [3,1],[3,2],[3,3]
  ]
 
  const buttonDirection = {
    left: (index) => index - 1,
    right: (index) => index + 1,
    up: (index) => index - 3,
    down: (index) => index + 3
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
    setCurrentCoordinate(getXY(grid, currentIndex))
  }, [currentIndex])
  

  function reset() {
    setInitialEmail('');
    setInitialSteps(0);
    setInitialMessage('');
    setCurrentIndex(4);
  
  }

  function getNextIndex(direction, grid, e, currentIndex) {
    let coordinate = getXY(grid, currentIndex);
    let userDirection = e.target.id 
    let currentIndexLocation = grid.reduce((acc, block,index)  =>{ 
      if (coordinate === block){
        let data = {index:index, block:block}
      return data;
      }
     return acc; 
  },{});
      const nextIndex= direction[userDirection](currentIndexLocation.index)
      setCurrentCoordinate(currentIndexLocation.block)
      return nextIndex;
    
  }

  function move(buttonDirection, grid, e, currentIndex) {
if (e.target.id === 'up'){
    setCurrentIndex(getNextIndex(buttonDirection, grid, e, currentIndex));
    onChange(e);
} else if (e.target.id === 'down'){
   setCurrentIndex(getNextIndex(buttonDirection, grid, e, currentIndex));
   onChange(e);
} else if (e.target.id === 'left'){
   setCurrentIndex(getNextIndex(buttonDirection, grid, e, currentIndex));
   onChange(e);
} else if (e.target.id === 'right'){
  setCurrentIndex(getNextIndex(buttonDirection, grid, e, currentIndex));
  onChange(e);
}
  }
  function onChange(evt) {
    if (evt) {
      setInitialSteps((prev) => prev+ 1)
      setCurrentCoordinate(getXY(grid, currentIndex))
      console.log(`line 82`, currentCoordinate)
    }
   
  }

  function onSubmit(evt) {
    // Use a POST request to send a payload to the server.
  }

  return (
    <div  id="wrapper" className={props.className}>
      <div className="info">
        <h3 id="coordinates">{currentIndex === 4 ?  `Coordinates ${currentCoordinate}`: `Coordinates ${currentCoordinate}`}</h3>
        <h3 id="steps">You moved {initialSteps} times</h3>
      </div>
      <div id="grid">
        {
          [0, 1, 2, 3, 4, 5, 6, 7, 8].map(idx => (
            <div key={idx} className={`square${idx === currentIndex ? ' active' : ''}`}>
              {idx === currentIndex ? 'B' : null}
            </div>
          ))
        }
      </div>
      <div className="info">
        <h3 id="message"></h3>
      </div>
      <div id="keypad">
        <button onClick={(e) => move(buttonDirection, grid, e, currentIndex)} id="left">LEFT</button>
        <button onClick={(e) => move(buttonDirection, grid, e, currentIndex)} id="up">UP</button>
        <button onClick={(e) => move(buttonDirection, grid, e, currentIndex)} id="right">RIGHT</button>
        <button onClick={(e) => move(buttonDirection, grid, e, currentIndex)} id="down">DOWN</button>
        <button id="reset" onClick={(e)=> reset()}>reset</button>
      </div>
      <form>
        <input id="email" type="email" placeholder="type email"></input>
        <input id="submit" type="submit"></input>
      </form>
    </div>
  )
}





