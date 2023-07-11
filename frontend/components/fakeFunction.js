   //GETNECTINDEXPREVIOUS

     // function getNextIndex(direction, grid, e, currentIndex) {
  //   let coordinate = getXY(grid, currentIndex);
  //   let userDirection = e.target.id 
  //   let currentIndexLocation = grid.reduce((acc, block,index)  =>{ 
  //     if (coordinate === block){
  //       let data = {index:index, block:block}
  //     return data;
  //     }
  //    return acc; 
  // },{});
  //     const nextIndex= direction[userDirection](currentIndexLocation.index)
  //     setCurrentCoordinate(currentIndexLocation.block)
  //     return nextIndex;
    
  // }


  //   function move(buttonDirection, grid, e, currentIndex) {
// if (e.target.id === 'up'){
//     setCurrentIndex(getNextIndex(buttonDirection, grid, e, currentIndex));
//     onChange(e);
// } else if (e.target.id === 'down'){
//    setCurrentIndex(getNextIndex(buttonDirection, grid, e, currentIndex));
//    onChange(e);
// } else if (e.target.id === 'left'){
//    setCurrentIndex(getNextIndex(buttonDirection, grid, e, currentIndex));
//    onChange(e);
// } else if (e.target.id === 'right'){
//   setCurrentIndex(getNextIndex(buttonDirection, grid, e, currentIndex));
//   onChange(e);
// }
// console.log(buttonDirection, grid, e, currentIndex);
//   }

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
  

    //GETNECTINDEXPREVIOUS

     // function getNextIndex(direction, grid, e, currentIndex) {
  //   let coordinate = getXY(grid, currentIndex);
  //   let userDirection = e.target.id 
  //   let currentIndexLocation = grid.reduce((acc, block,index)  =>{ 
  //     if (coordinate === block){
  //       let data = {index:index, block:block}
  //     return data;
  //     }
  //    return acc; 
  // },{});
  //     const nextIndex= direction[userDirection](currentIndexLocation.index)
  //     setCurrentCoordinate(currentIndexLocation.block)
  //     return nextIndex;
    
  // }

    //Setting which direction each button will move on the array above
 
  // const buttonDirection = {
  //   left: (index) => index - 1,
  //   right: (index) => index + 1,
  //   up: (index) => index -3,
  //   down: (index) => index + 3
  // }

  

  
  // const buttonDirection = {
  //   left: (currentIndex % 3 === 0) ? currentIndex : currentIndex - 1,
  //   right: ((currentIndex -2) % 3 === 0) ? currentIndex : currentIndex + 1,
  //   up: (currentIndex < 3) ? currentIndex :  currentIndex -3,
  //   down: (currentIndex > 5) ? currentIndex : currentIndex + 3
  // }

  //For now I want to find a way to prevent the square from going back/reversed. This code is not working as it says index is not defined, and I tried Currentindex as well. 
  //Why is the ternary code here not working, 

 

//Gets the coordinate numbers, so it shows up on the users end. 