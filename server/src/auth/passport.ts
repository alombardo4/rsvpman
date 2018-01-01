import * as passportLocal from 'passport-local';
import * as passport from 'passport';
import { default as User, comparePassword, UserModel } from '../models/user.model';

import { Request, Response, NextFunction } from 'express';

const LocalStrategy = passportLocal.Strategy;

passport.serializeUser<any, any>((user, done) => {
    done(undefined, user._id);
});

passport.deserializeUser((id, done) => {
    User.findById(id).exec((err, user) => {
        done(err, user);
    });
});

passport.use(new LocalStrategy({usernameField: 'email', passwordField: 'password'}, (email, password, done) => {
    User.findOne({email: email.toLowerCase() }).select('password').exec().then((user: UserModel) => {
        if(!user) {
            return done(undefined, false, { message: 'Email not found' });
        }
        comparePassword(password, user.password, (err: any, isMatch: any): any => {
            if(err) { return done(err); }
            if(isMatch) {
                return done(undefined, user);
            }
            return done(undefined, false, { message: 'Invalid email or password' });
        });
    }).catch(err => done(err));
}));
