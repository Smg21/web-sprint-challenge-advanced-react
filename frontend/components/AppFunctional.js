import React, { useState } from 'react'


// Suggested initial states
//const initialMessage = ''
//const initialEmail = ''
//const initialSteps = 0
//const initialIndex = 4 // the index the "B" is at




export default function AppFunctional(props) {
  // THE FOLLOWING HELPERS ARE JUST RECOMMENDATIONS.

  // You can delete them and build your own logic from scratch.

  const [initialMessage, setInitialMessage] = useState('')
const [initialEmail, setInitialEmail] = useState('')
const [initialSteps, setInitialSteps] = useState(0)
const [initialIndex, setInitialIndex] = useState(4)

  const grid = [
    [1,1],[1,2],[1,3],
    [2,1],[2,2],[2,3],
    [3,1],[3,2],[3,3]
  ]
 

  const direction = {
    left: (index) => index - 1,
    right: (index) => index + 1,
    up: (index) => index - 3,
    down: (index) => index + 3
  }

  function getXY(grid,idx) {
    const coordinatess = grid.find((block,index) => {
      
      if (index === idx){
        // console.log(`${block[0]}, ${block[1]}`);
        return [block[0], block[1]];
      }
    })
return coordinatess;


    // It it not necessary to have a state to track the coordinates.
    // It's enough to know what index the "B" is at, to be able to calculate them.
    //Needs to know what coordinate we at based on index

  }
  console.log(getXY(grid, 3));
  //getXY(grid, 2);
  const coordinate = getXY(grid, 3);
  console.log('line 56', coordinate)
  function getXYMessage(grid) {
    // It it not necessary to have a state to track the "Coordinates (2, 2)" message for the user.
    // You can use the `getXY` helper above to obtain the coordinates, and then `getXYMessage`
    // returns the fully constructed string.
    //iterating through the array
    
    return  `Cordinates (${coordinate})`;


  }
 console.log(getXYMessage(grid));

  function reset() {
    setInitialEmail('');
    setInitialSteps(0);
    setInitialMessage('');
    setInitialIndex(4);
    // Use this helper to reset all states to their initial values.
  }

  function getNextIndex(direction, grid) {
    // This helper takes a direction ("left", "up", etc) and calculates what the next index
    // of the "B" would be. If the move is impossible because we are at the edge of the grid,
    // this helper should return the current index unchanged.
    const coordinate = getXY(grid, 4)
    let currentIndexLocation = grid.find((block,index) =>{ 
console.log(`line 83`, coordinate);
console.log(`line 84`, block);
      if (coordinate === block){
      return indexOf(index);
      }
  });
  console.log(`line 89`, currentIndexLocation);
  console.log(`line 90`, coordinate)

  const nextIndex= direction.left(currentIndexLocation)
  console.log(`line 93`, nextIndex);
  return nextIndex;
  }

getNextIndex(direction, grid);

  function move(evt) {
    // This event handler can use the helper above to obtain a new index for the "B",
    // and change any states accordingly.
  }

  function onChange(evt) {
    // You will need this to update the value of the input.
  }

  function onSubmit(evt) {
    // Use a POST request to send a payload to the server.
  }

  return (
    <div id="wrapper" className={props.className}>
      <div className="info">
        <h3 id="coordinates">Coordinates (2, 2)</h3>
        <h3 id="steps">You moved 0 times</h3>
      </div>
      <div id="grid">
        {
          [0, 1, 2, 3, 4, 5, 6, 7, 8].map(idx => (
            <div key={idx} className={`square${idx === 4 ? ' active' : ''}`}>
              {idx === 4 ? 'B' : null}
            </div>
          ))
        }
      </div>
      <div className="info">
        <h3 id="message"></h3>
      </div>
      <div id="keypad">
        <button id="left">LEFT</button>
        <button id="up">UP</button>
        <button id="right">RIGHT</button>
        <button id="down">DOWN</button>
        <button id="reset">reset</button>
      </div>
      <form>
        <input id="email" type="email" placeholder="type email"></input>
        <input id="submit" type="submit"></input>
      </form>
    </div>
  )
}
