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
import * as path from 'path';


export default {
    start: (config: Config) => {
        const MongoStore = connectMongo(session);

        
        const app = express();

        app.use((req, res, next) => {
            console.log('received request to', req.path);
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
            next();
        });

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
            saveUninitialized: false,
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
        
        app.use(express.static('./client'));
        app.get('*', (req, res) => {
            const p = req.path.replace('/', '');
            if(p.indexOf('bundle.js') > -1 || p.indexOf('bundle.css') > -1) {
                return res.sendFile(path.resolve(__dirname, 'client', p));
            }
            res.sendFile(path.resolve(__dirname, 'client', 'index.html'));
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