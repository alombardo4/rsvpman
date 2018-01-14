import { default as Party, PartyModel, PersonModel } from '../models/party.model';
import { Document } from 'mongoose';


type RSVPBody = {
    attendees: PersonModel[]
}

export function getPartyForRSVP(req, res) {
    const key = req.params.key;

    Party.findOne({key: new RegExp(['^', key, '$'].join(''), 'i')}).exec()
        .then(partyDoc => {
            if(!partyDoc) {
                return res.status(404).send();
            }
            const party: PartyModel = partyDoc.toObject() as PartyModel;
            const returnParty = {
                hasRSVPd: party.hasRSVPd,
                people: party.people,
                key: party.key
            };
            return res.json(returnParty);
        })
        .catch(err => res.status(500).send(err));
}

export function createRSVP(req, res) {
    const key = req.params.key;
    Party.findOne({key: new RegExp(['^', key, '$'].join(''), 'i')}).exec()
        .then(partyDoc => {
            if(!partyDoc) {
                return res.status(404).send();
            }

            const party: PartyModel = partyDoc.toObject() as PartyModel;
            party.hasRSVPd = true;

            const attendees = (req.body as RSVPBody).attendees;

            party.people = party.people.map((person: PersonModel) => {
                const newPerson: PersonModel = {...person};
                const attendee = attendees.find((p: PersonModel) => {
                    return p.firstName === person.firstName && p.lastName === person.lastName;
                });
                if(attendee) {
                    newPerson.attending = attendee.attending;
                }

                return newPerson;
            });

            Party.findByIdAndUpdate(partyDoc._id, party).exec()
                .then((doc) => {
                    return res.status(202).send();
                })
                .catch((err) => res.status(500).send(err));

        })
        .catch(err => res.status(500).send(err));
}

export function findKeys(req, res) {
    const firstName = req.query.firstName;
    const lastName = req.query.lastName;
    Party.find({'people.firstName': new RegExp(['^', firstName, '$'].join(''), 'i'), 'people.lastName':  new RegExp(['^', lastName, '$'].join(''), 'i')}, {'key': 1, '_id': 0}).exec()
        .then((docs: Document[]) => {
            if(!docs || docs.length === 0) {
                return res.status(404).send();
            }
            const keys = docs.map(doc => {
                return (doc.toObject() as any).key;
            })

            return res.json(keys);
        })
        .catch(err => res.status(500).send(err));
}