import React, { useState, useEffect } from 'react'
import axios from 'axios';


 

export default function AppFunctional(props) {



// const [form, setForm] = useState( {email: ''});
const [initialEmail, setInitialEmail] = useState('')
const [initialMessage, setInitialMessage] = useState('')
const [initialSteps, setInitialSteps] = useState(0)
const [currentIndex, setCurrentIndex] = useState(4)
const [currentCoordinate, setCurrentCoordinate] = useState()




function handleChange (e){
  setInitialEmail(e.target.value);
}

//coordinate array

  const grid = [
    [1,1],[1,2],[1,3],
    [2,1],[2,2],[2,3],
    [3,1],[3,2],[3,3]
  ]


  function getXY(grid,idx) {
    const coordinatess = grid.find((block,index) => {
      
      if (index === idx){
        return [block[0], block[1]];
      }
    })
      return coordinatess;
  }


   // getXYMessage = () => {
  //   // It it not necessary to have a state to track the "Coordinates (2, 2)" message for the user.
  //   // You can use the `getXY` helper above to obtain the coordinates, and then `getXYMessage`
  //   // returns the fully constructed string.
  // }
  

  //To make it so it starts on loading with the B in the center, 

  useEffect(()=> {
    setCurrentCoordinate(getXY(grid, currentIndex))
  }, [currentIndex])
  

  //To reset everything

  function reset() {
    setInitialSteps(0);
    setInitialMessage('');
    setCurrentIndex(4);
    setInitialEmail('');
  }

  //to let the computer know where the current location is 

  function getNextIndex(direction) {
    switch (direction) {
      case 'up':
        return (currentIndex < 3) ? currentIndex : currentIndex - 3
      case 'down':
        return (currentIndex > 5) ?currentIndex : currentIndex + 3
      case 'left':
        return (currentIndex % 3 === 0) ? currentIndex : currentIndex- 1
      case 'right':
        return ((currentIndex - 2) % 3 === 0) ? currentIndex : currentIndex + 1
    }
    
    
  }



  function move(event) {
    // e.target.id - direction variable
    // getnext index function

    const direction = event.target.id
    const next = getNextIndex(direction);
    //if next index /= index 

    if (next != currentIndex){
      setInitialSteps(initialSteps +1)
      setInitialMessage(initialMessage)
      setCurrentIndex(next)
    } else {
      setInitialMessage(`You can't go ${direction}`)
    }

  }


  

  function onSubmit(evt) {
    evt.preventDefault()
    let x = currentCoordinate[0] 
    let y = currentCoordinate[1]
    let email = initialEmail
    let steps = initialSteps
 axios
   .post("http://localhost:9000/api/result", {email, steps, x, y} )
   .then(res => {
     setInitialMessage(res.data.message); 
   })
   .catch(err => {
    console.log(`currentcoordinate x`, x);
    console.log(`currentcoordinate y`, y);
    console.log(`initial Steps`, initialSteps);
    console.log(`initial Email`, initialEmail)
   
     console.log(err); 
   });
   
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
        <h3 id="message" >{initialMessage}</h3>
      </div>
      <div id="keypad">
        <button onClick={move} id="left">LEFT</button>
        <button onClick={move} id="up">UP</button>
        <button onClick={move} id="right">RIGHT</button>
        <button onClick={move} id="down">DOWN</button>
        <button id="reset" onClick={reset}>reset</button>
      </div>

      <form onSubmit={onSubmit}>
        <input value={initialEmail} id="email" type="email" placeholder="type email" onChange={handleChange}  ></input>
        <input id="submit" type="submit"></input>
      </form>
    </div>
  )
}

//Trying To Figure Out How To Get Email To Work With Having The Value Of Whatever Is Typed In, 








          {/* {
            [0, 1, 2, 3, 4, 5, 6, 7, 8].map(idx => (
              <div key={idx} className={`square${idx === 4 ? ' active' : ''}`}>
                {idx === 4 ? 'B' : null}
              </div>
            ))
          } */}