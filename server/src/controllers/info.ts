import { Config } from "../config";

export function eventInfo(req, res) {
    const config = new Config();
    return res.json({
        name: config.eventName,
        date: config.eventDate
    })
}