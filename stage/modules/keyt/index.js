let keyEventLogged = false;

function logKeyboardEvents() {
  if (!keyEventLogged) {
    const keyData = {
      keysPressed: [],
      keydownTime: null,
      keyupTime: null
    };

    document.addEventListener("keydown", (event) => {
      console.log("touche enfoncée: " + event.key);
      keyData.keysPressed.push(event.key);
      keyData.keydownTime = event.timeStamp;
    });

    document.addEventListener("keyup", (event) => {
      console.log("touche libérée: " + event.key);
      keyData.keyupTime = event.timeStamp;
    });

    keyEventLogged = true;
    return keyData;
  }
}

module.exports.init = logKeyboardEvents;