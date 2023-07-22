import React, { Component } from 'react';
import axios from 'axios';

class AppClass extends Component {
  constructor(props) {
    super(props);
    this.state = {
      initialEmail: '',
      initialMessage: '',
      initialSteps: 0,
      currentIndex: 4,
      currentCoordinate: [],
    };

    this.grid = [
      [1, 1], [1, 2], [1, 3],
      [2, 1], [2, 2], [2, 3],
      [3, 1], [3, 2], [3, 3]
    ];
  }

  componentDidMount() {
    this.setCurrentCoordinate();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.currentIndex !== prevState.currentIndex) {
      this.setCurrentCoordinate();
    }
  }

  setCurrentCoordinate() {
    const { currentIndex } = this.state;
    const currentCoordinate = this.getXY(this.grid, currentIndex);
    this.setState({ currentCoordinate });
  }

  getXY(grid, idx) {
    return grid.find((block, index) => index === idx);
  }

  handleChange = (e) => {
    this.setState({ initialEmail: e.target.value });
  }

  reset = () => {
    this.setState({
      initialSteps: 0,
      initialMessage: '',
      currentIndex: 4,
      initialEmail: ''
    });
  }

  getNextIndex(direction) {
    const { currentIndex } = this.state;
    switch (direction) {
      case 'up':
        return (currentIndex < 3) ? currentIndex : currentIndex - 3;
      case 'down':
        return (currentIndex > 5) ? currentIndex : currentIndex + 3;
      case 'left':
        return (currentIndex % 3 === 0) ? currentIndex : currentIndex - 1;
      case 'right':
        return ((currentIndex - 2) % 3 === 0) ? currentIndex : currentIndex + 1;
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
        initialMessage: prevState.initialMessage,
        currentIndex: next
      }));
    } else {
      this.setState({ initialMessage: `You can't go ${direction}` });
    }
  }

  onSubmit = (evt) => {
    evt.preventDefault();
    const { currentCoordinate, initialEmail, initialSteps } = this.state;
    const [x, y] = currentCoordinate;

    axios.post("http://localhost:9000/api/result", { email: initialEmail, steps: initialSteps, x, y })
      .then(res => {
        this.setState({ initialMessage: res.data.message });
      })
      .catch(err => {
        console.log(`currentcoordinate x`, x);
        console.log(`currentcoordinate y`, y);
        console.log(`initial Steps`, initialSteps);
        console.log(`initial Email`, initialEmail)
        console.log(err);
      });
  }

  render() {
    const { initialEmail, currentIndex, currentCoordinate, initialSteps, initialMessage } = this.state;

    return (
      <div id="wrapper" className={this.props.className}>
        <div className="info">
          <h3 id="coordinates">{currentIndex === 4 ? `Coordinates ${currentCoordinate}` : `Coordinates ${currentCoordinate}`}</h3>
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
