import fs from 'fs'
import axios from 'axios';

const JSON_DATA = {
    setting: JSON.parse(fs.readFileSync('./config.json')),
    mess: JSON.parse(fs.readFileSync('./lib/message.json')),
}

export let setting_JSON = JSON_DATA.setting;
export let mess_JSON = JSON_DATA.mess;

export async function axiosFetch(url, options) {
    try {
        options ? options : {}
        const res = await axios({
            method: 'GET',
            url: url,
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36'
            },
            ...options
        })
        return res.data
    } catch (err) {
        return err
    }
}