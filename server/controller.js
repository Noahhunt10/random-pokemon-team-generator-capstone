const itemDB = require('./itemDB.json')
let myTeam = []
let newID = 1
module.exports = {

   getTeam: (req,res) => {
    res.status(200).send(myTeam)
   },

   addPoke: (req,res) => {
      let { name, img, item, ability, moves } = req.body
      let newPokemon = {
         name,
         img,
         ability,
         item,
         moves,
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
   }




}