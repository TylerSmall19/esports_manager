import express from "express";
// @ts-ignore
import cors from 'cors';
import { ScoutablePlayersDatabaseService } from "./services/scoutablePlayerDatabaseService";
import { config } from "dotenv";

config();

const app = express();

app.use(cors());

const port = 8080; // default port to listen

// define a route handler for the default home page
app.get( "/", ( req, res) => {
    res.send( "Hello world!" );
} );

app.get('/players/scoutingList', async ( req, res ) => {
    const db = new ScoutablePlayersDatabaseService();
    const dbRes = await db.getScoutablePlayers();

    res.json(dbRes);
});

// start the Express server
app.listen( port, () => {
    console.log( `server started at http://localhost:${ port }` );
} );