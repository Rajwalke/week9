const express = require('express');

const app = express();
const { authMiddleware } = require("./middleware")
const notes = [
    // {
    //     username: "raj",
    //     note: "notes"
    // }
];
const userList = [];
const jwt = require('jsonwebtoken');

app.use(express.json());
app.get("/", (req, res) => {
    res.sendFile('/Users/ADMIN/Desktop/week9/todonew.html')
})
app.get("/signin", (req, res) => {
    res.sendFile('/Users/ADMIN/Desktop/week9/signin.html')
})
app.get("/signup", (req, res) => {
    res.sendFile('/Users/ADMIN/Desktop/week9/signup.html')
})

app.post("/signup", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    // check user already register or not?
    const checkuser = userList.find(user => user.username === username);
    if (checkuser) {
        res.status(403).json({
            "message": "user already exist"
        })
        return;
    }

    userList.push({
        username: username,
        password: password
    });
    res.json({
        "message": "User Signup successfully"
    })

});

app.post("/signin", (req, res) => {
    // signin give jwt token and signup give 200 status code 
    const username = req.body.username;
    const password = req.body.password;

    const checkuser = userList.find(user => user.username === username && user.password === password);
    if (!checkuser) {
        res.status(403).json({
            "message": "invalid credentials! Please sign up"
        })
    }
    let token = jwt.sign({
        username: username
    }, 'rajwalke@2004')

    res.json({
        token: token
    })
})
// authorized endpoint
app.post("/notes", authMiddleware, (req, res) => {
    const username = req.username
    const note = req.body.note;
    notes.push({
        username: username,
        note: note
    });
    res.json({
        "message": "Note is added"
    })
    console.log("Note added")
})

// authorized endpoint
app.get("/notes", authMiddleware, (req, res) => {
    const username = req.username;
    const allnotes = notes.filter(user => user.username === username);
    res.json({
        allnotes
    })
})

app.listen(4000);