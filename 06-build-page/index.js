const fs = require('fs')
const path = require('path')

const DIST_PATH = path.join(__dirname, './project-dist')
const ASSETS_PATH = path.join(__dirname, './assets')
const STYLE_PATH = path.join(__dirname, './styles')
const COMPONENTS_PATH = path.join(__dirname, './components')
const INDEX_PATH = path.join(DIST_PATH, './index.html')

fs.rmdir(DIST_PATH, { recursive: true }, (err) => {

    fs.mkdir(DIST_PATH, { recursive: true }, (err) => {
        copyDir(ASSETS_PATH)
        mergeStyles(STYLE_PATH)
        createIndex()
    })
})

function copyDir(dirPath) {
    fs.readdir(dirPath, { withFileTypes: true }, (err, files) => {
        files.forEach(file => {
            const filePath = path.join(dirPath, file.name)
            const relativePath = filePath.slice(__dirname.length, filePath.length)
            const filePathCopy = path.join(DIST_PATH, relativePath)

            if (file.isFile()) {
                fs.copyFile(filePath, filePathCopy, err => { })
            } else {
                fs.mkdir(filePathCopy, { recursive: true }, (err) => {
                    copyDir(filePath)
                })
            }
        })
    })
}

function mergeStyles(stylePath) {
    fs.readdir(stylePath, { withFileTypes: true }, (err, files) => {
        const PATH_BUNDLE = path.join(DIST_PATH, 'style.css')

        fs.writeFile(PATH_BUNDLE, '', () => {
            files.forEach(file => {
                if (file.isFile()) {
                    const extension = path.basename(file.name).split('.').pop()

                    if (extension === 'css') {
                        const rr = fs.createReadStream(path.join(stylePath, file.name))

                        rr.on('data', (chunk) => {
                            fs.appendFile(PATH_BUNDLE, `${chunk.toString()}`, error => { })
                        })
                    }
                }
            })
        })
    })
}

function createIndex() {
    const rr = fs.createReadStream(path.join(__dirname, './template.html'))

    rr.on('data', (chunk) => {
        let indexTemplate = `${chunk.toString()}`

        fs.readdir(COMPONENTS_PATH, { withFileTypes: true }, (err, files) => {
            files.forEach(file => {
                if (file.isFile()) {
                    const extension = path.basename(file.name).split('.').pop()

                    if (extension === 'html') {
                        const fileRead = fs.createReadStream(path.join(COMPONENTS_PATH, file.name))

                        fileRead.on('data', (chunk) => {
                            const templateTag = `{{${path.basename(file.name).split('.').shift()}}}`
                            const component = `${chunk.toString()}`
                            const re = new RegExp(templateTag, 'g')

                            indexTemplate = indexTemplate.replace(re, component)
                            fs.writeFile(INDEX_PATH, indexTemplate, () => { })
                        })
                    }
                }
            })
        })
    })
}