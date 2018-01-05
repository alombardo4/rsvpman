import * as expressJwt from 'express-jwt';
import { Config } from '../config';
import * as jwt from 'jsonwebtoken';
import { Request, Response, NextFunction} from 'express';
import { default as User } from '../models/user.model';
import * as compose from 'composable-middleware';

const config = new Config();

const validateToken = expressJwt({
    secret: config.secrets.session
});

export function signToken(id: string) {
    return jwt.sign({id: id}, config.secrets.session, {
        expiresIn: 60 * 60 * 5
    });
}

export function setSessionCookie(req: Request, res: Response) {
    if(!req.user) {
        return res.status(404).send('You aren\'t logged in.');
    }
    
    const token = signToken(req.user._id);

    res.cookie('token', token);
    res.redirect('/');
}


export function isAuthenticated() {
    return compose()
        .use((req, res, next) => {
            if(!req.headers.authorization) {
                return res.status(401).send();
            }
            next();
        })
        .use((req, res, next) => {
            validateToken(req, res, next);
        })
        .use((req, res, next) => {
            User.findById(req.user.id).exec()
            .then(user => {
                if(!user) {
                    return res.status(401).send();
                }
                req.user = user;
                next();
            })
            .catch(err => res.status(401).send());
        })

}