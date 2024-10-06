import { Application, Request, Response } from 'express';
import express from 'express';
import mongoose from 'mongoose';

import { serverInfo, ServerInfo } from './serverInfo';
import { cors } from './middlewares/cors';
import { addressBookRecordsHandler } from './handlers/address-book-records';

const dbUrl: string = 'mongodb://localhost:27017/address-book';
const serverInfoDetails: ServerInfo = serverInfo();
const app: Application = express();

async function init(): Promise<void> {
    try {
        await mongoose.connect(dbUrl);
        console.log('Database conected');
    } catch (error) {
        console.error('Database connection failed');
        process.exit(1);
    }

    app.use(express.json());
    app.use(cors());
    app.use('/address-book', addressBookRecordsHandler);

    app.get('/', (req: Request, res: Response) => {
        res.json(serverInfo());
    });

    app.listen(serverInfoDetails.port, () => console.log(`Server is running on port: ${serverInfoDetails.port}`));
}

init();

export default app;
