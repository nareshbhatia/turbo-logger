import express from 'express';
import fs from 'fs-extra';
import path from 'path';

const logfile = path.join(__dirname, 'data', 'elastic-search.log');

export const loggingRouter = express.Router();

/** create logs */
loggingRouter.post('/', (req, res) => {
  const logs = req.body as Array<object>;
  const action = '{"create":{}}';

  logs.forEach((log) => {
    fs.appendFileSync(logfile, `${action}\n${JSON.stringify(log)}\n`);
  });
  res.status(201).end();
});
