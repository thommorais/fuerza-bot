'use strict'
let request     = require('request'),
    rp          = require('request-promise'),
    token       = require('./token'),
    getFireFile = require('./getFromFirebase'),
    getFire     = new getFireFile(),
    tokenValue  = new token()

function database(){
  'use strict'

  // this add to de db
  let add = (path,data) => {

    let updates = {}
        updates[path] = data

    return global.fire.database().ref().update(updates)

  }

  this.active = (user) =>{

    let path = `users/${user}/active`

    add(path,true)

  }

  this.sender = (user) =>{

    let path = `users/${user}/sender`

    add(path,sender)

  }


  this.newSender = (user) =>{

    let path = `indexes/${sender}`

    add(path,user)

  }


this.newMaintenance = (sender, title, description) =>{

  console.log('fire', sender)

  getFire.userExist(sender, 'indexes').then(index => {
    getFire.userExist(index, 'users').then(user => {
      getFire.userExist(user.house, 'houses').then(house => {

        let path = `maintenances/${sender}/${stamp}`,
        data = {
        title : title,
        description : description,
        id : stamp,
        sender : sender,
        user: index,
        user_name: user.full_name,
        house: `${house.address} - ${house.number}`,
        status : 'Ainda não visualizado'
      }

        add(path,data)
      })

    })
  })
}

  this.justForTest = (number) => {

    let path = `users/${number}`,
        data = {
            active : false,
            first_name : `test ${stamp}` ,
            full_name : `test testing ${stamp}` ,
            house : 'borges_medeiros_1012',
            last_name : 'testing',
            phone : number,
            sender : sender
          }

      add(path,data)

    testing = false
  }


}

module.exports = database
