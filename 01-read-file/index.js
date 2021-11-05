const fs = require('fs')
const path = require('path')

const rr = fs.createReadStream(path.join(__dirname, './text.txt'))
rr.on('data', (chunk) => {
    console.log(`${chunk.toString()}`)
})
