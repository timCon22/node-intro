const fs = require('fs')
const process = require('process')
const axios = require('axios')

function handleOut(text, out){
    if (out){
        fs.writeFile(out, text, 'utf8', function(err){
            if (err){
                console.error(`Could not write ${out}: ${err}`)
                process.exit(1)
            }
        })
    } else {
        console.log(text)
    }
}

function cat(path, out){
    fs.readFile(path, 'utf8', function(err, data) {
        if (err){
            console.error(`Error reading ${path}: ${err}`)
            process.exit(1)
        } else {
            handleOut(data, out)
        }
    })
}

async function webCat(url, out){
    try {
        let resp = await axios.get(url)
        handleOut(resp.data, out)
    } catch (err) {
        console.error(`Error fetching ${url}: ${err}`)
        process.exit(1)
    }
}

let path
let out

console.log(process.argv[0])
console.log(process.argv[1])
console.log(process.argv[2])
console.log(process.argv[3])
console.log(process.argv[4])

if (process.argv[2] === "--out"){
    out = process.argv[3]
    path = process.argv[4]
} else {
    path = process.argv[2]
}

if (path.slice(0, 4) === "http"){
    webCat(path, out)
} else {
    cat(path, out)
}
