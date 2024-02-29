express = require('express')
const app = express()
const bodyParser = require('body-parser')

const urlencodedParser = bodyParser.urlencoded({ extended: false })

app.use(express.static(__dirname + "/public"));
app.set('view engine', 'ejs')


app.get('', (req, res) => {
    res.render('home.ejs')
})
app.get('/home', (req, res) => {
    res.render('home.ejs')
})
app.get('/login', (req, res) => {
    res.render('login.ejs')
})
app.get('/signup', (req, res) => {
    res.render('signup.ejs')
})
app.get('/latestjob', (req, res) => {

    res.render('latestjob.ejs')
})
app.get('/forgetpassword', (req, res) => {

    res.render('forgetpassword.ejs')
})
app.get('/applicationform', (req, res) => {

    res.render('applicationform.ejs')
})

const { MongoClient } = require("mongodb");
const client = new MongoClient('mongodb://0.0.0.0')
    // sign up page data save in mongodb 
app.post('/save', urlencodedParser, async(req, res) => {
    let conObj = await client.connect();
    let dbObj = conObj.db('userdata');
    let colObj = dbObj.collection('signupdata');
    colObj.insertOne(req.body)
        .then((resObj) => {
            setTimeout(() => {
                res.render('login.ejs')
            }, 3000);


            res.send(resObj)

        })

})


app.post('/login', urlencodedParser, async(req, res) => {
    let conObj = await client.connect();
    let dbObj = conObj.db('userdata');
    let colObj = dbObj.collection('signupdata');
    let data = await colObj.find({ email: req.body.email, password: req.body.password }).toArray();
    if (data.length > 0) {
        res.redirect('/applicationform')
    } else {
        res.send("<script>alert('invalid user');location='/login';</script>")
    }
})

app.post('/formsubmit', urlencodedParser, async(req, res) => {
    let conObj = await client.connect();
    let dbObj = conObj.db('userdata');
    let colObj = dbObj.collection('applicationform');
    colObj.insertOne(req.body)
        .then((resObj) => {
            setTimeout(() => {
                res.render('login.ejs')
            }, 3000);


            res.send(resObj)

        })

})










app.listen(2025, () => {
    console.log("server running at 2025")
})