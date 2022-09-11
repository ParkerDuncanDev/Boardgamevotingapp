const Shelf = require('../models/Shelf')

module.exports = {
    getShelfs: async (req,res)=>{
        console.log(req.user)
        try{
            const ShelfItems = await Shelf.find({userId:req.user.id})
            const itemsLeft = await Shelf.countDocuments({userId:req.user.id,completed: false})
            res.render('Shelfs.ejs', {Shelfs: ShelfItems, left: itemsLeft, user: req.user})
        }catch(err){
            console.log(err)
        }
    },
    createShelf: async (req, res)=>{
        try{
            await Shelf.create({Shelf: req.body.ShelfItem, completed: false, userId: req.user.id})
            console.log('Shelf has been added!')
            res.redirect('/Shelfs')
        }catch(err){
            console.log(err)
        }
    },
    markComplete: async (req, res)=>{
        try{
            await Shelf.findOneAndUpdate({_id:req.body.ShelfIdFromJSFile},{
                completed: true
            })
            console.log('Marked Complete')
            res.json('Marked Complete')
        }catch(err){
            console.log(err)
        }
    },
    markIncomplete: async (req, res)=>{
        try{
            await Shelf.findOneAndUpdate({_id:req.body.ShelfIdFromJSFile},{
                completed: false
            })
            console.log('Marked Incomplete')
            res.json('Marked Incomplete')
        }catch(err){
            console.log(err)
        }
    },
    deleteShelf: async (req, res)=>{
        console.log(req.body.ShelfIdFromJSFile)
        try{
            await Shelf.findOneAndDelete({_id:req.body.ShelfIdFromJSFile})
            console.log('Deleted Shelf')
            res.json('Deleted It')
        }catch(err){
            console.log(err)
        }
    }
}    