## ENV Variables

- `MONGO_URL` is necessary
- `NODE_ENV` is optional
- `AUTHENTICATION_HOST` and `AUTHENTICATION_PORT` are `localhost` and `8081` by default
- `JLPT_SCORE_HOST` and `JLPT_SCORE_PORT` when other services depends on this service, copy the`score.ts` file, and set this env variable, default `localhost` and `8082`
