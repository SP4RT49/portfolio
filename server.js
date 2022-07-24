const express = require('express')
const app = express()

const PORT = 3000;


app.get('/', (req, res) => {
    res.send('Api is running')
})



app.listen(process.env.PORT || PORT, () => console.log("Serveur lancé : http://localhost:"+ PORT +"/"))