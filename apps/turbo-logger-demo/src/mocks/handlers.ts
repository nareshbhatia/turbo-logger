import { Log } from '@turboutils/logger';
import { rest } from 'msw';
import { MOCK_API_URL, MOCK_LOGGER_PATH } from './constants';
import { mockMovies } from './mockMovies';

let movieFetchCount = 0;

export const handlers = [
  rest.get(`${MOCK_API_URL}/top-10-movies`, (req, res, ctx) => {
    // Fail every 6th time
    movieFetchCount++;
    return movieFetchCount % 6 === 0
      ? res(ctx.status(503), ctx.json('Movies service is down'))
      : res(ctx.status(200), ctx.json(mockMovies));
  }),

  rest.post(MOCK_LOGGER_PATH, (req, res, ctx) => {
    const logs: Array<Log> = req.body as Array<Log>;
    console.log(JSON.stringify(logs, null, '  '));
    return res(ctx.status(201));
  }),
];
