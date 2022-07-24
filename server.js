const express = require('express')
const app = express()
const port = 3000;

const requestTime = function (req, res, next) {
    const date = new Date()
    req.requestTime = date.toLocaleDateString("fr")
    next()
  }

  // MIDDLEWARE
app.use(express.static('public'));
app.use(requestTime)


// -------- Routes
// Page Home
app.get('/', (req, res) => {
    let responseTest = 'Petite message <br>'
    responseTest += `Dernière visite le ${req.requestTime}`
    res.send(responseTest)
})
// Page login
    .get('/login', (req, res) => {
    res.render('login/login.ejs')
})



app.listen(port, () => console.log("Serveur lancé : http://localhost:"+ port +"/"))