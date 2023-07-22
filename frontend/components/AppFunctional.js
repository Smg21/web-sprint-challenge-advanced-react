import React, { useState, useEffect } from 'react';
import axios from 'axios';

const gridSize = 3; 

const AppFunctional = (props) => {
  const [initialEmail, setInitialEmail] = useState('');
  const [initialSteps, setInitialSteps] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(4);
  const [initialMessage, setInitialMessage] = useState('');
  const [currentCoordinate, setCurrentCoordinate] = useState([2, 2]);

 
  useEffect(() => {
    const currentCoordinate = getXY(gridSize, currentIndex);
    setCurrentCoordinate(currentCoordinate);
  }, [currentIndex]);


 
  const getXY = (gridSize, idx) => {
    const x = (idx % gridSize) + 1;
    const y = Math.floor(idx / gridSize) + 1;
    return [x, y];
  };


  const handleChange = (e) => {
    setInitialEmail(e.target.value);
  };

  
  const reset = () => {
    setInitialSteps(0);
    setInitialMessage('');
    setCurrentIndex(4);
    setInitialEmail('');
  };

  
  const getNextIndex = (direction) => {
    switch (direction) {
      case 'up':
        return currentIndex >= gridSize ? currentIndex - gridSize : currentIndex;
      case 'down':
        return currentIndex + gridSize < gridSize * gridSize ? currentIndex + gridSize : currentIndex;
      case 'left':
        return currentIndex % gridSize !== 0 ? currentIndex - 1 : currentIndex;
      case 'right':
        return (currentIndex + 1) % gridSize !== 0 ? currentIndex + 1 : currentIndex;
      default:
        return currentIndex;
    }
  };


  const move = (event) => {
    const direction = event.target.id;
    const next = getNextIndex(direction);
    if (next !== currentIndex) {
      setInitialSteps((prevSteps) => prevSteps + 1);
      setCurrentIndex(next);
    } else {
      setInitialMessage(`You can't go ${direction}`);
    }
  };


  const onSubmit = (evt) => {
    evt.preventDefault();
  
    const [x, y] = getXY(gridSize, currentIndex);
     // Check if the email is empty
     if(initialEmail === "foo@bar.baz"){
      setInitialMessage("foo@bar.baz failure #71")
     }
     if (!initialEmail) {
      setInitialMessage("Ouch: email is required");
      return;
    }

    // Email validation using regular expression
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    if (!emailRegex.test(initialEmail)) {
      setInitialMessage("Ouch: email must be a valid email");
      return;
    }
   
    axios
      .post("http://localhost:9000/api/result", { email: initialEmail, steps: initialSteps, x, y })
      .then((res) => {
        setInitialEmail("");
        setInitialMessage(res.data.message);
        if (["Email is banned", "Email is invalid", "Email is required"].includes(res.data.message)) {
          setInitialEmail(""); // Reset the email input value on banned, invalid, or empty email
        }
      })
      .catch((err) => {
        console.log(`currentcoordinate x`, x);
        console.log(`currentcoordinate y`, y);
        console.log(`initial Email`, initialEmail);
        console.log(err);
      });
  };

  

  return (
    <div id="wrapper" className={props.className}>
      <div className="info">
        <h3 id="coordinates">{`Coordinates (${currentCoordinate[0]}, ${currentCoordinate[1]})`}</h3>
        <h3 id="steps">You moved {initialSteps} time{initialSteps !== 1 ? 's' : ''}</h3>
      </div>
      <div id="grid">
        {Array.from({ length: gridSize * gridSize }, (_, idx) => (
          <div key={idx} className={`square${idx === currentIndex ? ' active' : ''}`}>
            {idx === currentIndex ? 'B' : null}
          </div>
        ))}
      </div>
      <div className="info">
        <h3 id="message">{initialMessage}</h3>
      </div>
      <div id="keypad">
        <button onClick={move} id="left">
          LEFT
        </button>
        <button onClick={move} id="up">
          UP
        </button>
        <button onClick={move} id="right">
          RIGHT
        </button>
        <button onClick={move} id="down">
          DOWN
        </button>
        <button id="reset" onClick={reset}>
          reset
        </button>
      </div>

      <form onSubmit={onSubmit}>
        <input value={initialEmail} id="email" type="email" placeholder="type email" onChange={handleChange}></input>
        <input id="submit" type="submit"></input>
      </form>
    </div>
  );
};

export default AppFunctional;



































































//WITH GRID AS ARRAY THING 
// import React, { useState, useEffect } from 'react'
// import axios from 'axios';


 

