const express = require('express');
const app = express();

app.set('view engine' , 'ejs');

app.get('/', (req, res) => {
    res.render("index");
})

app.get('/profile', (req, res) => {
    res.send("hello this is profile")
})

app.listen(4000,()=>{
    console.log("server is running on port 4000")
})