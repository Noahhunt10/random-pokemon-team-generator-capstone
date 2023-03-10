const itemDB = require('./itemDB.json')
let myTeam = []
let newID = 1
let shinyOdds = 4069
let rolls = 0


module.exports = {

   getTeam: (req,res) => {
    res.status(200).send(myTeam)
   },

   addPoke: (req,res) => {
      let { name, img, item, ability, moves, types } = req.body
      let newPokemon = {
         name,
         img,
         ability,
         item,
         moves,
         types,
         id: newID
      }
      if(myTeam.length >= 6){
         res.status(400).send('Team is full. Delete Pokemon to add more!')
      }else{
         myTeam.push(newPokemon)
         res.status(200).send(myTeam)
         newID++
      }
   },
   deletePoke: (req,res) => {
      
      let { id } = req.params
      let index = myTeam.findIndex(pokemon => pokemon.id === +id)
        myTeam.splice(index,1)
        res.status(200).send(myTeam)
   },
   getItem: (req,res) => {
      let index = Math.floor(Math.random() * itemDB.items.length)
      let item = itemDB.items[index]
      res.status(200).send(item)
   }, 
   shinyNum: (req,res) => {
      let shinyNum = Math.floor(Math.random() * shinyOdds + 1)
      
      if(shinyNum === 1){
         shinyOdds = 4069
         
      }
      else{
         shinyOdds--
         rolls++

         
      }
      res.status(200).send({rolls: rolls, shinyNum: shinyNum, odds: shinyOdds})
      if(shinyNum === 1){
         rolls = 0
      }
   }
   




}