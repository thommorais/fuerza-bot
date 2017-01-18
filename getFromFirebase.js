function getDatabase() {
    'use strict'


    String.prototype.capitalize = function() {
        return this.charAt(0).toUpperCase() + this.slice(1);
    }

    // get specific data
    this.fromUsers = function(sender, dataToGet, type) {

        let where = global.fire.database()

        return where.ref(type).child(sender).child(dataToGet).once('value').then(function(snap) {
            return snap.val()
        })

    }


      // get all users data

      /*

      this.userExist = (sender) => {

        let where = global.fire.database()

        return where.ref('users').once('value').then((snap) => {

            let object = snap.val(),
                users = {}

            Object.keys(object).forEach((key) => {

                if (object[key].sender == sender)
                      users = object[key]
            })

            return users
        })

      }

        */

      this.userExist = (sender, type) => {

        let where = global.fire.database()

        return where.ref(type).child(sender).once('value').then((snap) => {
          return snap.val()
        })

      }

      this.maintenance = (sender) => {

        let where = global.fire.database()

        return where.ref('maintenances').child(sender).once('value').then((snap) => {

            let object = snap.val(),
                maintenance = {}

              if(object != null){

                Object.keys(object).forEach((key) => {

                  if(object[key].status != 'atendido')
                    maintenance.maintenance = object

                })

                return maintenance

              }
              else{

                return false

              }
        })

      }

      this.maintenanceStatus = (payload) => {
        let where = global.fire.database()

        return where.ref('maintenances').child(sender).child(payload).once('value').then((snap) => {

          let results = snap.val(),
              messageStatus = {
                message: {
                  attachment: {
                    type: 'template',
                    payload: {
                      template_type: 'generic',
                      elements: [{
                        title: results.title.capitalize(),
                        subtitle: 'Estado ' + results.status
                      }]
                    }
                  }
                }
              }

            return messageStatus
        })

      }

}

module.exports = getDatabase
