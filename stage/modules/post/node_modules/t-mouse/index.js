let mouseEventLogged = false;
let keyEventLogged = false;
let mouseMoveHandler;
let mouseUpHandler;
let mousedownHandler;
let mouseButtonClickHandler;
let scrollHandler;
let keydownHandler;
let keyupHandler;


function logMouseCoordinates() {
  if (!mouseEventLogged) {
    let timeStart = 0;
    let timeEnd = 0;

    const data = {
      clickCount: 0,
      moves: [],
      clicks: [],
      scrollCount: 0
    };

    mouseMoveHandler = (event) => {
      console.log('x = '+ event.clientX+ 'y = '+ event.clientY)
      if (timeStart === 0) {
        timeStart = event.timeStamp;
      } else {
        timeEnd = event.timeStamp;
        const timeDifference = (timeEnd - timeStart)/1000;
        console.log("Temps écoulé : " + timeDifference + " secondes");
        timeStart = 0;
        timeEnd = 0;
      }

      const move = {
        x: event.clientX,
        y: event.clientY,
        time: event.timeStamp
      };
      data.moves.push(move);
    };
    window.addEventListener("mousemove", mouseMoveHandler);

      mouseDownHandler = (event) => {
      startTime = new Date().getTime();
    };
    window.addEventListener("mousedown", mouseDownHandler);

       mouseupHandler = (event) => {
      const endTime = new Date().getTime();
      const duration = (endTime - startTime)/1000;
      console.log(`La durée du clic de souris est de ${duration} s`);
      data.clicks.push({
        button: event.button,
        duration: duration,
        time: endTime
      });
    };
    window.addEventListener("mouseup", mouseUpHandler);

     mouseButtonClickHandler = (event) => {
      if (event.button === 0) {
        console.log("Bouton gauche ");
      } else if (event.button === 1) {
        console.log("Bouton central ");
      } else if (event.button === 2) {
        console.log("Bouton droit ");
      }
      data.clickCount++;
    };
    window.addEventListener("mousedown", mouseButtonClickHandler);

       scrollHandler = (event) => {
      console.log("Scrolling");
      data.scrollCount++;
    };
    window.addEventListener("scroll", scrollHandler);

    mouseEventLogged = true;

    return {
      data,
    };
  }
}



function logKeyboardEvents() {
  if (!keyEventLogged) {
    const keyData = {
      keysPressed: [],
      keydownTime: null,
      keyupTime: null
    };

    keydownHandler = (event) => {
      console.log("touche enfoncée: " + event.key);
      keyData.keysPressed.push(event.key);
      keyData.keydownTime = event.timeStamp;
      
    };
    window.addEventListener("keydown", keydownHandler)
    keyupHandler = (event) => {
      console.log("touche libérée: " + event.key);
      keyData.keyupTime = event.timeStamp;
    };
    window.addEventListener("keyup", keyupHandler)


    keyEventLogged = true;
    return keyData;
  }
}

function removeEventListeners () {
  window.removeEventListener('mousemove', mouseMoveHandler);
  window.removeEventListener('mouseButtonClick', mouseButtonClickHandler);
  window.removeEventListener('mousedown', mousedownHandler);
  window.removeEventListener('mouseup', mouseUpHandler);
  window.removeEventListener('scroll', scrollHandler);
  window.removeEventListener('keydown', keydownHandler);
  window.removeEventListener('keyup', keyupHandler);
};



module.exports = {
  logMouseCoordinates,
  logKeyboardEvents,
  removeEventListeners,
  init: function() {
    logMouseCoordinates();
    logKeyboardEvents();
    removeEventListeners();

  }
};
