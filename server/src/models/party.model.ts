import * as mongoose from 'mongoose';

export type PartyModel = {
    key: string,
    people: PersonModel[],
    hasRSVPd: boolean
}

export type PersonModel = {
    firstName: string,
    lastName: string,
    attending: boolean
}

const partySchema = new mongoose.Schema({
    key: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    hasRSVPd: {
        type: Boolean,
        default: false
    },
    people: [{
        firstName: {
            type: String,
            required: true,
            index: true
        },
        lastName: {
            type: String,
            required: true,
            index: true
        },
        attending: {
            type: Boolean,
            default: false
        }
    }]
}, { timestamps: true});

const Party = mongoose.model('Party', partySchema);
export default Party;