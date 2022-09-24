
const deleteBtn = document.querySelectorAll('.del')
const todoItem = document.querySelectorAll('span.not')
const todoComplete = document.querySelectorAll('span.completed')
const inviteBtn = document.querySelectorAll('.inviteBtn')
const acceptBtn = document.querySelectorAll('.acceptBtn')
const declineBtn = document.querySelectorAll('.declineBtn')
const postCommentBtn = document.querySelectorAll('.postCommentBtn')
const friendRequestBtn = document.querySelectorAll('.friendRequestBtn')
const friendAcceptBtn = document.querySelectorAll('.friendAcceptBtn')
const friendDeclineBtn = document.querySelectorAll('.friendDeclineBtn')

//event listener placements
    Array.from(deleteBtn).forEach((el)=>{
        el.addEventListener('click', deleteGameNight)
    })
    Array.from(todoItem).forEach((el)=>{
        el.addEventListener('click', markComplete)
    })
    Array.from(todoComplete).forEach((el)=>{
        el.addEventListener('click', markIncomplete)
    })
    Array.from(inviteBtn).forEach((el)=>{
        el.addEventListener('click', inviteUser)
    })
    Array.from(acceptBtn).forEach((el)=>{
        el.addEventListener('click', acceptInvite)
    })
    Array.from(declineBtn).forEach((el)=>{
        el.addEventListener('click', declineInvite)
    })
    Array.from(postCommentBtn).forEach((el)=>{
        el.addEventListener('click', postComment)
    })
    Array.from(friendRequestBtn).forEach((el)=>{
        el.addEventListener('click', sendFriendRequest)
    })
    Array.from(friendAcceptBtn).forEach((el)=>{
        el.addEventListener('click', acceptFriendRequest)
    })
    Array.from(friendDeclineBtn).forEach((el)=>{
        el.addEventListener('click', declineFriendRequest)
    })

//Invite, accept, and decline functions
async function inviteUser(){
    console.log('user invited')
    const gameNightId = this.parentNode.parentNode.parentNode.dataset.id
    const inviteUserInput = this.previousElementSibling.value
    console.log(gameNightId)
    console.log(inviteUserInput)
    try{
        const response = await fetch('gamenight/inviteUser', {
            method: 'put',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'gameNightIdFromJSFile': gameNightId,
                'invitedUser': inviteUserInput
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    }catch(err){
        console.log(err)
    }
}

async function acceptInvite(){
    console.log(this.parentNode.dataset.id)
    const gameNightId = this.parentNode.dataset.id
 console.log('accepting invite')
    try{
        const response = await fetch('gamenight/acceptInvite', {
            method: 'put',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'gameNightIdFromJSFile': gameNightId,
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    }catch(err){
        console.log(err)
    }
}

async function declineInvite(){
    console.log(this.parentNode)
    const gameNightId = this.parentNode.dataset.id
 console.log('declining invite')
    try{
        const response = await fetch('gamenight/declineInvite', {
            method: 'put',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'gameNightIdFromJSFile': gameNightId,
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    }catch(err){
        console.log(err)
    }
}

//Deletes gamenight
async function deleteGameNight(){
    console.log('delete button clicked')
    const gameNightId = this.parentNode.parentNode.dataset.id
    console.log(gameNightId)
    try{
        const response = await fetch('gamenight/deleteGameNight', {
            method: 'delete',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'gameNightIdFromJSFile': gameNightId
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    }catch(err){
        console.log(err)
    }
}

//comment Functions
async function postComment(){
    console.log('commentPosted')
    console.log(this.parentNode.dataset)
    const userId = this.parentNode.dataset.userid
    const userName = this.parentNode.dataset.username
    const gameNightId = this.parentNode.parentNode.parentNode.dataset.id
    const commentInput = this.previousElementSibling.value

    try{
        const response = await fetch('comment/createComment', {
            method: 'post',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'gameNightIdFromJSFile': gameNightId,
                'comment': commentInput,
                'userId': userId,
                'userName': userName
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    }catch(err){
        console.log(err)
    }
}
//friend functions
async function sendFriendRequest(){
    const friendId = this.dataset.profileid
    const userId = this.dataset.userid
    
    console.log(friendId)
    console.log(userId)
    console.log('sending friend request')
    
    try{
        const response = await fetch('/profile/friends/add', {
            method: 'put',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'friendId': friendId,
                'userId': userId
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    }catch(err){
        console.log(err)
    }
    
}
async function acceptFriendRequest(){
    const requesterId = this.dataset.requesterid
    const userId = this.dataset.userid
    
    console.log(requesterId)
    console.log(userId)
    console.log('accepting friend request')
    
    try{
        const response = await fetch('/profile/friends/accept', {
            method: 'put',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'requesterId': requesterId,
                'userId': userId
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    }catch(err){
        console.log(err)
    }
    
}
async function declineFriendRequest(){
    const requesterId = this.dataset.requesterid
    const userId = this.dataset.userid
    
    console.log(requesterId)
    console.log(userId)
    console.log('accepting friend request')
    
    try{
        const response = await fetch('/profile/friends/decline', {
            method: 'put',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'requesterId': requesterId,
                'userId': userId
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    }catch(err){
        console.log(err)
    }
    
}