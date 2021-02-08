/**
 * Arguments: json-file collection path-to-firebase-key
 */

const fs = require('fs')
const admin = require("firebase-admin")

const file = process.argv[process.argv.length - 3]
const coll = process.argv[process.argv.length - 2]
const key = process.argv[process.argv.length - 1]

const serviceAccount = require(key)


admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const firestore = admin.firestore()
const collection = firestore.collection(coll)

fs.readFile(file, 'utf8', function(err, data){ 
    const obj = JSON.parse(data)
    obj.forEach(el => {
        collection.add(el)
    })
})
