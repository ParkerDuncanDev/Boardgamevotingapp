const deleteBtn = document.querySelectorAll('.del')
const todoItem = document.querySelectorAll('span.not')
const todoComplete = document.querySelectorAll('span.completed')
const inviteBtn = document.querySelectorAll('.inviteBtn')

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

//share Gamenight client function
async function inviteUser(){
    console.log('user invited')
    const gameNightId = this.parentNode.parentNode.dataset.id
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

async function markComplete(){
    const gameNightId = this.parentNode.dataset.id
    try{
        const response = await fetch('todos/markComplete', {
            method: 'put',
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

async function markIncomplete(){
    const gameNightId = this.parentNode.dataset.id
    try{
        const response = await fetch('todos/markIncomplete', {
            method: 'put',
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