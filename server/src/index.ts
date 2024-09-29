import { Application, Request, Response } from 'express';
import express from 'express';
import mongoose, { ConnectOptions } from 'mongoose';

import { serverInfo, ServerInfo } from './serverInfo';
import { cors } from './middlewares/cors';

async function init() {
    const dbUrl = 'mongodb://localhost:27017/address-book';
    const serverInfoDetails: ServerInfo = serverInfo();
    const app: Application = express();

    app.use(cors());

    await mongoose.connect(dbUrl);
    console.log('Database conected');

    app.get('/', (req: Request, res: Response) => {
        res.json(serverInfo());
    });

    app.listen(serverInfoDetails.port, () => console.log(`Server is running on port: ${serverInfoDetails.port}`));
}

init();
