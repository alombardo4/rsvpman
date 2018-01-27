export class Config {
    private _port: number | string = 4000;
    private _secrets = {
        session: 'fakesecret'
    }
    private _mongo = {
        url: 'mongodb://localhost:27017/rsvpman'
    }

    private _seed = false;

    private _eventName = 'Morgen & Alec';

    private _eventDate = new Date();

    private _thankYouMessage = 'We can\'t wait to see you';

    constructor() {
        this._eventDate.setTime(1535850000000);
        if(process.env.PORT) {
            this._port = process.env.PORT;
        }
        if(process.env.SESSION_SECRET) {
            this._secrets.session = process.env.SESSION_SECRET;
        }
        if(process.env.MONGO_URL) {
            this._mongo.url = process.env.MONGO_URL;
        }
        if(process.env.SEED) {
            this._seed = !!parseInt(process.env.SEED);
        }
        if(process.env.EVENT_NAME) {
            this._eventName = process.env.EVENT_NAME;
        }

        if(process.env.THANK_YOU_MESSAGE) {
            this._thankYouMessage = process.env.THANK_YOU_MESSAGE;
        }

        if(process.env.EVENT_DATE) {
            try {
                this._eventDate.setTime(parseInt(process.env.EVENT_DATE));
            } catch(e) {
                this._eventDate.setTime(1535850000000);
            }
        }
    }

    get port(): number | string {
        return this._port;
    }

    get secrets(): ConfigSecrets {
        return this._secrets;
    }

    get mongo(): MongoConfig {
        return this._mongo;
    }

    get seed(): boolean {
        return this._seed;
    }

    get eventName(): string {
        return this._eventName;
    }

    get eventDate(): Date {
        return this._eventDate;
    }

    get thankYouMessage(): string {
        return this._thankYouMessage;
    }
}

export type ConfigSecrets = {
    session: string
}

export type MongoConfig = {
    url: string
}