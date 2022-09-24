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
    },
    getFriends: async (req,res)=>{
        console.log('getting friends')
        const user = req.user
        try {
            const friends = await User.find({_id: {$in: user.friendIds}}).select('-password')
            res.render('friends.ejs', {friends:friends})          
        } catch (error) {
           console.log(error) 
        }
    },
    addFriend: async (req,res)=>{
        const user = req.body.userId.toString()
        const friend = req.body.friendId.toString()
        console.log(req.body)
        console.log(user, friend)
        try {
            console.log(`sending friend request`)
            await User.findByIdAndUpdate(friend, {
                $addToSet: {friendRequests: user}
            })
            console.log(`friend request sent`)
            res.json('friend request sent')
        } catch (error) {
            console.log(error)
        }

    },
    acceptFriend: async (req,res)=>{
        const user = req.body.userId.toString()
        const requester = req.body.requesterId.toString()
        console.log(req.body)
        console.log(user, requester)
        try {
            console.log(`accepting friend request`)
            await User.findByIdAndUpdate(user, {
                $addToSet: {friendIds: requester},
                $pull: {friendRequests: requester}
            })
            await User.findByIdAndUpdate(requester, {
                $addToSet: {friendIds: user}
            })
            console.log(`friend request accepting`)
            res.json('friend request accepting')
        } catch (error) {
            console.log(error)
        }

    },
    declineFriend: async (req,res)=>{
        const user = req.body.userId.toString()
        const requesterId = req.body.requesterId.toString()
        console.log(req.body)
        console.log(user, requesterId)
        try {
            console.log(`declining friend request`)
            await User.findByIdAndUpdate(user, {
                $pull: {friendRequests: requester}
            })
            console.log(`friend request declined`)
            res.json('friend request declined')
        } catch (error) {
            console.log(error)
        }

    },

}    