import * as bcrypt from 'bcrypt-nodejs';
import * as crypto from 'crypto';
import * as mongoose from 'mongoose';

export type UserModel = mongoose.Document & {
    email: string,
    password: string,
    profile: {
        name: string
    }
}

const userSchema = new mongoose.Schema({
    email: {
        type: String, 
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        select: false
    },
    profile: {
        name: String
    }
}, { timestamps: true });

userSchema.pre('save', function save(next) {
    const user = this;
    
    if(!user.isModified('password')) { return next(); }

    bcrypt.genSalt(10, (err, salt) => {
        if(err) { return next(err); }

        bcrypt.hash(user.password, salt, undefined, (err: mongoose.Error, hash) => {
            if(err) { return next(err); }
            user.password = hash;
            next();
        })
    })
});

export function comparePassword(candidatePassword: string, realPassword: string, cb: (err: Error, isMatch: boolean) => {}) {
    bcrypt.compare(candidatePassword, realPassword, cb);
}

const User = mongoose.model('User', userSchema);

export default User;