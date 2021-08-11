const trainingHandler = () => {
  console.log('Training has occurred!');
}

trainingHandler();
setInterval(trainingHandler, 5 * 60 * 1000);
