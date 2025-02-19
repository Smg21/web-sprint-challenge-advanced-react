

import React, { Component } from 'react';
import axios from 'axios';

class AppClass extends Component {
  constructor(props) {
    super(props);
    this.state = {
      initialEmail: '',
      initialSteps: 0,
      currentIndex: 4,
      initialMessage: '',
      currentCoordinate: [2, 2], 
    };

   
    this.gridSize = 3;
  }

  componentDidMount() {
    
    this.fetchInitialData();
  }
 

  fetchInitialData = () => {



  
    axios.get("http://localhost:9000/api/initial")
      .then(res => {
        const { x, y } = res.data;
        const currentIndex = (y - 1) * this.gridSize + (x - 1);
        this.setState({ currentIndex, currentCoordinate: [x, y] });
      })
      .catch(err => {
        console.log(err);
      });
  }

  getXY(gridSize, idx) {
    const x = (idx % gridSize) + 1;
    const y = Math.floor(idx / gridSize) + 1;
    return [x, y];
  }

  handleChange = (e) => {
    this.setState({ initialEmail: e.target.value });
  }

  reset = () => {
    this.setState({
      initialSteps: 0,
      initialMessage: '',
      currentIndex: 4,
      initialEmail: '',
      currentCoordinate: [2, 2], 
    });
  }

  getNextIndex = (direction) => {
    const { currentIndex } = this.state;
    const gridSize = this.gridSize;
    switch (direction) {
      case 'up':
        return (currentIndex >= gridSize) ? currentIndex - gridSize : currentIndex;
      case 'down':
        return (currentIndex + gridSize < gridSize * gridSize) ? currentIndex + gridSize : currentIndex;
      case 'left':
        return (currentIndex % gridSize !== 0) ? currentIndex - 1 : currentIndex;
      case 'right':
        return ((currentIndex + 1) % gridSize !== 0) ? currentIndex + 1 : currentIndex;
      default:
        return currentIndex;
    }
  }

  move = (event) => {
    const direction = event.target.id;
    const next = this.getNextIndex(direction);
    if (next !== this.state.currentIndex) {
      this.setState((prevState) => ({
        initialSteps: prevState.initialSteps + 1,
        currentIndex: next,
        currentCoordinate: this.getXY(this.gridSize, next), 
        initialMessage: '', 
      }));
    } else {
      this.setState({ initialMessage: `You can't go ${direction}` });
    }
  }

  //cop
  onSubmit = (evt) => {
    evt.preventDefault();
    this.setState({ initialEmail: "" });
    const { currentIndex, initialEmail, initialSteps } = this.state;
    const [x, y] = this.getXY(this.gridSize, currentIndex);
     if(initialEmail === "foo@bar.baz"){
      this.setState({ initialMessage: "foo@bar.baz failure #71"})
     }
    // Check if the email is empty
    if (!initialEmail) {
      this.setState({ initialMessage: "Ouch: email is required" });
      return;
    }
  
    // Email validation using regular expression
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    if (!emailRegex.test(initialEmail)) {
      this.setState({ initialMessage: "Ouch: email must be a valid email" });
      return;
    } else   if (!initialEmail) {
      this.setState({ initialMessage: "Ouch: email is required" });
      return;
    }
   
    axios
      .post("http://localhost:9000/api/result", { email: initialEmail, steps: initialSteps, x, y })
      .then((res) => {
        this.setState({ initialEmail: "" });
        this.setState({ initialMessage: res.data.message });
        if (["Email is banned", "Email is invalid", "Email is required"].includes(res.data.message)) {
          this.setState({ initialEmail: "" });
        }
      })
      .catch((err) => {
        console.log(`currentcoordinate x`, x);
        console.log(`currentcoordinate y`, y);
        console.log(`initial Steps`, initialSteps);
        console.log(`initial Email`, initialEmail);
        console.log(err);
      });
  };

  //cop
 
  render() {
    const { initialEmail, currentIndex, initialSteps, initialMessage, currentCoordinate } = this.state;

    return (
      <div id="wrapper" className={this.props.className}>
        <div className="info">
          <h3 id="coordinates">{`Coordinates (${currentCoordinate[0]}, ${currentCoordinate[1]})`}</h3>
          <h3 id="steps">You moved {initialSteps} time{initialSteps !== 1 ? 's' : ''}</h3>
          <h6> lady win #73</h6>
          <h7>lady win #43</h7>
        </div>
        <div id="grid">
          {
            Array.from({ length: this.gridSize * this.gridSize }, (_, idx) => (
              <div key={idx} className={`square${idx === currentIndex ? ' active' : ''}`}>
                {idx === currentIndex ? 'B' : null}
              </div>
            ))
          }
        </div>
        <div className="info">
          <h3 id="message">{initialMessage}</h3>
          <h4>lady win #29</h4>
        <h5>lady win #31</h5>
        <h6> lady win #45</h6>
        <h6> lady win #49</h6>
        <h6> lady win #78</h6>
        <h6> lady win #70</h6>
        
        </div>
        <div id="keypad">
          <button onClick={this.move} id="left">LEFT</button>
          <button onClick={this.move} id="up">UP</button>
          <button onClick={this.move} id="right">RIGHT</button>
          <button onClick={this.move} id="down">DOWN</button>
          <button id="reset" onClick={this.reset}>reset</button>
        </div>

        <form onSubmit={this.onSubmit}>
          <input value={initialEmail} id="email" type="email" placeholder="type email" onChange={this.handleChange}></input>
          <input id="submit" type="submit"></input>
        </form>
      </div>
    );
  }
}

