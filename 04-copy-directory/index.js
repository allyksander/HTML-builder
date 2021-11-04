const fs = require('fs')
const path = require('path')

const PATH = path.join(__dirname, './files')

fs.readdir(PATH, (err, files) => {
    const PATH_COPY = path.join(__dirname, './files-copy')

    fs.rmdir(PATH_COPY, { recursive: true }, (err) => {
        
        fs.mkdir(PATH_COPY, { recursive: true }, (err) => {
            files.forEach(file => {
                const filePath = path.join(PATH, file)
                const filePathCopy = path.join(PATH_COPY, file)

                fs.copyFile(filePath, filePathCopy, err => { })
            })
        })
    })
})