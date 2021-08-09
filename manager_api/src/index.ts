import express from "express";
// @ts-ignore
import cors from 'cors';
import { ScoutablePlayersDatabaseService } from "./services/database/scoutablePlayerDatabaseService";
import { config as configEnv } from "dotenv";
import { OrgDatabaseService } from "./services/database/orgDatabaseService";
import { ObjectId } from "mongodb";

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

app.post('/orgs', async (req, res) => {
    const db = new OrgDatabaseService();
    const dbRes = await db.saveNewOrg(req.body);

    if (dbRes)
        res.status(201);
    else
        res.status(errorCode);

    res.send();
});

app.post('/orgs/:orgId/players', async (req, res) => {
    const db = new OrgDatabaseService();
    const dbRes = await db.addPlayersToRoster(req.params.orgId, req.body.players);

    if (dbRes)
        res.status(201)
    else
        res.status(errorCode);

    res.send();
});

// start the Express server
app.listen( port, () => {
    console.log( `server started at http://localhost:${ port }` );
} );