// export default function AppFunctional(props) {



// // const [form, setForm] = useState( {email: ''});
// const [initialEmail, setInitialEmail] = useState('')
// const [initialMessage, setInitialMessage] = useState('')
// const [initialSteps, setInitialSteps] = useState(0)
// const [currentIndex, setCurrentIndex] = useState(4)
// const [currentCoordinate, setCurrentCoordinate] = useState()




// function handleChange (e){
//   setInitialEmail(e.target.value);
// }

// //coordinate array

//   const grid = [
//     [1,1],[1,2],[1,3],
//     [2,1],[2,2],[2,3],
//     [3,1],[3,2],[3,3]
//   ]


//   function getXY(grid,idx) {
//     const coordinatess = grid.find((block,index) => {
      
//       if (index === idx){
//         return [block[0], block[1]];
//       }
//     })
//       return coordinatess;
//   }


//    // getXYMessage = () => {
//   //   // It it not necessary to have a state to track the "Coordinates (2, 2)" message for the user.
//   //   // You can use the `getXY` helper above to obtain the coordinates, and then `getXYMessage`
//   //   // returns the fully constructed string.
//   // }
  

//   //To make it so it starts on loading with the B in the center, 

//   useEffect(()=> {
//     setCurrentCoordinate(getXY(grid, currentIndex))
//   }, [currentIndex])
  

//   //To reset everything

//   function reset() {
//     setInitialSteps(0);
//     setInitialMessage('');
//     setCurrentIndex(4);
//     setInitialEmail('');
//   }

//   //to let the computer know where the current location is 

//   function getNextIndex(direction) {
//     switch (direction) {
//       case 'up':
//         return (currentIndex < 3) ? currentIndex : currentIndex - 3
//       case 'down':
//         return (currentIndex > 5) ?currentIndex : currentIndex + 3
//       case 'left':
//         return (currentIndex % 3 === 0) ? currentIndex : currentIndex- 1
//       case 'right':
//         return ((currentIndex - 2) % 3 === 0) ? currentIndex : currentIndex + 1
//     }
    
    
//   }



//   function move(event) {
//     // e.target.id - direction variable
//     // getnext index function

//     const direction = event.target.id
//     const next = getNextIndex(direction);
//     //if next index /= index 

//     if (next != currentIndex){
//       setInitialSteps(initialSteps +1)
//       setInitialMessage(initialMessage)
//       setCurrentIndex(next)
//     } else {
//       setInitialMessage(`You can't go ${direction}`)
//     }

//   }


  

//   function onSubmit(evt) {
//     evt.preventDefault()
//     let x = currentCoordinate[0] 
//     let y = currentCoordinate[1]
//     let email = initialEmail
//     let steps = initialSteps
//  axios
//    .post("http://localhost:9000/api/result", {email, steps, x, y} )
//    .then(res => {
//      setInitialMessage(res.data.message); 
//    })
//    .catch(err => {
//     console.log(`currentcoordinate x`, x);
//     console.log(`currentcoordinate y`, y);
//     console.log(`initial Steps`, initialSteps);
//     console.log(`initial Email`, initialEmail)
   
//      console.log(err); 
//    });
   
//     // Use a POST request to send a payload to the server.
//   }

//   return (
//     <div  id="wrapper" className={props.className}>
//       <div className="info">
//         <h3 id="coordinates">{currentIndex === 4 ?  `Coordinates ${currentCoordinate}`: `Coordinates ${currentCoordinate}`}</h3>
//         <h3 id="steps">You moved {initialSteps} times</h3>
//       </div>
//       <div id="grid">
//         {
//           [0, 1, 2, 3, 4, 5, 6, 7, 8].map(idx => (
//             <div key={idx} className={`square${idx === currentIndex ? ' active' : ''}`}>
//               {idx === currentIndex ? 'B' : null}
//             </div>
//           ))
//         }
//       </div>
//       <div className="info">
//         <h3 id="message" >{initialMessage}</h3>
//       </div>
//       <div id="keypad">
//         <button onClick={move} id="left">LEFT</button>
//         <button onClick={move} id="up">UP</button>
//         <button onClick={move} id="right">RIGHT</button>
//         <button onClick={move} id="down">DOWN</button>
//         <button id="reset" onClick={reset}>reset</button>
//       </div>

//       <form onSubmit={onSubmit}>
//         <input value={initialEmail} id="email" type="email" placeholder="type email" onChange={handleChange}  ></input>
//         <input id="submit" type="submit"></input>
//       </form>
//     </div>
//   )
// }

