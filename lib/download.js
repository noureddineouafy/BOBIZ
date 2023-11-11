import {
    createRequire
} from 'module';
let require = createRequire(import.meta.url);
let {
    ytmp4,
    ytmp3,
    ttdl,
    fbdl
} = require('@ruhend/scraper');
export {
    ytmp4,
    ytmp3,
    ttdl,
    fbdl
}