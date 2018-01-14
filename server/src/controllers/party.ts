import { default as Party, PartyModel } from '../models/party.model';
import { Request, Response } from 'express';

export function createParty(req: Request, res: Response) {
    if(!req.body.key || !req.body.people) {
        return res.status(400).send();
    }
    if(req.body.people) {
        req.body.people.forEach(person => {
            if(person._id.indexOf('new') > -1) {
                person._id = undefined;
            }
        })
    }
    Party.create(req.body)
        .then(doc => {
            return res.status(201).json(doc);
        })
        .catch(err => res.status(500).send(err));
}

export function getParties(req: Request, res: Response) {
    Party.find({}).exec()
        .then(docs => res.json(docs))
        .catch(err => res.status(500).send(err));
}

export function updateParty(req: Request, res: Response) {
    if(!req.body.key || !req.body.people || req.body.people.length === 0) {
        return res.status(400).send();
    }
    if(req.body.people) {
        req.body.people.forEach(person => {
            if(person._id.indexOf('new') > -1) {
                person._id = undefined;
            }
        })
    }

    Party.findById(req.params.id).exec()
        .then(doc => {
            if(!doc) {
                return res.status(404).send();
            } else {
                Party.findByIdAndUpdate(req.params.id, req.body).exec((err, docs) => {
                    if(err) {
                        return res.status(500).send(err);
                    }
                    return res.status(202).json(docs);
                });
            }
  
        })
        .catch(err => res.status(500).send(err));
}

export function deleteParty(req: Request, res: Response) {
    Party.findByIdAndRemove(req.params.id)
    .then(doc => {
        return res.status(202).send();
    })
    .catch(err => res.status(500).send(err));
}