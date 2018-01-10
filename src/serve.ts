import "reflect-metadata";
import * as express from "express";

import * as classrouter from "classrouter";

const morgan = require('morgan')

import { service as confService } from './config';

import * as IModel from 'core/model';
import { Api as ApiRouter } from './api/index';
import * as apiErrors from './api/errors';

const app = express();
app.use(morgan('dev'));

app.use('/', classrouter.attach(express.Router(), ApiRouter, 'app'))


app.use((err: any, req: express.Request, res: express.Response, next: any) => {
    if (err instanceof classrouter.ClassrouterValidationError) {
        var msg = JSON.stringify(err.errors);
        var error = new apiErrors.ValidationError(msg);
        next(error);
    } else {
        next(err);
    }
});

app.use((err: any, req: express.Request, res: express.Response, next: any) => {
    if (err instanceof apiErrors.ValidationError) {
        res.status(400);
        res.json(err);
    } else if (err instanceof apiErrors.FormValidationError) {
        res.status(400);
        res.json(err);
    } else if (err instanceof apiErrors.OtherError) {
        res.status(400);
        res.json(err);
    } else {
        res.status(500);
        res.json({
            name: 'error',
            message: (err && (err.message || JSON.stringify(err))) || 'not handled error'
        });
    }
});


IModel.check()
    .then(() => {
        app.listen(confService.port, () => {
            console.log(`Userly API app listening on port ${confService.port}!`)
        });
    })
    .catch(err => {
        console.log('cannot login database', err);
    });

