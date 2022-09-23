
const deleteBtn = document.querySelectorAll('.del')
const todoItem = document.querySelectorAll('span.not')
const todoComplete = document.querySelectorAll('span.completed')
const inviteBtn = document.querySelectorAll('.inviteBtn')
const acceptBtn = document.querySelectorAll('.acceptBtn')
const declineBtn = document.querySelectorAll('.declineBtn')
const postCommentBtn = document.querySelectorAll('.postCommentBtn')

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
