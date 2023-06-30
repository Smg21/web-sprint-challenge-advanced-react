import React, { useState, useEffect } from 'react'

export default function AppFunctional(props) {

const [initialMessage, setInitialMessage] = useState('')
const [initialEmail, setInitialEmail] = useState('')
const [initialSteps, setInitialSteps] = useState(0)
const [currentIndex, setCurrentIndex] = useState(4)
const [currentCoordinate, setCurrentCoordinate] = useState()


//coordinate array

  const grid = [
    [1,1],[1,2],[1,3],
    [2,1],[2,2],[2,3],
    [3,1],[3,2],[3,3]
  ]

  //Setting which direction each button will move on the array above
 
  const buttonDirection = {
    left: (index) => index - 1,
    right: (index) => index + 1,
    up: (index) => index -3,
    down: (index) => index + 3
  }

  
  // const buttonDirection = {
  //   left: (index % 3 === 0) ? index : index - 1,
  //   right: ((index -2) % 3 === 0) ? index : index + 1,
  //   up: (index < 3) ? index :  index -3,
  //   down: (index > 5) ? index : index + 3
  // }

  //For now I want to find a way to prevent the square from going back/reversed. This code is not working as it says index is not defined, and I tried Currentindex as well. 
  //Why is the ternary code here not working, 

 

//Gets the coordinate numbers, so it shows up on the users end. 

  function getXY(grid,idx) {
    const coordinatess = grid.find((block,index) => {
      
      if (index === idx){
        return [block[0], block[1]];
      }
    })
      return coordinatess;
  }

  //To make it so it starts on loading with the B in the center, 

  useEffect(()=> {
    setCurrentCoordinate(getXY(grid, currentIndex))
  }, [currentIndex])
  

  //To reset everything

  function reset() {
    setInitialEmail('');
    setInitialSteps(0);
    setInitialMessage('');
    setCurrentIndex(4);
  
  }

  //to let the computer know where the current location is 

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
console.log(buttonDirection, grid, e, currentIndex);
  }



  function onChange(evt) {
    if (evt) {
      setInitialSteps((prev) => prev+ 1)
      setCurrentCoordinate(getXY(grid, currentIndex))
      console.log(`line 95`, currentCoordinate)
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
        <button onClick={(e) => move(buttonDirection, grid, e, currentIndex) } id="up">UP</button>
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

{/* <button onClick={(e) => move(buttonDirection, grid, e, currentIndex)} id="left">LEFT</button>
<button onClick={(e) => move(buttonDirection, grid, e, currentIndex)} id="up">UP</button>
<button onClick={(e) => move(buttonDirection, grid, e, currentIndex)} id="right">RIGHT</button>
<button onClick={(e) => move(buttonDirection, grid, e, currentIndex)} id="down">DOWN</button> */}


// switch (direction) {
//   case 'up':
//     return (index < 3) ? index : index - 3
//   case 'down':
//     return (index > 5) ? index : index + 3
//   case 'left':
//     return (index % 3 === 0) ? index : index - 1
//   case 'right':
//     return ((index - 2) % 3 === 0) ? index : index + 1
// }




// function move(e, currentIndex) {
//   direction = e.target.id;
//   switch (direction) {
//     case 'up':
//       return (currentIndex < 3) ? currentIndex : currentIndex - 3
//     case 'down':
//       return (currentIndex > 5) ? currentIndex : currentIndex + 3
//     case 'left':
//       return (currentIndex % 3 === 0) ? currentIndex : currentIndex - 1
//     case 'right':
//       return ((currentIndex - 2) % 3 === 0) ? currentIndex : currentIndex + 1
//   }
// }

 // switch (direction) {
    //     case 'up':
    //       return (currentIndex < 3) ? currentIndex : currentIndex - 3
    //     case 'down':
    //       return (currentIndex > 5) ? currentIndex : currentIndex + 3
    //     case 'left':
    //       return (currentIndex % 3 === 0) ? currentIndex : currentIndex - 1
    //     case 'right':
    //       return ((currentIndex - 2) % 3 === 0) ? currentIndex : currentIndex + 1
    //   }

    // const buttonDirection = {
    //   left: (currentIndex % 3 === 0) ? currentIndex : currentIndex - 1,
    //   right: ((currentIndex -2) % 3 === 0) ? currentIndex : currentIndex + 1,
    //   up: (currentIndex < 3) ? currentIndex :  currentIndex -3,
    //   down: (currentIndex > 5) ? currentIndex : currentIndex + 3
    // }
  