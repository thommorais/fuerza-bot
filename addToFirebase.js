'use strict'
var request     = require('request'),
    rp          = require('request-promise'),
    token       = require('./token'),
    tokenValue  = new token()

function database(){
  'use strict'

  // this add to de db
  let add = (path,data) => {

    let updates = {}
        updates[path] = data

    return  global.fire.database().ref().update(updates)

  }

  // this function is to add users
  this.userAdd = function(sender){

    let path = 'users' + '/' + sender,
        options = {
          url: 'https://graph.facebook.com/v2.6/'+sender+'?fields=first_name,last_name,profile_pic&access_token='+ tokenValue.tokenVar(),
          json: true
       }

    rp(options)
        .then(function (response) {

          let data = {
            full_name :  response.first_name + ' ' + response.last_name,
            name : response.first_name,
            last_name : response.last_name,
            sender : sender
          }

          add(path,data).then(function(response){
            return 'added'
          })

        }).catch(function (err) {
          console.log(err)
        })
  }


}

module.exports = database
