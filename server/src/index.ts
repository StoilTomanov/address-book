import { Application, Request, Response } from 'express';
import express from 'express';

import { serverInfo, ServerInfo } from './serverInfo';
import { cors } from './middlewares/cors';

const serverInfoDetails: ServerInfo = serverInfo();
const app: Application = express();

app.use(cors());

app.get('/', (req: Request, res: Response) => {
    res.json(serverInfo());
});

app.listen(serverInfoDetails.port, () => console.log(`Server is running on port: ${serverInfoDetails.port}`));
