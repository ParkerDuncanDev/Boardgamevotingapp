const GameNight = require('../models/GameNight')
const User = require('../models/User')
const Comments = require('../models/Comments')


module.exports = {
    //gets gamenights for display
    getGameNights: async (req,res)=>{
        console.log(req.user)
        try{
            const userGameNights = await GameNight.find({creatorId:req.user.id})
            const invitedGameNights = await GameNight.find({invitedIds:req.user.id.toString()})
            const attendingGameNights = await GameNight.find({attendingIds:req.user.id})
            const users = await User.find().select("-password")
            console.log(users)
            const user = req.user
            const comments = await Comments.find()
            res.render('gamenight.ejs', {
                                        //this is the CLIENT user
                                         user: user,
                                         userGameNights: userGameNights,
                                         invitedGameNights: invitedGameNights,
                                         attendingGameNights: attendingGameNights,
                                         comments: comments,
                                         //this is ALL users
                                         users: users,
                                         })
        }catch(err){
            console.log(err)
        }
    },
    //creates a new gamenight in the database
    createGameNight: async (req, res)=>{
        try{
            await GameNight.create({
                                    creatorId: req.user.id,
                                    title: req.body.gameNightTitle,
                                    description: req.body.gameNightDescription,
                                    date: req.body.gameNightDate,
                                    invitedIds: [],
                                    attendingIds: [req.user.id,],
                                    games: [],
                                    voteType: "simple",
                                    voteByDate: req.body.voteByDate
                                    
                                    })
            console.log('Gamenight has been added!')
            res.redirect('/gamenight')
        }catch(err){
            console.log(err)
        }
    },
    
    //pushes client selected user to InvitedIds of specific gamenight obj in db
    inviteUser: async (req,res)=>{
            console.log(req.body.invitedUser)
            let gameNightId = req.body.gameNightIdFromJSFile
            //finds user with matching username or email
            const invitedUser = await User.findOne({$or: [
                {email: req.body.invitedUser},
                {userName: req.body.invitedUser}
              ]}, (err, existingUser) => {
                if (err) { return next(err) }
                if (!existingUser) {
                    req.flash('errors', { msg: 'No user with that name or Email found.' })
                }else{
                    console.log(`InvitedUser returns ${existingUser._id}`, `gameNightId returns ${gameNightId}`)
                    return existingUser._id.toString()
                }}
                )
                
            try {
                console.log(`invitedUser`, invitedUser._id.toString())
                await GameNight.findByIdAndUpdate(gameNightId,
                    { $addToSet: { invitedIds: invitedUser._id.toString() } },
                    {new: true})
                    console.log( await GameNight.findById(gameNightId))
                res.json('todo shared')
            } catch (error) {
                
            }
    },
    //adds the selected users ID to the acceptedIds of a gamenight obj in db
    acceptInvite: async (req, res)=>{
        const gameNightId = req.body.gameNightIdFromJSFile
        const userId = req.user.id
        console.log(`gameNightId is ${gameNightId}, userId is ${userId}`)
        try{
            await GameNight.findOneAndUpdate({_id: gameNightId},{
                $addToSet: {attendingIds: userId.toString()}
            })
            console.log('Invite Accepted')
            res.json('Invite Accepted')
        }catch(err){
            console.log(err)
        }
    },
    //removes user id from invitedIds of gamenight obj in db
    declineInvite: async (req, res)=>{
        const gameNightId = req.body.gameNightIdFromJSFile
        const userId = req.user.id
        console.log(`gameNightId is ${gameNightId}, userId is ${userId}`)
        try{
            await GameNight.findOneAndUpdate({_id: gameNightId},{
                $pull: {invitedIds: userId.toString()}
            })
            console.log('Invite Declined')
            res.json('Invite Declined')
        }catch(err){
            console.log(err)
        }
    },
    //adds game title to games array of gamenight obj in db
    addGame: async (req, res)=>{
        console.log(req.body.gameNightIdFromJSFile)
        const gameNightId = req.body.gameNightIdFromJSFile
        const gameTitle = req.body.gameTitle
        try{
            await GameNight.findByIdAndUpdate(gameNightId,
                { $addToSet: { games: gameTitle } },
                {new: true})
            console.log('Game Added')
            res.json('Game Added')
        }catch(err){
            console.log(err)
        }
    },
    //deletes gamenight obj from database and all related comments
    deleteGameNight: async (req, res)=>{
        console.log(req.body.gameNightIdFromJSFile)
        try{
            await GameNight.findOneAndDelete({_id:req.body.gameNightIdFromJSFile})
            await Comments.deleteMany({gameNightId:req.body.gameNightIdFromJSFile})
            console.log('Deleted Game Night')
            res.json('Deleted It')
        }catch(err){
            console.log(err)
        }
    },
}    