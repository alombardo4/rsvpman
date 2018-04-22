import * as mongoose from 'mongoose';

export type PartyModel = {
    key: string,
    people: PersonModel[],
    hasRSVPd: boolean,
    rsvpNote?: string
}

export type PersonModel = {
    firstName: string,
    lastName: string,
    attending: boolean,
    rehearsal?: {
        invited: boolean,
        attending: boolean
    }
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
    rsvpNote: {
        type: String,
        default: ''
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
        },
        rehearsal: {
            invited: {
                type: Boolean,
                default: false
            },
            attending: {
                type: Boolean,
                default: false
            }
        }
    }]
}, { timestamps: true});

const Party = mongoose.model('Party', partySchema);
export default Party;