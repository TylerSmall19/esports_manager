import express from "express";
// @ts-ignore
import cors from 'cors';
import { generatePlayers } from "./services/playerService";

const app = express();

app.use(cors());

const port = 8080; // default port to listen

// define a route handler for the default home page
app.get( "/", ( req, res) => {
    res.send( "Hello world!" );
} );

app.get('/players/scoutingList', ( req, res ) => {
    res.json(generatePlayers(10));
});

// start the Express server
app.listen( port, () => {
    console.log( `server started at http://localhost:${ port }` );
} );