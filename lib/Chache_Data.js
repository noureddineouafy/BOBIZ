import fs from 'fs'
import chalk from 'chalk'
import moment from 'moment'
import path, {
    dirname
} from 'path'
import {
    createRequire
} from 'module';
import {
    fileURLToPath
} from 'url'
const require = createRequire(import.meta.url);
const __dirname = dirname(fileURLToPath(import.meta.url))
const time = moment().format('HH:mm:ss DD/MM/YYYY');

function uncache(module = '.') {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(module)];
            resolve();
        } catch (e) {
            reject(e);
        }
    });
}

function nocache(module, cb = () => {}) {
    fs.watchFile(require.resolve(module), async () => {
        await uncache(require.resolve(module));
        cb(module);
    });
}

const _0x37b849=_0x52da;function _0x1858(){const _0x3f4844=['../command','133839ppIcTx','320KxnEQc','join','[\x20Millie\x20M','cyanBright','2098905rnachb','\x22\x20Telah\x20di','endsWith','readdirSyn','5290420PclGpr','D\x20]\x20\x20','513245NCyUBw','log','6uRBvXU','2384011TkMoEq','update!','7537208saiSgS','53409GJmMZC','.js','56uedmYX','greenBrigh'];_0x1858=function(){return _0x3f4844;};return _0x1858();}(function(_0xb0f563,_0x366819){const _0x2e8692=_0x52da,_0x624d6f=_0xb0f563();while(!![]){try{const _0x11b315=-parseInt(_0x2e8692(0x181))/(-0x2*-0x791+0x7*-0xb3+-0xa3c*0x1)+parseInt(_0x2e8692(0x189))/(-0x1c9c+0x1a9a*0x1+0x204)*(-parseInt(_0x2e8692(0x187))/(-0x2350+-0x1c8b*0x1+0xda*0x4b))+parseInt(_0x2e8692(0x17f))/(0x8*0x1df+-0x21e4+0x12f0)+-parseInt(_0x2e8692(0x17b))/(-0x63*-0x3e+-0x25*0x31+-0x10e0)+-parseInt(_0x2e8692(0x183))/(-0x14d*0xf+0x12ab*-0x2+-0x1*-0x38df)*(-parseInt(_0x2e8692(0x184))/(-0xbf8+-0xda+0xcd9))+parseInt(_0x2e8692(0x186))/(-0x5e3*0x2+0x88*-0x3d+0x2c36*0x1)+-parseInt(_0x2e8692(0x18c))/(0x16af+0x1f80+-0x3626)*(parseInt(_0x2e8692(0x18d))/(-0x1*0xffd+0x2156+-0x114f));if(_0x11b315===_0x366819)break;else _0x624d6f['push'](_0x624d6f['shift']());}catch(_0x5d56a8){_0x624d6f['push'](_0x624d6f['shift']());}}}(_0x1858,0x9*0x10faa+-0xc32aa+0xd4c0b));const pluginsFolder=path[_0x37b849(0x18e)](__dirname,_0x37b849(0x18b)+'s'),files=fs[_0x37b849(0x17e)+'c'](pluginsFolder);function _0x52da(_0x9658bb,_0x31aaf7){const _0x38acca=_0x1858();return _0x52da=function(_0x320d3e,_0x2f6d56){_0x320d3e=_0x320d3e-(0x1835+-0x33d*-0x6+-0x2a28*0x1);let _0x4bdaa2=_0x38acca[_0x320d3e];return _0x4bdaa2;},_0x52da(_0x9658bb,_0x31aaf7);}for(const file of files){if(file[_0x37b849(0x17d)](_0x37b849(0x188))){const pluginPath=path[_0x37b849(0x18e)](pluginsFolder,file),plugin=await import(pluginPath);nocache(pluginPath,_0x4bdaa2=>console[_0x37b849(0x182)](chalk[_0x37b849(0x18a)+'t'](_0x37b849(0x18f)+_0x37b849(0x180))+time+chalk[_0x37b849(0x190)]('\x20\x22'+_0x4bdaa2+(_0x37b849(0x17c)+_0x37b849(0x185)))));}}

import '../main.js'
nocache('../main.js', module =>
    console.log(chalk.greenBright('[ BOBIZ MD ]  ') + time + chalk.cyanBright(` "${module}" تم التحديث`))
);

import '../handler.js'
nocache('../handler.js', module =>
    console.log(chalk.greenBright('[ BOBIZ MD ]  ') + time + chalk.cyanBright(` "${module}" ثم التحذيث`))
);

import './func_Server.js'
nocache('./func_Server.js', module =>
    console.log(chalk.greenBright('[ Bobiz MD ]  ') + time + chalk.cyanBright(` "${module}" ثم التحذيث`))
);

export {
    nocache,
    uncache
};