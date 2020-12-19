#localhost

## GETTING STARTED - FRONTEND DEVELOPERS
Run `npm run start:local`. 

This will apply the environment file defined in `envs/local.json`.

When applied, the local environment file will initiatlize the app's [InitialState](https://github.com/alo9507/localhost-rn/blob/master/src/store/InitialState.js) with mock services for data fetching and authentication.

You do not have to worry about the backend. The mock backend applied by `local.json` will fully replace the backend with mock data that YOU control.

## GETTING STARTED - BACKEND DEVELOPERS

Run `docker-compose -f docker-compose.development.yml up`