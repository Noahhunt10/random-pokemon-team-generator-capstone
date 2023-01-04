const express = require("express");
const cors = require("cors");
const path = require('path')
const app = express();

app.use(cors());
app.use(express.json());

app.use(express.static('public'))

app.get('/', (req, res) => {
    res.status(200).sendFile(path.join(__dirname, '../public/index.html'))
})

const { getTeam } = require('./controller')
const { addPoke } = require('./controller')
const { deletePoke } = require('./controller')
const { getItem } = require('./controller')
const { shinyNum } = require('./controller')
app.get('/teambuild.html/api/team', getTeam)
app.post('/teambuild.html/api/team', addPoke)
app.delete('/teambuild.html/api/team/:id', deletePoke)
app.get('/teambuild.html/api/item', getItem)
app.get('/teambuild.html/api/shiny', shinyNum)






app.listen(4000, () => console.log("Server running on 4000"));