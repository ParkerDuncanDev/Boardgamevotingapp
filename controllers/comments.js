const Comment = require('../models/Comments')

module.exports = {
    // getShelfs: async (req,res)=>{
    //     console.log(req.user)
    //     try{
    //         const ShelfItems = await Shelf.find({userId:req.user.id})
    //         const itemsLeft = await Shelf.countDocuments({userId:req.user.id,completed: false})
    //         res.render('Shelfs.ejs', {Shelfs: ShelfItems, left: itemsLeft, user: req.user})
    //     }catch(err){
    //         console.log(err)
    //     }
    // },
    createComment: async (req, res)=>{
        console.log(req.body.user)
        try{
            await Comment.create({
                comment: req.body.comment, 
                userName: req.body.userName,
                userId: req.body.userId, 
                date: new Date(),
                gameNightId: req.body.gameNightIdFromJSFile,
            })
            console.log('Comment has been added!')
            res.json('comment added')
        }catch(err){
            console.log(err)
        }
    },
    // markComplete: async (req, res)=>{
    //     try{
    //         await Shelf.findOneAndUpdate({_id:req.body.ShelfIdFromJSFile},{
    //             completed: true
    //         })
    //         console.log('Marked Complete')
    //         res.json('Marked Complete')
    //     }catch(err){
    //         console.log(err)
    //     }
    // },
    // markIncomplete: async (req, res)=>{
    //     try{
    //         await Shelf.findOneAndUpdate({_id:req.body.ShelfIdFromJSFile},{
    //             completed: false
    //         })
    //         console.log('Marked Incomplete')
    //         res.json('Marked Incomplete')
    //     }catch(err){
    //         console.log(err)
    //     }
    // },
    // deleteShelf: async (req, res)=>{
    //     console.log(req.body.ShelfIdFromJSFile)
    //     try{
    //         await Shelf.findOneAndDelete({_id:req.body.ShelfIdFromJSFile})
    //         console.log('Deleted Shelf')
    //         res.json('Deleted It')
    //     }catch(err){
    //         console.log(err)
    //     }
    // }
}    