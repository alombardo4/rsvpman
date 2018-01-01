import * as express from 'express';
import { Config } from './config';


import * as bodyParser from 'body-parser';
import * as mongoose from 'mongoose';
import * as bluebird from 'bluebird';
import * as passport from 'passport';
import * as session from 'express-session';
import * as connectMongo from 'connect-mongo';
import { configureRoutes } from './routes';
import { configureSwagger } from './docs/swagger';



export default {
    start: (config: Config) => {
        const MongoStore = connectMongo(session);

        
        const app = express();
        
        (<any>mongoose).Promise = bluebird;
        mongoose
            .connect(config.mongo.url)
            .then(() => console.log('MongoDB connected!'))
            .catch(err => {
                console.log('MongoDB failed to connect');
                process.exit();
            });
        
        
        app.use(session({
            secret: config.secrets.session,
            saveUninitialized: true,
            resave: true,
            store: new MongoStore({
                url: config.mongo.url,
                autoReconnect: true
            })
        }))

        app.use(bodyParser.json());
        app.use(passport.initialize());
        app.use(passport.session());
        require('./auth/passport');
        
        configureRoutes(app, passport);

        configureSwagger(app, config);
        
        app.use((req, res, next) => {
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
            res.header('Access-Control-Allow-Headers', '*');
            next();
        })


        app.listen(config.port, () => {
            console.log('App listening on port', config.port);
            if(config.seed) {
                console.log('Seeding database');
                require('./models/seed');
            }
        })
    }
};