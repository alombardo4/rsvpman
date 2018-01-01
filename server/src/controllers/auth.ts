import { Request, Response, NextFunction } from 'express';
import { UserModel } from '../models/user.model';
import { signToken } from '../auth/jwt';

type LoginBody = {
    email: string,
    password: string
}

export function postLogin(passport) {
    return (req: Request, res: Response, next: NextFunction) => {
        passport.authenticate('local', (err: Error, user, info) => {

            if(err) {
                return res.status(500).send(err);
            }
            if(!user) {
                return res.status(400).send(err);
            }
            const token = signToken(user.id);
            return res.json({token});
        })(req, res, next);
    };
}