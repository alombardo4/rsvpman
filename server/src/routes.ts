import * as authController from './controllers/auth';
import * as userController from './controllers/user';
import * as partyController from './controllers/party';
import * as rsvpController from './controllers/rsvp';
import * as docsController from './docs/swagger';
import { isAuthenticated } from './auth/jwt';

export function configureRoutes(app, passport) {
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
    
    // Swagger
    app.get('/api/docs.json', docsController.docs);

    return app;
}