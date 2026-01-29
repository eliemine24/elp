
// === JSON HANDLING FUNCTIONS ===

// use fs module to handle js 
//readFile to read asynchronously : fs.readFile(path, options, callback)

/*
const books = require("./books.json")
console.log(books)
*/
const fs = require("fs")
//write scores
const scores =
{
    "valentin": 0,
    "lea" : 0,
    "elie" : 0
}
// turn scores into json data
const jscores = JSON.stringify(scores, null, 2);
// write json file

async function writejson(data, title="unnamed.json") {
    fs.writeFile(title, data, 'utf8', (err) => {
        if (err) {
            console.error('Error writing to file', err)
        } else {
            console.log(`Data written to file ${title}`)
        }
    })
}

writejson(jscores, "scores.json")


/*
no possibilities to directly update json file
but you can, read the file, modify data
and overwrite the existing file
*/
