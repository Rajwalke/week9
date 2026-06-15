const express = require("express");

const app = express();
const jwt = require('jsonwebtoken')
app.use(express.json())
let notes = []//inmemeory database
let users = []
app.post("/signup", (req, res) => {
    const userName = req.body.userName;
    const password = req.body.password;

    const checkUserExit = users.find(user => user.userName === userName);
    if (checkUserExit) {
        res.status(403).json({
            message: "User Already Exist !"
        })
        return;
    };
    users.push({
        userName: userName,
        password: password
    });
    res.send("User login")



});

app.post("/signin", (req, res) => {
    const userName = req.body.userName;
    const password = req.body.password;

    const checkUserExit = users.find(user => user.userName === userName && user.password === password);
    if (!checkUserExit) {
        res.status(403).json({
            message: "Incorrect credentials"
        })
        return;
    }
    const token = jwt.sign({
        userName: userName
    }, 'raj123');

    res.json({
        token: token
    })

})

app.get("/", (req, res) => {
    res.sendFile('/Users/ADMIN/Desktop/week9/todo.html')
})
app.get('/notes', (req, res) => {
    console.log("NOTES", notes)
    res.send(notes)
})

app.post("/notes", (req, res) => {
    const note = req.body.note
    const token = req.header.token;

    const decrypt = jwt.verify(token, {})

    notes.push(note);
    res.send("DONE!")
})


app.listen(4000);