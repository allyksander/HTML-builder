const fs = require('fs')
const path = require('path')

const PATH = path.join(__dirname, './secret-folder')

fs.readdir(PATH, { withFileTypes: true }, (err, files) => {
    files.forEach(file => {
        if (file.isFile()) {
            const filePath = path.join(PATH, file.name)

            fs.stat(filePath, (error, stats) => {
                const name = path.parse(filePath).name
                const extension = path.basename(file.name).split('.').pop()
                const size = `${Math.ceil(stats.size / 1024)}kb`
                console.log(`${name} - ${extension} - ${size}`)
            })
        }
    })
})