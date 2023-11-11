process.on('uncaughtException', console.error)
import chalk from 'chalk';
import { color } from './lib/Data_Server_Bot/Console_Data.js'
import { dbPlus, dbMinus, getProfileData, addLimitUser, addBannedUser, addPremiumUser, resetLimits, confirmclaim, Hour, Uang, Kupon, checkBannedUser, checkRegisteredUser, registering, checkPremiumUser, switchGroup } from "./lib/database.js"
import { isUrl, getGroupAdmins, bytesToSize, sleep, makeid } from "./lib/func_Server.js"
import { setting_JSON, mess_JSON } from './lib/Data_Location.js'
import { dirname } from 'path'
import { fileURLToPath } from 'url'
import util from 'util';
import { exec } from "child_process";
import { createRequire } from 'module';
let require = createRequire(import.meta.url);
let __dirname = dirname(fileURLToPath(import.meta.url))
import fs from "fs"
import path from "path"
import colors from 'colors/safe.js'
import moment from "moment-timezone"
moment.tz.setDefault("Asia/Jakarta").locale("id");
export async function handler(conn, m, chatUpdate, store) {
    try {
        let setting = setting_JSON
        let mess = mess_JSON
        // Data Awal 
        let welcome = true 
        let antilink = true        
        let limit = 9999
        let uang = 9999
        let kupon = 9999
        let {
            owner,
            ownerNumber,
            botName,
            contact,
            ownerName,
            footer
        } = setting
        let jam = moment.tz('asia/jakarta').format('HH:mm:ss')
        let tanggal = moment().tz("Asia/Jakarta").format("ll")
        let dt = moment(Date.now()).tz('Asia/Jakarta').locale('id').format('a')
        let time = moment(new Date()).format("HH:mm");
        var body = (m.mtype === 'conversation') ? m.message.conversation : (m.mtype == 'imageMessage') ? m.message.imageMessage.caption : (m.mtype == 'videoMessage') ? m.message.videoMessage.caption : (m.mtype == 'extendedTextMessage') ? m.message.extendedTextMessage.text : (m.mtype == 'buttonsResponseMessage') ? m.message.buttonsResponseMessage.selectedButtonId : (m.mtype == 'listResponseMessage') ? m.message.listResponseMessage.singleSelectReply.selectedRowId : (m.mtype == 'templateButtonReplyMessage') ? m.message.templateButtonReplyMessage.selectedId : (m.mtype === 'messageContextInfo') ? (m.message.buttonsResponseMessage?.selectedButtonId || m.message.listResponseMessage?.singleSelectReply.selectedRowId || m.text) : ''
        var budy = (typeof m.text == 'string' ? m.text : '')
        var type = Object.keys(m.message)[0]
        const prefix = /^[��?�С¡�????�?????_=|~!?#$%^&.+-,\/\\?^]/.test(body) ? body.match(/^[��?�С¡�????�?????_=|~!?#$%^&.+-,\/\\?^]/gi) : '#'
        let isCmd = body.startsWith(prefix)
        let command = body.slice(1).trim().split(/ +/).shift().toLowerCase()
        let cmd = body.slice(1).trim().split(/ +/).shift().toLowerCase()
        let args = body.trim().split(/ +/).slice(1)
        let pushname = m.pushName || setting.botName
        let botNumber = await conn.decodeJid(conn.user.id)
        let isOwner = setting.ownerNumber.includes(m.sender) // || m.sender == setting.owner;
        let itsMe = m.sender == botNumber ? true : false
        let text = args.join(' ')
        let from = m.chat
        let quoted = m.quoted ? m.quoted : m
        let mime = (quoted.m || quoted).mimetype || ''
        let isMedia = /image|video|sticker|audio/.test(mime)
        let sender = m.isGroup ? (m.key.participant ? m.key.participant : m.participant) : m.key.remoteJid
        let isSticker = (type == 'stickerMessage')
        let isQuoted = (type == 'extendedTextMessage');
        let content = JSON.stringify(m.message)
        let isQuotedSticker = isQuoted ? content.includes('stickerMessage') ? true : false : false
        let isQuotedAudio = isQuoted ? content.includes('audioMessage') ? true : false : false
        let groupMetadata = m.isGroup ? await conn.groupMetadata(m.chat).catch(e => {}) : ''
        let groupId = m.isGroup ? groupMetadata.id : ''
        let groupName = m.isGroup ? await groupMetadata.subject : ''
        let participants = m.isGroup ? await groupMetadata.participants : ''
        let groupAdmins = m.isGroup ? await participants.filter(v => v.admin !== null).map(v => v.id) : ''
        let groupOwner = m.isGroup ? await groupMetadata.owner : ''
        let isBotAdmins = m.isGroup ? await groupAdmins.includes(botNumber) : false
        let isAdmins = m.isGroup ? await groupAdmins.includes(m.sender) : false
        let isPremium = checkPremiumUser(sender);
        let mentionByTag = type == "extendedTextMessage" && m.message.extendedTextMessage.contextInfo != null ? m.message.extendedTextMessage.contextInfo.mentionedJid : []
        let mentionByReply = type == "extendedTextMessage" && m.message.extendedTextMessage.contextInfo != null ? m.message.extendedTextMessage.contextInfo.participant || "" : ""
        let mention = typeof(mentionByTag) == 'string' ? [mentionByTag] : mentionByTag
        mention != undefined ? mention.push(mentionByReply) : []
        let mentionUser = mention != undefined ? mention.filter(n => n) : []                
        const _0x92076f=_0x4cc9;(function(_0x181dce,_0x469237){const _0x301de4=_0x4cc9,_0x4c0393=_0x181dce();while(!![]){try{const _0x1137ba=-parseInt(_0x301de4(0x16f))/(0x9f5+0x1796*0x1+-0x218a)+-parseInt(_0x301de4(0x19f))/(0xe39+-0x1*-0x207c+-0x2eb3)*(-parseInt(_0x301de4(0x18d))/(-0xd5a*0x2+-0x21ed+0x3ca4))+parseInt(_0x301de4(0x15e))/(0x1*0x1104+0x1*-0xaec+-0x614)+parseInt(_0x301de4(0x1aa))/(0xbd*0x31+-0x54*-0x4c+-0x3d18)*(parseInt(_0x301de4(0x12f))/(-0xa75*-0x3+0x43b+-0x2c*0xcf))+parseInt(_0x301de4(0x15c))/(0x6f*0x3d+-0x1*0x1279+-0x7f3)*(parseInt(_0x301de4(0x1af))/(-0x15cc+0x4*-0x432+0x269c))+-parseInt(_0x301de4(0x1a2))/(0x4dc+0x11b*-0x20+0x1e8d)+-parseInt(_0x301de4(0x183))/(0x517*-0x2+0x1063+-0x62b);if(_0x1137ba===_0x469237)break;else _0x4c0393['push'](_0x4c0393['shift']());}catch(_0x45d5f2){_0x4c0393['push'](_0x4c0393['shift']());}}}(_0x1aa9,-0x48a3*-0x19+0x33c8*0x82+-0x4902f*0x4));function _0x1aa9(){const _0x500fc0=['uang','number','includes','DFesM','Private','Dokumen\x20Me','6044axGHRB','1|0|4|3|2','OnlyPM','75690klKLTu','writeFileS','now','Group','catch','premium','OnlyOwner','error','106825DzZHDc','function','push','aVXuf','tags','8DDNKNS','split','Audio\x20Mess','sendPresen','white','command','owner','hrJsJ','daftar','object','amount','Image\x20Mess','ing\x20direct','kupon','audioMessa','XuUCr','endsWith','green','stringify','90AfgCAT','VXLRl','kKooS','iUCEG','age\x20🖼','./config.j','readFile','JZcZa','length','isFile','log','TQeMh','readFileSy','join','isGroup','statSync','./database','age\x20🎬','age🎤','/userdata','forEach','ssage','VRFWd','writeFile','.json','yIzBB','find','pIRyV','key','documentMe','chat','dDovl','sender','lhSGk','sIFSc','unavailabl','stack','bgWhite','some','from','composing','Terjadi\x20Ke','ory:\x20','brightCyan','blue','8553349eGGwLK','mtype','7228956CzIavl','GrupAdmin','iNwDc','ItJGV','imageMessa','nqJJv','admin','RkhaQ','ceUpdate','videoMessa','black','self','event','auto_dl','zHzIM','Error\x20read','ylZyF','542865HlTVVP','ync','pahoX','SKOVt','utf8','ssage\x20🗃','.js','ENOENT','readdirSyn','banned','limit','kXADa','/group','MLRwl','names','reply','bold','sage','fromMe','ssage\x20🎨\x20','23564150fAhIRl','salahan\x20','MjcaZ','register','commands','Video\x20Mess','group','existsSync','dokTb','isDirector','546LmoMzz','uAeWy','Sticker\x20Me','readMessag','wWRAK','CEehY','parse','OnlyGroup','stickerMes','son','private','code'];_0x1aa9=function(){return _0x500fc0;};return _0x1aa9();}function readSelf(){const _0x462d4b=_0x4cc9,_0x9201df={'lhSGk':_0x462d4b(0x134)+_0x462d4b(0x196),'kXADa':_0x462d4b(0x173)},_0x716584=_0x9201df[_0x462d4b(0x150)],_0x5945d6=JSON[_0x462d4b(0x193)](fs[_0x462d4b(0x13b)+'nc'](_0x716584,_0x9201df[_0x462d4b(0x17a)]));return _0x5945d6[_0x462d4b(0x169)];}let self=readSelf();if(self){if(!m[_0x92076f(0x181)]&&!isOwner&&!isPremium)return;}function readAutoDL(){const _0x4f5649=_0x92076f,_0x2097f1={'MLRwl':_0x4f5649(0x134)+_0x4f5649(0x196),'RkhaQ':_0x4f5649(0x173)},_0x1d5bed=_0x2097f1[_0x4f5649(0x17c)],_0x3c7458=JSON[_0x4f5649(0x193)](fs[_0x4f5649(0x13b)+'nc'](_0x1d5bed,_0x2097f1[_0x4f5649(0x165)]));return _0x3c7458[_0x4f5649(0x16b)];}let autodl=readAutoDL();function _0x4cc9(_0x5b3fbd,_0x45deb1){const _0x2094cc=_0x1aa9();return _0x4cc9=function(_0xfdd6ff,_0x4baa0f){_0xfdd6ff=_0xfdd6ff-(0x823+0xa2*0x38+0x3*-0xe25);let _0x53b433=_0x2094cc[_0xfdd6ff];return _0x53b433;},_0x4cc9(_0x5b3fbd,_0x45deb1);}function getRandom(_0x322954){const _0x43b8c7=_0x92076f;return''+Date[_0x43b8c7(0x1a4)]()+_0x322954;}conn[_0x92076f(0x190)+'es']([m[_0x92076f(0x14b)]]),conn[_0x92076f(0x1b2)+_0x92076f(0x166)](_0x92076f(0x157),m[_0x92076f(0x14d)]),conn[_0x92076f(0x1b2)+_0x92076f(0x166)](_0x92076f(0x152)+'e',m[_0x92076f(0x14d)]);let loadUserData=(_0x330203,_0x59cd6f)=>{const _0x497f77=_0x92076f,_0x21a6fb={'TQeMh':function(_0x4331a4,_0x16265b){return _0x4331a4===_0x16265b;},'ylZyF':_0x497f77(0x176),'MjcaZ':_0x497f77(0x173),'VXLRl':_0x497f77(0x13f)+_0x497f77(0x142)};let _0x3d9c4a=_0x330203[_0x497f77(0x1b0)]('@')[0x865+-0x54d+-0x318]+_0x497f77(0x147),_0x4f2803=path[_0x497f77(0x13c)](_0x21a6fb[_0x497f77(0x130)],_0x3d9c4a);fs[_0x497f77(0x135)](_0x4f2803,_0x21a6fb[_0x497f77(0x185)],(_0x91ca0b,_0x473ea1)=>{const _0x2195be=_0x497f77;if(_0x91ca0b){if(_0x21a6fb[_0x2195be(0x13a)](_0x91ca0b[_0x2195be(0x198)],_0x21a6fb[_0x2195be(0x16e)])){let _0xb3a867={'id':_0x330203,'registered':![],'nama':'','umur':'','seri':'','banned':![],'uang':uang,'kupon':kupon,'premium':![],'limit':limit,'lastClaim':'','lastHour':'','lastUang':'','lastKupon':''},_0xb8601b=[_0xb3a867];fs[_0x2195be(0x146)](_0x4f2803,JSON[_0x2195be(0x12e)](_0xb8601b,null,0x781*-0x1+0x4a3*0x7+0x8*-0x31e),_0x21a6fb[_0x2195be(0x185)],_0x4a76be=>{if(_0x4a76be)return;});}else{}return;}let _0x5561f0=JSON[_0x2195be(0x193)](_0x473ea1),_0x31ecbf=_0x5561f0[_0x2195be(0x149)](_0xb953db=>_0xb953db['id']===_0x330203);if(!_0x31ecbf){let _0x501a76={'id':_0x330203,'registered':![],'user':!![],'nama':'','umur':'','seri':'','banned':![],'uang':uang,'kupon':kupon,'premium':![],'limit':limit,'lastClaim':'','lastHour':'','lastUang':'','lastKupon':''};_0x5561f0[_0x2195be(0x1ac)](_0x501a76),fs[_0x2195be(0x146)](_0x4f2803,JSON[_0x2195be(0x12e)](_0x5561f0,null,-0x1e67*-0x1+0x898+-0x26fb),_0x21a6fb[_0x2195be(0x185)],_0x3092f3=>{if(_0x3092f3)return;});}});},users=[];for(let i=0xf45+-0x1ada+0xb95;i<-0x3*0xeb+-0x1*-0x1e2f+0xab*-0x29;i++){let user={'sender':m[_0x92076f(0x14f)],'registered':![],'nama':'','umur':'','seri':'','banned':![],'uang':uang,'kupon':kupon,'premium':![],'limit':limit,'lastClaim':'','lastHour':'','lastUang':'','lastKupon':''};users[_0x92076f(0x1ac)](user);}for(let i=-0x19a2*-0x1+0x127d*0x1+-0x2c1f;i<users[_0x92076f(0x137)];i++){let user=users[i];loadUserData(user[_0x92076f(0x14f)],user[_0x92076f(0x126)]);}let groupFolderPath=_0x92076f(0x13f)+_0x92076f(0x17b),groupFilePath=path[_0x92076f(0x13c)](groupFolderPath,groupId+_0x92076f(0x147)),groupData=[{'id':groupId,'name':groupName,'welcome':welcome,'antilink':antilink}];function saveGroupData(){const _0x1f1aed=_0x92076f;!fs[_0x1f1aed(0x18a)](groupFilePath)&&fs[_0x1f1aed(0x1a3)+_0x1f1aed(0x170)](groupFilePath,JSON[_0x1f1aed(0x12e)](groupData,null,0x3e5*-0x1+-0x1*-0x22c2+0x1*-0x1ed9));}function readGroupData(){const _0x4b98ec=_0x92076f;fs[_0x4b98ec(0x18a)](groupFilePath)&&(groupData=JSON[_0x4b98ec(0x193)](fs[_0x4b98ec(0x13b)+'nc'](groupFilePath)));}function readAntilink(){const _0x908a17=_0x92076f;return fs[_0x908a17(0x18a)](groupFilePath)?JSON[_0x908a17(0x193)](fs[_0x908a17(0x13b)+'nc'](groupFilePath)):null;}let groupAntilink=readAntilink(),group=groupAntilink&&groupAntilink[_0x92076f(0x149)](_0x4d9051=>_0x4d9051['id']===groupId);saveGroupData(),readGroupData(),readAntilink();let checkLimitUser=_0x14309a=>{const _0x4b88c3=_0x92076f,_0x577dfd={'pIRyV':_0x4b88c3(0x13f)+_0x4b88c3(0x142)};if(m[_0x4b88c3(0x181)])return;if(isOwner)return;let _0x1b9d06=_0x14309a[_0x4b88c3(0x1b0)]('@')[0x329+-0x10c*0x25+-0x515*-0x7]+_0x4b88c3(0x147),_0xae89f0=path[_0x4b88c3(0x13c)](_0x577dfd[_0x4b88c3(0x14a)],_0x1b9d06);try{let _0x157563=JSON[_0x4b88c3(0x193)](fs[_0x4b88c3(0x13b)+'nc'](_0xae89f0)),_0xc0130f=_0x157563[_0x4b88c3(0x149)](_0x50c4ca=>_0x50c4ca['id']===_0x14309a);return _0xc0130f?_0xc0130f[_0x4b88c3(0x179)]:![];}catch(_0x18de1e){return![];}},ceklimit=checkLimitUser(sender)<=0xbdf+-0x47*-0x4a+-0x2065,addLimit=addLimitUser,addBanned=addBannedUser,addPremium=addPremiumUser;async function confirmlimit(_0x5da105,_0x599ce4){const _0x58cc90=_0x92076f,_0x184bd6={'yIzBB':function(_0x24bff6,_0xdb3637){return _0x24bff6===_0xdb3637;},'iNwDc':_0x58cc90(0x13f)+_0x58cc90(0x142),'DFesM':function(_0x2d36ba,_0x34147e){return _0x2d36ba!==_0x34147e;}};if(m[_0x58cc90(0x181)])return;if(isOwner)return;let _0x3ef588=_0x5da105[_0x58cc90(0x1b0)]('@')[0x143+0x1*0x581+0x1b1*-0x4]+_0x58cc90(0x147),_0x3044c1=await path[_0x58cc90(0x13c)](_0x184bd6[_0x58cc90(0x160)],_0x3ef588),_0x261510=JSON[_0x58cc90(0x193)](fs[_0x58cc90(0x13b)+'nc'](_0x3044c1)),_0x304957=-(-0x49*0xa+0x5c9+-0x2ee);_0x261510[_0x58cc90(0x143)]((_0x2cf03f,_0x38ad8b)=>{const _0x4650d3=_0x58cc90;_0x184bd6[_0x4650d3(0x148)](_0x2cf03f['id'],_0x5da105)&&(_0x304957=_0x38ad8b);}),_0x184bd6[_0x58cc90(0x19c)](_0x304957,-(0x14d3+-0x536+0x36*-0x4a))&&(_0x261510[_0x304957][_0x58cc90(0x179)]-=_0x599ce4,fs[_0x58cc90(0x1a3)+_0x58cc90(0x170)](_0x3044c1,JSON[_0x58cc90(0x12e)](_0x261510,null,0x1*-0x9af+0x66d*-0x2+0x168d*0x1)));};let Limit=await confirmlimit,claim=await confirmclaim,isBanned=checkBannedUser(sender),isRegister=checkRegisteredUser(sender),checkUangUser=_0xe91daf=>{const _0x33a7e7=_0x92076f,_0xae8523={'VRFWd':_0x33a7e7(0x13f)+_0x33a7e7(0x142)};let _0x46ebcc=_0xe91daf[_0x33a7e7(0x1b0)]('@')[-0x317*0x5+0x1*-0x25bf+-0xb*-0x4d6]+_0x33a7e7(0x147),_0x353542=path[_0x33a7e7(0x13c)](_0xae8523[_0x33a7e7(0x145)],_0x46ebcc);try{let _0x3ccff0=JSON[_0x33a7e7(0x193)](fs[_0x33a7e7(0x13b)+'nc'](_0x353542)),_0x41bfea=_0x3ccff0[_0x33a7e7(0x149)](_0x199ed8=>_0x199ed8['id']===_0xe91daf);return _0x41bfea?_0x41bfea[_0x33a7e7(0x199)]:![];}catch(_0x44e50b){return![];}},cekuang=checkUangUser(sender)<=0xf2*0x1a+0x1482+-0x2d0c,checkKuponUser=_0x5a0b3f=>{const _0x1c76a1=_0x92076f,_0x10060d={'dDovl':_0x1c76a1(0x13f)+_0x1c76a1(0x142)};let _0x1cc043=_0x5a0b3f[_0x1c76a1(0x1b0)]('@')[-0x76*0x1e+-0x5f6*0x1+0x13ca]+_0x1c76a1(0x147),_0xbcc3ff=path[_0x1c76a1(0x13c)](_0x10060d[_0x1c76a1(0x14e)],_0x1cc043);try{let _0x54b97b=JSON[_0x1c76a1(0x193)](fs[_0x1c76a1(0x13b)+'nc'](_0xbcc3ff)),_0xa9e715=_0x54b97b[_0x1c76a1(0x149)](_0x45e7c3=>_0x45e7c3['id']===_0x5a0b3f);return _0xa9e715?_0xa9e715[_0x1c76a1(0x129)]:![];}catch(_0x1bf948){return![];}},cekkupon=checkKuponUser(sender)<=-0x161*0x3+-0x5*0x6e8+0x26ab,pluginsFolderPath=await path[_0x92076f(0x13c)](__dirname,_0x92076f(0x187));await readFilesEvent(pluginsFolderPath)[_0x92076f(0x1a6)](console[_0x92076f(0x1a9)]),await readFilesOn(pluginsFolderPath)[_0x92076f(0x1a6)](console[_0x92076f(0x1a9)]);async function readFilesEvent(_0x237bf3){const _0x3ad141=_0x92076f,_0x34b6a0={'JZcZa':function(_0x4f2ba7,_0x310564){return _0x4f2ba7(_0x310564);},'CEehY':_0x3ad141(0x175),'zHzIM':function(_0x25c588,_0x15ef77){return _0x25c588===_0x15ef77;},'dokTb':_0x3ad141(0x1ab),'wWRAK':function(_0x48a392,_0x37035a){return _0x48a392===_0x37035a;},'aVXuf':_0x3ad141(0x125),'pahoX':function(_0x11de35,_0x176033){return _0x11de35(_0x176033);},'sIFSc':function(_0x20975c,_0x95ffe,_0x4e7233){return _0x20975c(_0x95ffe,_0x4e7233);}};try{let _0x594d53=await fs[_0x3ad141(0x177)+'c'](_0x237bf3);for(let _0x4e7b87 of _0x594d53){let _0x1516f5=await path[_0x3ad141(0x13c)](_0x237bf3,_0x4e7b87),_0x2661bc=await fs[_0x3ad141(0x13e)](_0x1516f5);if(_0x2661bc[_0x3ad141(0x18c)+'y']())await _0x34b6a0[_0x3ad141(0x136)](readFilesEvent,_0x1516f5);else{if(_0x2661bc[_0x3ad141(0x138)]()&&_0x4e7b87[_0x3ad141(0x12c)](_0x34b6a0[_0x3ad141(0x192)]))try{let _0x30aabf=await import(_0x1516f5);if(_0x34b6a0[_0x3ad141(0x16c)](typeof _0x30aabf[_0x3ad141(0x16a)],_0x34b6a0[_0x3ad141(0x18b)])||_0x34b6a0[_0x3ad141(0x191)](typeof _0x30aabf[_0x3ad141(0x16a)],_0x34b6a0[_0x3ad141(0x1ad)])){let _0x4fd859=_0x34b6a0[_0x3ad141(0x171)](checkBannedUser,sender);if(_0x4fd859&&!m[_0x3ad141(0x181)])return;let _0x28dff3=_0x30aabf[_0x3ad141(0x16a)]['on'];await _0x34b6a0[_0x3ad141(0x151)](_0x28dff3,m,{'conn':conn,'group':group,'budy':budy,'command':command,'isAdmins':isAdmins,'isOwner':isOwner,'addBanned':addBanned,'mess':mess,'setting':setting,'sleep':sleep,'quoted':quoted,'mime':mime,'participants':participants,'checkLimitUser':checkLimitUser,'Limit':Limit,'addBanned':addBanned,'dbPlus':dbPlus,'dbMinus':dbMinus,'autodl':autodl});}}catch(_0x296d90){console[_0x3ad141(0x1a9)](_0x296d90);}}}}catch(_0x80281a){console[_0x3ad141(0x1a9)](_0x80281a);}}async function readFilesOn(_0x4b8ddf){const _0x4a7045=_0x92076f,_0x572d4e={'SKOVt':function(_0xeafdc2,_0x512768){return _0xeafdc2(_0x512768);},'ItJGV':_0x4a7045(0x175),'uAeWy':function(_0x3c3797,_0x5cd787){return _0x3c3797===_0x5cd787;},'iUCEG':_0x4a7045(0x125),'XuUCr':_0x4a7045(0x19a),'hrJsJ':function(_0x1a916e,_0x18a3dd,_0x3f0b1a){return _0x1a916e(_0x18a3dd,_0x3f0b1a);},'kKooS':function(_0x32df2c,_0x37f2f7){return _0x32df2c(_0x37f2f7);},'nqJJv':_0x4a7045(0x1a0)};try{let _0x29617f=await fs[_0x4a7045(0x177)+'c'](_0x4b8ddf);for(let _0x50b1be of _0x29617f){let _0x2f8f2e=await path[_0x4a7045(0x13c)](_0x4b8ddf,_0x50b1be),_0x52bcac=await fs[_0x4a7045(0x13e)](_0x2f8f2e);if(_0x52bcac[_0x4a7045(0x18c)+'y']())await _0x572d4e[_0x4a7045(0x172)](readFilesOn,_0x2f8f2e);else{if(_0x52bcac[_0x4a7045(0x138)]()&&_0x50b1be[_0x4a7045(0x12c)](_0x572d4e[_0x4a7045(0x161)]))try{let _0x2ce239=await import(_0x2f8f2e);if(_0x572d4e[_0x4a7045(0x18e)](typeof _0x2ce239['on'],_0x572d4e[_0x4a7045(0x132)])){let _0x2c27c4=_0x2ce239['on'];if(_0x2c27c4[_0x4a7045(0x1b4)]&&_0x2c27c4[_0x4a7045(0x1b4)][_0x4a7045(0x19b)](command)){if(!m[_0x4a7045(0x181)]&&!isOwner&&_0x572d4e[_0x4a7045(0x18e)](typeof _0x2c27c4[_0x4a7045(0x179)],_0x572d4e[_0x4a7045(0x12b)])){let _0x11833c=_0x2c27c4[_0x4a7045(0x179)];if(ceklimit)return m[_0x4a7045(0x17e)](mess[_0x4a7045(0x179)]);await _0x572d4e[_0x4a7045(0x1b6)](confirmlimit,sender,_0x11833c);}let _0x3823c4=_0x572d4e[_0x4a7045(0x131)](checkBannedUser,sender);if(_0x3823c4&&!m[_0x4a7045(0x181)])return m[_0x4a7045(0x17e)](mess[_0x4a7045(0x178)]);if(!_0x2c27c4[_0x4a7045(0x1a7)]||isPremium){const _0x34ce51=_0x572d4e[_0x4a7045(0x163)][_0x4a7045(0x1b0)]('|');let _0x48dd35=-0x4*0x633+0x17*0x174+-0x8*0x114;while(!![]){switch(_0x34ce51[_0x48dd35++]){case'0':if(_0x2c27c4[_0x4a7045(0x1b5)]&&!isOwner)return m[_0x4a7045(0x17e)](mess[_0x4a7045(0x1a8)]);continue;case'1':if(m[_0x4a7045(0x13d)]&&_0x2c27c4[_0x4a7045(0x164)]&&!groupAdmins[_0x4a7045(0x19b)](m[_0x4a7045(0x14f)]))return m[_0x4a7045(0x17e)](mess[_0x4a7045(0x15f)]);continue;case'2':if(_0x2c27c4[_0x4a7045(0x1ae)]&&_0x2c27c4[_0x4a7045(0x1ae)][_0x4a7045(0x155)](_0x161dcc=>_0x2c27c4[_0x4a7045(0x1ae)][_0x4a7045(0x19b)](_0x161dcc))||_0x2c27c4[_0x4a7045(0x17d)]&&_0x2c27c4[_0x4a7045(0x17d)][_0x4a7045(0x155)](_0x18d846=>_0x2c27c4[_0x4a7045(0x17d)][_0x4a7045(0x19b)](_0x18d846))){if(!_0x2c27c4[_0x4a7045(0x186)]||_0x572d4e[_0x4a7045(0x172)](checkRegisteredUser,sender))await _0x2c27c4['on'](m,{'conn':conn,'mess':mess,'setting':setting,'prefix':prefix,'command':command,'text':text,'mime':mime,'args':args,'getRandom':getRandom,'quoted':quoted,'claim':claim,'store':store,'Hour':Hour,'getProfileData':getProfileData,'checkLimitUser':checkLimitUser,'checkPremiumUser':checkPremiumUser,'checkRegisteredUser':checkRegisteredUser,'Uang':Uang,'claim':claim,'dbPlus':dbPlus,'dbMinus':dbMinus,'cekuang':cekuang,'addLimit':addLimit,'makeid':makeid,'sleep':sleep,'isRegister':isRegister,'registering':registering,'Kupon':Kupon,'cekkupon':cekkupon,'bytesToSize':bytesToSize,'isSticker':isSticker,'isQuotedSticker':isQuotedSticker,'isQuotedAudio':isQuotedAudio,'resetLimits':resetLimits,'addBanned':addBanned,'addPremium':addPremium,'groupName':groupName,'switchGroup':switchGroup,'participants':participants,'groupAdmins':groupAdmins,'mentionUser':mentionUser,'mentionByReply':mentionByReply,'cmd':cmd});else return m[_0x4a7045(0x17e)](mess[_0x4a7045(0x124)]);}continue;case'3':if(_0x2c27c4[_0x4a7045(0x197)]&&m[_0x4a7045(0x13d)])return m[_0x4a7045(0x17e)](mess[_0x4a7045(0x1a1)]);continue;case'4':if(_0x2c27c4[_0x4a7045(0x189)]&&!m[_0x4a7045(0x13d)])return m[_0x4a7045(0x17e)](mess[_0x4a7045(0x194)]);continue;}break;}}else m[_0x4a7045(0x17e)](mess[_0x4a7045(0x1a7)]);}}}catch(_0x87f52c){m[_0x4a7045(0x17e)](_0x4a7045(0x158)+_0x4a7045(0x184)+_0x50b1be+'\x0a'+_0x87f52c[_0x4a7045(0x153)]),console[_0x4a7045(0x1a9)](_0x87f52c);}}}}catch(_0x30f5d3){console[_0x4a7045(0x139)](_0x4a7045(0x16d)+_0x4a7045(0x128)+_0x4a7045(0x159)+_0x4b8ddf),console[_0x4a7045(0x1a9)](_0x30f5d3);}}const gambar=m[_0x92076f(0x15d)]===_0x92076f(0x162)+'ge',stiker=m[_0x92076f(0x15d)]===_0x92076f(0x195)+_0x92076f(0x180),audio=m[_0x92076f(0x15d)]===_0x92076f(0x12a)+'ge',video=m[_0x92076f(0x15d)]===_0x92076f(0x167)+'ge',doc=m[_0x92076f(0x15d)]===_0x92076f(0x14c)+_0x92076f(0x144);(gambar||audio||stiker||video||doc)&&console[_0x92076f(0x139)](chalk[_0x92076f(0x1b3)][_0x92076f(0x17f)](''+(gambar?_0x92076f(0x127)+_0x92076f(0x133):'')+(audio&&gambar?',\x20':'')+(audio?_0x92076f(0x1b1)+_0x92076f(0x141):'')+((gambar||audio)&&stiker?',\x20':'')+(stiker?_0x92076f(0x18f)+_0x92076f(0x182):'')+((gambar||audio||stiker)&&video?',\x20':'')+(video?_0x92076f(0x188)+_0x92076f(0x140):'')+((gambar||audio||stiker||video)&&doc?',\x20':'')+(doc?_0x92076f(0x19e)+_0x92076f(0x174):'')));let talking=body;console[_0x92076f(0x139)](chalk[_0x92076f(0x168)][_0x92076f(0x154)](''+pushname)),console[_0x92076f(0x139)](chalk[_0x92076f(0x1b3)][_0x92076f(0x17f)](talking));m[_0x92076f(0x13d)]&&isCmd&&!m[_0x92076f(0x181)]&&console[_0x92076f(0x139)](colors[_0x92076f(0x12d)][_0x92076f(0x17f)](_0x92076f(0x1a5))+'\x20'+colors[_0x92076f(0x15a)](time)+'\x20'+colors[_0x92076f(0x168)][_0x92076f(0x154)](command)+'\x20'+colors[_0x92076f(0x12d)](_0x92076f(0x156))+'\x20'+colors[_0x92076f(0x15b)](groupName));!m[_0x92076f(0x13d)]&&isCmd&&!m[_0x92076f(0x181)]&&console[_0x92076f(0x139)](colors[_0x92076f(0x12d)][_0x92076f(0x17f)](_0x92076f(0x19d))+'\x20'+colors[_0x92076f(0x15a)](time)+'\x20'+colors[_0x92076f(0x168)][_0x92076f(0x154)](command)+'\x20'+colors[_0x92076f(0x12d)](_0x92076f(0x156))+'\x20'+colors[_0x92076f(0x15b)](pushname));
        try {
            if (budy.startsWith('=>')) {
                if (!isOwner) return m.reply(mess.OnlyOwner);

                function Return(sul) {
                    sat = JSON.stringify(sul, null, 4);
                    bang = util.format(sat);

                    if (sat === undefined) {
                        bang = util.format(sul);
                    }

                    return m.reply(bang);
                }

                try {
                    m.reply(util.format(await eval(`(async () => { return ${budy.slice(3)} })()`)));
                } catch (e) {
                    m.reply(String(e));
                }
            }
            if (budy.startsWith('>')) {
                if (!isOwner) return m.reply(mess.OnlyOwner);

                try {
                    let evaled = await eval(budy.slice(2));
                    if (typeof evaled !== 'string') evaled = require('util').inspect(evaled);

                    m.reply(evaled);
                } catch (err) {
                    m.reply(String(err));
                }
            }

            if (budy.startsWith('$')) {
                if (!isOwner) return m.reply(mess.OnlyOwner);

                try {
                    exec(budy.slice(2), (err, stdout) => {
                        if (err) return m.reply('Perintah Tidak Valid\n\n' + JSON.stringify(err, null, 4));
                        if (stdout) return m.reply(stdout);
                    });
                } catch (error) {
                    m.reply(`${error}`);
                }
            }
        } catch (error) {
            return m.reply(`${error}`);
        }        
        
    } catch (err) {
        console.log(color('ERROR', 'red'), err)
        m.reply(`${err}`)
    }
}