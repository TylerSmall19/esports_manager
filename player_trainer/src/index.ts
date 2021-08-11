import { config } from "dotenv";
import { beginTraining } from "./services/trainingService";

config();

const trainingHandler = () => {
  console.log('Beginning training');
  beginTraining();
}

trainingHandler();
setInterval(trainingHandler, 5 * 60 * 1000);
