const GameNight = require('../models/Gamenight')
const User = require('../models/User')

module.exports = {
    getGameNights: async (req,res)=>{
        console.log(req.user)
        try{
            const userGameNights = await GameNight.find({creatorId:req.user.id})
            const invitedGameNights = await GameNight.find({InvitedId:req.user.id})
            const attendingGameNights = await GameNight.find({attendingIds:req.user.id})
            res.render('gamenight.ejs', {userGameNights: userGameNights, invitedGameNights: invitedGameNights, attendingGameNights: attendingGameNights, user: req.user})
        }catch(err){
            console.log(err)
        }
    },
    createGameNight: async (req, res)=>{
        try{
            await GameNight.create({
                                    creatorId: req.user.id,
                                    title: req.body.gameNightTitle,
                                    description: req.body.gameNightDescription,
                                    date: req.body.gameNightDate,
                                    invitedIds: [],
                                    attendingIds: [],
                                    games: [],
                                    voteType: "simple",
                                    voteByDate: req.body.voteByDate
                                    
                                    })
            console.log('Gamenight has been added!')
            res.redirect('/GameNight')
        }catch(err){
            console.log(err)
        }
    },
    acceptInvite: async (req, res)=>{
        try{
            await GameNight.findOneAndUpdate({_id:req.body.GameNightIdFromJSFile},{
                $push: {attendingIds: req.user.id}
            })
            console.log('Invite Accepted')
            res.json('Invite Accepted')
        }catch(err){
            console.log(err)
        }
    },
    declineInvite: async (req, res)=>{
        try{
            await GameNight.findOneAndUpdate({_id:req.body.GameNightIdFromJSFile},{
                $pull: {invitedIds: req.user.id}
            })
            console.log('Invite Declined')
            res.json('Invite Declined')
        }catch(err){
            console.log(err)
        }
    },
    deleteGameNight: async (req, res)=>{
        console.log(req.body.gameNightIdFromJSFile)
        try{
            await GameNight.findOneAndDelete({_id:req.body.gameNightIdFromJSFile})
            console.log('Deleted Game Night')
            res.json('Deleted It')
        }catch(err){
            console.log(err)
        }
    },
//pushes client selected user to InvitedIds of GameNight 
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
                console.log( await Todo.findById(userID))
            res.json('todo shared')
        } catch (error) {
            
        }
        }
}    