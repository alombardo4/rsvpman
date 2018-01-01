import * as express from 'express';
import { Config } from './config';
import * as authController from './controllers/auth';
import * as userController from './controllers/user';
import * as partyController from './controllers/party';
import * as rsvpController from './controllers/rsvp';
import * as docsController from './docs/swagger';

import * as bodyParser from 'body-parser';
import * as mongoose from 'mongoose';
import * as bluebird from 'bluebird';
import * as passport from 'passport';
import * as session from 'express-session';
import * as connectMongo from 'connect-mongo';
import * as swagger from 'swagger-ui-express';

import { isAuthenticated } from './auth/jwt';
const MongoStore = connectMongo(session);

const config = new Config();

const app = express();
app.use(bodyParser.json());
(<any>mongoose).Promise = bluebird;
mongoose
    .connect(config.mongo.url, { useMongoClient: true })
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
app.use(passport.initialize());
app.use(passport.session());
require('./auth/passport');
// Authorization
app.post('/api/auth/local', authController.postLogin(passport));

// Users
app.post('/api/users', isAuthenticated(), userController.createUser);
app.get('/api/users', isAuthenticated(), userController.getUsers);
app.delete('/api/users/:id', isAuthenticated(), userController.deleteUser);

// Parties
app.post('/api/parties', isAuthenticated(), partyController.createParty);
app.get('/api/parties', isAuthenticated(), partyController.getParties);
app.put('/api/parties/:id', isAuthenticated(), partyController.updateParty);
app.delete('/api/parties/:id', isAuthenticated(), partyController.deleteParty);

// RSVP
app.post('/api/rsvp/:key', rsvpController.createRSVP);
app.get('/api/rsvp/findKeys', rsvpController.findKeys);
app.get('/api/rsvp/:key', rsvpController.getPartyForRSVP);

app.get('/api/docs.json', docsController.docs);

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', '*');

    next();
})
const swaggerOpts = {
    explorer: true,
    swaggerUrl: `http://localhost:${config.port}/api/docs.json`
};
app.use('/api/docs', swagger.serve, swagger.setup('', swaggerOpts));

app.listen(config.port, () => {
    console.log('App listening on port', config.port);
    if(config.seed) {
        console.log('Seeding database');
        require('./models/seed');
    }
})