function getDatabase() {
    'use strict'

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

            Object.keys(object).forEach((key) => {

              if (object[key].status == 'open') {

                maintenance.maintenance = object
              }

            })

            return maintenance

        })

      }

      this.maintenanceStatus = (payload) => {
        let where = global.fire.database()

        console.log(sender, payload)
        return where.ref('maintenances').child(sender).child(payload).once('value').then((snap) => {
            return snap.val()
        })

      }

}

module.exports = getDatabase
