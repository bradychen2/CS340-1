//SETUP
const express = require('express')
const app = express()
const db = require('./database/db_connector') //Database
const PORT = 4241

const query = (query) => {
    return new Promise((resolve, reject) => {
        db.pool.query(query, (err, results, field) => {
            resolve(results)
        })
    })
}

//ROUTES
app.get('/', async (req, res) => {
    //Define queries
    query1 = 'DROP TABLE IF EXISTS diagnostic;';
    query2 = 'CREATE TABLE diagnostic(id INT PRIMARY KEY AUTO_INCREMENT, text VARCHAR(255) NOT NULL);';
    query3 = 'INSERT INTO diagnostic (text) VALUES ("MySQL is working!");';
    query4 = 'SELECT * FROM diagnostic;';

    //Execute queries
    try {
        //DROP
        await query(query1)
        console.log('drop')
        
        //CREATE
        await query(query2)
        console.log('create')
        
        //INSERT
        await query(query3)
        console.log('insert')
        
        let base = "<h1>MySQL Results:</h1>"

        //SELECT and send the results to the browser
        const results = await query(query4)
        res.send(base + JSON.stringify(results))
        
    } catch(err) {
        console.log(err)
    }

})

app.get('/', (err, req, res) => {
    res.send('500 Server Error')
    console.log(err)
})

app.listen(PORT, () => {
    console.log('Express started on http://localhost:4241')
})


