// import React from 'react'

// // Suggested initial states
// const initialMessage = ''
// const initialEmail = ''
// const initialSteps = 0
// const currentIndex = 4 // the index the "B" is at
// const currentCoordinate = ''

// state = {
//   message: initialMessage,
//   email: initialEmail,
//   index: currentIndex,
//   steps: initialSteps,
//   coordinate: currentCoordinate
// }

// export default class AppClass extends React.Component {
//   // THE FOLLOWING HELPERS ARE JUST RECOMMENDATIONS.
//   // You can delete them and build your own logic from scratch.

//   getXY = () => {
//     // It it not necessary to have a state to track the coordinates.
//     // It's enough to know what index the "B" is at, to be able to calculate them.
//     const coordinatess = grid.find((block,index) => {
      
//       if (index === idx){
//         return [block[0], block[1]];
//       }
//     })
//       return coordinatess;
//   }

//   componentDidMount(grid, index) {
//     this.setState({
//           coordinate: {getXY(grid, index)}
//         })
      
//   }

//   // useEffect(()=> {
//   //   this.setState({
//   //     coordinate: {getXY(grid, index)}
//   //   })
//   //   setCurrentCoordinate(getXY(grid, currentIndex))
//   // }, [index];

//   reset = () => {
//     // Use this helper to reset all states to their initial values.
//     this.setState({
//       message: '',
//       email: '',
//       index: 4,
//       steps: 0,
//       coordinate: ''
//     })
//   }

//   getNextIndex = (direction) => {
//     // This helper takes a direction ("left", "up", etc) and calculates what the next index
//     // of the "B" would be. If the move is impossible because we are at the edge of the grid,
//     // this helper should return the current index unchanged.
//     switch (direction) {
//       case 'up':
//         return (this.state.index < 3) ? this.state.index : this.state.index - 3
//       case 'down':
//         return (this.state.index > 5) ? this.state.index : this.state.index + 3
//       case 'left':
//         return (this.state.index % 3 === 0) ? this.state.index : this.state.index- 1
//       case 'right':
//         return ((this.state.index - 2) % 3 === 0) ? this.state.index : this.state.index + 1
//     }
//   }

//   move = (evt) => {
//     // This event handler can use the helper above to obtain a new index for the "B",
//     // and change any states accordingly.

//     const direction = evt.target.id
//     const next = getNextIndex(direction);
//     //if next index /= index 

//     if (next != this.state.currentIndex){
//       this.setState({
//         steps: steps + 1,
//         message: message,
//         coordinate: next
//       })

//     } else {
//       this.setState({
//         message: `You can't go ${this.direction}`
//       })

//     }


//   }

//   handleChange = (e) => {
//     this.setState({
//       email: e.target.value
//     })
//     // You will need this to update the value of the input.
//   }

//   onSubmit = (evt) => {
//     // Use a POST request to send a payload to the server.

//     evt.preventDefault()
//     let x = this.state.currentCoordinate[0] 
//     let y = this.state.currentCoordinate[1]
//     let email = this.state.email
//     let steps = this.state.steps
//  axios
//    .post("http://localhost:9000/api/result", {email, steps, x, y} )
//    .then(res => {
//     this.setState({
//       initialMessage: res.data.message
//     })
//     //  setInitialMessage(res.data.message); 
//    })
//    .catch(err => {
//     console.log(`currentcoordinate x`, x);
//     console.log(`currentcoordinate y`, y);
//     console.log(`initial Steps`, this.state.steps);
//     console.log(`initial Email`, this.state.email);
   
//      console.log(err); 
//    });
   

//   }

//   render() {
//     const { className } = this.props
//     return (
//       <div id="wrapper" className={className}>
//         <div className="info">
//           <h3 id="coordinates">{this.state.index === 4 ?  `Coordinates ${this.state.coordinate}`: `Coordinates ${this.state.coordinate}`}</h3>
//           <h3 id="steps">You moved {this.state.steps} times</h3>
//         </div>
//         <div id="grid">
//         {
//           [0, 1, 2, 3, 4, 5, 6, 7, 8].map(idx => (
//             <div key={idx} className={`square${idx === this.state.index ? ' active' : ''}`}>
//               {idx === this.state.index ? 'B' : null}
//             </div>
//           ))
//         }

//         </div>
//         <div className="info">
//           <h3 id="message">{this.state.message}</h3>
//         </div>
//         <div id="keypad">
//           <button onClick={this.move} id="left">LEFT</button>
//           <button onClick={this.move} id="up">UP</button>
//           <button onClick={this.move} id="right">RIGHT</button>
//           <button onClick={this.move} id="down">DOWN</button>
//           <button onClick={this.reset} id="reset">reset</button>
//         </div>
//         <form onSubmit = {this.onSubmit}>
//           <input value = {this.state.email} id="email" type="email" placeholder="type email" onChange = {this.handleChange}></input>
//           <input id="submit" type="submit"></input>
//         </form>
//       </div>
//     )
//       }
//     }
  