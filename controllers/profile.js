const User = require('../models/User')
const GameNight = require('../models/GameNight')

module.exports = {
    getProfile: async (req,res)=>{
        const userId = req.params.id
        console.log(userId)
        try{
            const profile = await User.findById(userId).select('-password')
            res.render('profile.ejs', { profile: profile,
                                        user: req.user })
        }catch(err){
            console.log(err)
        }
    },
    getProfileForOwner: async (req,res)=>{
        const userId = req.user.id
        try{
            const profile = await User.findById(userId).select('-password')
            const invitedGameNights = await GameNight.find({invitedIds:req.user.id.toString()})
            const users = await User.find().select("-password")
            res.render('profileOwner.ejs', { profile: profile,
                                            // client user
                                             user: req.user,
                                            //  all users
                                             users: users,
                                             invites: invitedGameNights })
        }catch(err){
            console.log(err)
        }
    }
}    