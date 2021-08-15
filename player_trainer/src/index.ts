import { config } from "dotenv";
import { TrainingDatabaseService } from "./services/database/trainingDatabaseService";
import { beginTraining } from "./services/trainingService";

config();

const trainingHandler = (db : TrainingDatabaseService) => () => {
  console.log('Beginning training');
  beginTraining(db);
}

const db = new TrainingDatabaseService();
setInterval(trainingHandler(db), .2 * 60 * 1000);
