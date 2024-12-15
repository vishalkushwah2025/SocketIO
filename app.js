const { log } = require('console');
const express = require('express');
const app = express();

const connect = require('./db/db')
connect();

const userModel = require('./models/user.models')

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookie = require('cookie-parser');
const cookieParser = require('cookie-parser');

app.set('view engine' , 'ejs');
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

app.get('/', isLoggedIn, (req, res) => {
    res.render("index");
})

app.get('/register', (req, res) => {
    res.render('register')
})
app.post('/register',async(req, res) => {
    const {email, password}  = req.body

    const hashPassword = new bcrypt.hash(10, password)
    const user = new userModel({
        email,
        password: hashPassword
    })
    await user.save()

    const token = jwt.sign({email : user.email},"secret")

    res.cookie('token', token)
    res.redirect('/')
})

app.get('/login', (req, res) => {
    res.render('login');
})
app.post('/login',async (req, res) => {
    const {email , password} = req.body

    const user = new userModel.findOne({
        email
    })
    if(!user){
        return res.redirect('/login');
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if(!isMatch){
        return res.redirect('/login')
    }
    const token = jwt.sign({email: user.email},"secret")
    res.cookie('token', token)
    res.redirect('/')
})

function isLoggedIn(req , res, next){
    const token = req.cookie.token
    if(!token) return res.redirect('/login');
    jwt.verify(token, 'secret', (err, user)=>{
        if(err) return res.redirect('/login')
        req.user = user
        next()
    })
}

//server site setup to socket io
const server = require('http').createServer(app);
const io = require('socket.io')(server);
io.on('connection', client => {
    console.log('user connected');
});
server.listen(4000,()=>{
    console.log("server is running on port 4000")
});