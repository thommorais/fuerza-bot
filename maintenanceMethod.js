function maintenancer() {

    'use strict'

    let
        senderFile  = require('./sender'),
        addFireFile = require('./addToFirebase'),
        buttons     = require('./handleActions'),

        senderMsg   = new senderFile(),
        addFire     = new addFireFile(),
        quickAction = new buttons(),

        maintenanceObject = {
          title : null,
          description : null,
          status : null
        }

    this.request = (msg) =>{

      if(maintenanceObject.title == null){
        maintenanceObject.title = msg
        senderMsg.send(sender, {text: 'Descreva o problema'})
      }

      else if(maintenanceObject.title != null && maintenanceObject.description == null){
        maintenanceObject.description = msg
        maintenanceObject.status = 'open'
      }

      if(maintenanceObject.title != null && maintenanceObject.description != null){

let response = `${maintenanceObject.title}
                ${maintenanceObject.description}`

  //      senderMsg.send(sender,{text: response})
//        senderMsg.send(sender, quickAction.handleAction('sendMaintenanceRequest'))

        addFire.newMaintenance(sender, maintenanceObject.title, maintenanceObject.description)
        senderMsg.send(sender,{text: 'Manutenção solicitada :)'})

        maintenanceMode = false
        maintenanceObject.title = null
        maintenanceObject.description = null
        maintenanceObject.status = null

      }

    }

}

module.exports = maintenancer
