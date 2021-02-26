import * as express from 'express';
import { bootstrap } from './main-server';
import { SERVER_CONFIGURATIONS } from './configuration';
bootstrap(express()).then((serv) => {
    serv.listen(SERVER_CONFIGURATIONS.PORT);
});
