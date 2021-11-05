const fs = require('fs')
const path = require('path')

const PATH = path.join(__dirname, './styles')

fs.readdir(PATH, { withFileTypes: true }, (err, files) => {
    const PATH_BUNDLE = path.join(__dirname, './project-dist/bundle.css')

    fs.writeFile(PATH_BUNDLE, '', () => {
        files.forEach(file => {
            if (file.isFile()) {
                const extension = path.basename(file.name).split('.').pop()

                if (extension === 'css') {
                    const rr = fs.createReadStream(path.join(PATH, file.name))

                    rr.on('data', (chunk) => {
                        fs.appendFile(PATH_BUNDLE, `${chunk.toString()}`, error => { })
                    })
                }
            }
        })
    })
})