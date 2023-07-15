import React from 'react'

// Suggested initial states
const initialMessage = ''
const initialEmail = ''
const initialSteps = 0
const currentCoordinate = 0
const currentIndex = 4 // the index the "B" is at

const initialState = {
  message: initialMessage,
  email: initialEmail,
  index: currentIndex,
  coordinate: currentCoordinate,
  steps: initialSteps,
}

const grid = [
  [1,1],[1,2],[1,3],
  [2,1],[2,2],[2,3],
  [3,1],[3,2],[3,3]
]

export default class AppClass extends React.Component {
  // THE FOLLOWING HELPERS ARE JUST RECOMMENDATIONS.
  // You can delete them and build your own logic from scratch.

  handleChange = (e) => {
    //setInitialEmail(e.target.value);
    //Uses State
  }

  getXY = (grid, idx) => {
    // It it not necessary to have a state to track the coordinates.
    // It's enough to know what index the "B" is at, to be able to calculate them.


    const coordinatess = grid.find((block, index) => {
      if (index === idx){
        return [block[0], block[1]];
      }
    })
    return coordinatess;
  }

  //USEEFFECT Below uses state

  // useEffect(()=> {
  //   setCurrentCoordinate(getXY(grid, currentIndex))
  // }, [currentIndex])
 

  getXYMessage = () => {
    // It it not necessary to have a state to track the "Coordinates (2, 2)" message for the user.
    // You can use the `getXY` helper above to obtain the coordinates, and then `getXYMessage`
    // returns the fully constructed string.

  }

  reset = () => {
    // Use this helper to reset all states to their initial values.
    initialState 
  }

  getNextIndex = (direction) => {
    // This helper takes a direction ("left", "up", etc) and calculates what the next index
    // of the "B" would be. If the move is impossible because we are at the edge of the grid,
    // this helper should return the current index unchanged.

    // switch (direction) {
    //   case 'up':
    //     return (currentIndex < 3) ? currentIndex : currentIndex - 3
    //   case 'down':
    //     return (currentIndex > 5) ?currentIndex : currentIndex + 3
    //   case 'left':
    //     return (currentIndex % 3 === 0) ? currentIndex : currentIndex- 1
    //   case 'right':
    //     return ((currentIndex - 2) % 3 === 0) ? currentIndex : currentIndex + 1
    // }
  }

  move = (evt) => {
    // This event handler can use the helper above to obtain a new index for the "B",
    // and change any states accordingly.

    //USES STATE

        // e.target.id - direction variable
    // getnext index function

    // const direction = event.target.id
    // const next = getNextIndex(direction);
    // //if next index /= index 

    // if (next != currentIndex){
    //   setInitialSteps(initialSteps +1)
    //   setInitialMessage(initialMessage)
    //   setCurrentIndex(next)
    // } else {
    //   setInitialMessage(`You can't go ${direction}`)
    // }

  }

  onChange = (evt) => {
    // You will need this to update the value of the input.
  }

  onSubmit = (evt) => {
    // Use a POST request to send a payload to the server.

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

  }

  render() {
    const { className } = this.props
    return (
      <div id="wrapper" className={className}>
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
}


