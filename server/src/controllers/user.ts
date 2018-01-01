import { Request, Response } from "express";
import { default as User, UserModel } from '../models/user.model';

export function createUser(req: Request, res: Response) { 
    if(!req.body.email || !req.body.password || !req.body.profile || !req.body.profile.name) {
        return res.status(400).send();
    }

    User.create(req.body, (err: Error, docs: UserModel[]) => {
        if(err) {
            return res.status(500).send();
        }
        return res.status(201).json(docs);
    });
}

export function getUsers(req: Request, res: Response) {
    User.find({})
        .then((users: UserModel[]) => {
            return res.json(users);
        })
        .catch(err => {
            return res.status(500).send();
        })
}

export function deleteUser(req: Request, res: Response) {
    if(!req.params.id) {
        return res.status(400).send();
    }
    User.remove({_id: req.params.id}).exec()
        .then(() => res.status(202).send())
        .catch(err => res.status(500).send());
}