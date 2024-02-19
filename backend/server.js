const express = require("express");
const cors = require("cors");
const mysql = require("mysql");



const app = express();

app.use(express.json())
app.use(cors());


const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "crud"
})


app.get("/", (req, res) => {
    // console.log("Hello form Backend");
    const sql = "SELECT * FROM student"
    db.query(sql, (err, data) => {
        if(err) return res.json("error");
        return res.json(data);
    })
})

app.get('/student/:id', (req, res) => {
    const studentId = req.params.id;
    const sql = 'SELECT * FROM student WHERE id = (?)';
    db.query(sql, [studentId], (err, data) => {
        if(err) return res.json("error");
        return res.json(data[0]);
    })
})

app.post('/create', (req, res) => {
    const sql = "INSERT INTO student (`name`, `email`) VALUES (?)";
    const values = [
        req.body.name,
        req.body.email
    ]
    db.query(sql, [values], (err, data) => {
        if (err) return res.json("Error");
        return res.json(data);
    })
})

app.put('/update/:id', (req, res) => {
    const sql = "update student set `name` = ?, `email` = ? where id = ?";
    const values = [
        req.body.name,
        req.body.email
    ]
    const id = req.params.id;

    db.query(sql, [...values, id], (err, data) => {
        if (err) return res.json("Error");
        return res.json(data);
    })
})

app.delete('/student/:id', (req, res) => {
    const sql = "DELETE FROM student WHERE id = ?";
    const id = req.params.id;

    db.query(sql, [id], (err, data) => {
        if (err) return res.json("Error");
        return res.json(data);
    })
})


app.listen(8081, () => {
    console.log('listening');
})