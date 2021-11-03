const fs = require('fs')
const path = require('path')

const rr = fs.createReadStream(path.join(__dirname, './text.txt'))
rr.on('readable', () => {
    console.log(`${rr.read()}`)
})
