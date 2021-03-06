require('dotenv').config()
const fs = require('fs')
const path = require('path')
const axios = require('axios')
const endpoint = process.env.API_ENDPOINT
const tmp_dir = 'tmp'
const element_name = 'my_element'
const element_path = path.resolve(__dirname, tmp_dir, `${element_name}.json`)

if (!fs.existsSync(tmp_dir)) {
  fs.mkdirSync(tmp_dir);
}

const fetchApiToken = _ => axios.post(`${endpoint}/auth/local`, {
  identifier: process.env.API_USER,
  password: process.env.API_PWD
}, {
  headers: {'Content-Type': 'application/json',},
}).then(({data: {jwt}}) => jwt).catch(e => console.log('auth error', e))

const fetchPosts = jwt => axios.get(`${endpoint}/${element_name}s`, {
  headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${jwt}`},
}).then(({data}) => data).catch(e => console.log(`fetch ${element_name}s error`, e))

const saveFile = path => data => fs.writeFile(path, JSON.stringify(data), {flag: 'w'}, e => console.log('writing file error', e))

fetchApiToken().then(fetchPosts).then(saveFile(element_path))
