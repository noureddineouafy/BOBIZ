console.log('♥ starting. . . .')
import './lib/LocationData.js'
import path, { dirname } from 'path'
import { spawn } from 'child_process'
import fs from 'fs'
import { fileURLToPath } from 'url'
process.on('uncaughtException', console.error)
const __dirname = dirname(fileURLToPath(import.meta.url))
function start() {
    let args = [path.join(__dirname, 'main.js'), ...process.argv.slice(2)]
    let p = spawn(process.argv[0], args, {
            stdio: ['inherit', 'inherit', 'inherit', 'ipc']
        })
        .on('uncaughtException', console.log)
        .on('message', data => {
            if (data == 'reset') {
                console.log('Restarting...')
                p.kill()
            }
            if (data == 'uptime') {
                console.log('Uptime...')
                p.send(process.uptime())
            }
        })
        .on('exit', code => {
            console.error('Exited with code:', code)
            start()
        })
}
start()