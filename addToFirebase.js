'use strict'
let request     = require('request'),
    rp          = require('request-promise'),
    token       = require('./token'),
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



  this.newMaintenance = (title, description) =>{

    let path = `maintenances/${sender}/${stamp}`,
    data = {
      title : title,
      description : description,
      id : stamp,
      status : 'Ainda não visualizado'
    }

    add(path,data)

  }

  this.justForTest = (number) => {

    let path = `users/${number}`,
        data = {
            active : false,
            first_name : `test ${stamp}` ,
            full_name : `test testing ${stamp}` ,
            houses : 'borges-medeiros',
            last_name : 'testing',
            phone : number,
            sender : sender
          }

      testing = false
      console.log(number, path)

      add(path,data)



  }


}

module.exports = database
