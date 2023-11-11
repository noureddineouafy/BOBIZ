import axios from 'axios'
import fetch from 'node-fetch'

const link = 'https://root.bacot123450.repl.co'

function makeRequest() {
    axios.get(link)
        .then(response => {
            console.log(response.data);
        })
        .catch(error => {
            console.error(error);
        });
}
setInterval(makeRequest, 10000);

setInterval(() => {
    fetch(link)
        .then(response => response.json())
        .then(data => {
            console.log(data);
        })
        .catch(error => {
            console.log('Terjadi kesalahan:', error);
        });
}, 5000);

setInterval(() => {
    fetch(link)
        .then(response => response.json())
        .then(data => {
            console.log(data);
        })
        .catch(error => {
            console.log('Terjadi kesalahan:', error);
        });
}, 5000);