export class Config {
    private _port: number | string = 4000;
    private _secrets = {
        session: 'fakesecret'
    }
    private _mongo = {
        url: 'mongodb://localhost:27017/rsvpman'
    }

    private _seed = false;

    constructor() {
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
}

export type ConfigSecrets = {
    session: string
}

export type MongoConfig = {
    url: string
}