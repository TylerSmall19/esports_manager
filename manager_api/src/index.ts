import express from "express";
// @ts-ignore
import cors from 'cors';
import { ScoutablePlayersDatabaseService } from "./services/database/scoutablePlayerDatabaseService";
import { config as configEnv } from "dotenv";
import { TeamDatabaseService } from "./services/database/teamDatabaseService";

configEnv();

const app = express();

app.use(cors());
app.use(express.json());

const port = 8080; // default port to listen
const errorCode = 400;

app.get('/players/scoutingList', async ( req, res ) => {
    const db = new ScoutablePlayersDatabaseService();
    const dbRes = await db.getScoutablePlayers();

    res.json(dbRes);
});

app.post('/teams', async (req, res) => {
    const db = new TeamDatabaseService();
    const dbRes = await db.saveNewTeam(req.body);

    if (dbRes)
        res.status(201);
    else
        res.status(errorCode);

    res.send();
});

app.post('/teams/:teamId/players', async (req, res) => {
    const db = new TeamDatabaseService();
    const dbRes = await db.addPlayersToRoster(req.params.teamId, req.body.players);

    if (dbRes)
        res.status(201)
    else
        res.status(errorCode);

    res.send();
});

app.get('/teams/:teamId', async (req, res) => {
    const db = new TeamDatabaseService();
    const dbRes = await db.getTeamById(req.params.teamId);

    if (dbRes) {
        res.json(dbRes);
    }
    else {
        res.status(errorCode);
        res.send();
    }
});

// start the Express server
app.listen( port, () => {
    console.log( `server started at http://localhost:${ port }` );
} );