export default AppClass;



///////////////////////



// export default AppClass; code with this.grid was slower but saving just in case

///////////////////////////////////////////////////////////

// import React, { Component } from 'react';
// import axios from 'axios';

// class AppClass extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       initialEmail: '',
//       initialMessage: '',
//       initialSteps: 0,
//       currentIndex: 4,
//       currentCoordinate: [],
//     };

//     this.grid = [
//       [1, 1], [1, 2], [1, 3],
//       [2, 1], [2, 2], [2, 3],
//       [3, 1], [3, 2], [3, 3]
//     ];

//     //faster
//     this.coordinateMap = new Map();
//   }

//   componentDidMount() {
//     this.setCurrentCoordinate();
//   }

//   // componentDidUpdate(prevProps, prevState) {
//   //   if (this.state.currentIndex !== prevState.currentIndex) {
//   //     this.setCurrentCoordinate();
//   //   }
//   // }

//   setCurrentCoordinate() {
//     const { currentIndex } = this.state;
//     const currentCoordinate = this.getXY(this.grid, currentIndex);
//     this.setState({ currentCoordinate });
//   }
  
// //faster
// getXY(grid, idx) {
//   if (this.coordinateMap.has(idx)) {
//     return this.coordinateMap.get(idx);
//   }

//   const result = grid.find((block, index) => index === idx);
//   this.coordinateMap.set(idx, result);
//   return result;
// }
//   // getXY(grid, idx) {
//   //   return grid.find((block, index) => index === idx);
//   // }

//   handleChange = (e) => {
//     this.setState({ initialEmail: e.target.value });
//   }

//   reset = () => {
//     this.setState({
//       initialSteps: 0,
//       initialMessage: '',
//       currentIndex: 4,
//       initialEmail: ''
//     });
//   }

//   getNextIndex = (direction) => {
//     const { currentIndex } = this.state;
//     switch (direction) {
//       case 'up':
//         return (currentIndex < 3) ? currentIndex : currentIndex - 3;
//       case 'down':
//         return (currentIndex > 5) ? currentIndex : currentIndex + 3;
//       case 'left':
//         return (currentIndex % 3 === 0) ? currentIndex : currentIndex - 1;
//       case 'right':
//         return ((currentIndex - 2) % 3 === 0) ? currentIndex : currentIndex + 1;
//       default:
//         return currentIndex;
//     }
//   }

//   move = (event) => {
//     const direction = event.target.id;
//     const next = this.getNextIndex(direction);
//     if (next !== this.state.currentIndex) {
//       this.setState((prevState) => ({
//         initialSteps: prevState.initialSteps + 1,
//         currentIndex: next
//       }));
//     } else {
//       // Display the message without updating the state
//       this.setState({ initialMessage: `You can't go ${direction}` });
//     }
//     // if (next !== this.state.currentIndex) {
//     //   this.setState((prevState) => ({
//     //     initialSteps: prevState.initialSteps + 1,
//     //     initialMessage: prevState.initialMessage,
//     //     currentIndex: next
//     //   }));
//     // } else {
//     //   this.setState({ initialMessage: `You can't go ${direction}` });
//     // }
//   }

//   onSubmit = (evt) => {
//     evt.preventDefault();
    
//     const { currentCoordinate, initialEmail, initialSteps } = this.state;
//     const [x, y] = currentCoordinate;

//     axios.post("http://localhost:9000/api/result", { email: initialEmail, steps: initialSteps, x, y })
//       .then(res => {
//         this.setState({ initialMessage: res.data.message });
//       })
//       .catch(err => {
//         console.log(`currentcoordinate x`, x);
//         console.log(`currentcoordinate y`, y);
//         console.log(`initial Steps`, initialSteps);
//         console.log(`initial Email`, initialEmail)
//         console.log(err);
//       });
//   }

//   render() {
//     const { initialEmail, currentIndex, currentCoordinate, initialSteps, initialMessage } = this.state;

//     return (
//       <div id="wrapper" className={this.props.className}>
//         <div className="info">
//           <h3 id="coordinates">{currentIndex === 4 ? `Coordinates ${currentCoordinate}` : `Coordinates ${currentCoordinate}`}</h3>
//           <h3 id="steps">You moved {initialSteps} times</h3>
//         </div>
//         <div id="grid">
//           {
//             [0, 1, 2, 3, 4, 5, 6, 7, 8].map(idx => (
//               <div key={idx} className={`square${idx === currentIndex ? ' active' : ''}`}>
//                 {idx === currentIndex ? 'B' : null}
//               </div>
//             ))
//           }
//         </div>
//         <div className="info">
//           <h3 id="message" >{initialMessage}</h3>
//         </div>
//         <div id="keypad">
//           <button onClick={this.move} id="left">LEFT</button>
//           <button onClick={this.move} id="up">UP</button>
//           <button onClick={this.move} id="right">RIGHT</button>
//           <button onClick={this.move} id="down">DOWN</button>
//           <button id="reset" onClick={this.reset}>reset</button>
//         </div>

//         <form onSubmit={this.onSubmit}>
//           <input value={initialEmail} id="email" type="email" placeholder="type email" onChange={this.handleChange}></input>
//           <input id="submit" type="submit"></input>
//         </form>
//       </div>
//     );
//   }
// }

// export default AppClass;