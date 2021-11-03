const fs = require('fs')
const path = require('path')
const readline = require('readline')

const PATH = path.join(__dirname, './text.txt')
const { stdin: input, stdout: output } = require('process')
const rl = readline.createInterface({ input, output })

fs.writeFile(PATH, '', () => {
    console.log('Enter your text:')
    rl.on('line', (input) => {
        if (input === 'exit') {
            console.log('Thank you and goodbye')
            process.exit()
        }
        fs.appendFile(PATH, `${input}\n`, error => { })
    })
    rl.on('close', (input) => {
        console.log('Thank you and goodbye')
    })
})