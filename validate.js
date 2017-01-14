function validation() {
  'use strict'


  this.phonePromise = (phone) =>{
    // Return a new promise.

      return new Promise(function(resolve, reject) {

      let valid = true
      //retira todos os caracteres menos os numeros
      phone = phone.replace(/\D/g,'')

      //verifica se tem a qtde de numero correto
      if(!(phone.length >= 10 && phone.length <= 11))
        valid = false

      //Se tiver 11 caracteres, verificar se começa com 9 o celular
      if (phone.length == 11 && parseInt(phone.substring(2, 3)) != 9)
        valid = false

      //verifica se não é nenhum numero digitado errado (propositalmente)
      for(let n = 0; n < 10; n++){
      	//um for de 0 a 9.
        //estou utilizando o metodo Array(q+1).join(n) onde "q" é a quantidade e n é o
        //caractere a ser repetido
      	if(phone == new Array(11).join(n) || phone == new Array(12).join(n))
          valid = false
      }

      //DDDs validos
      let codigosDDD = [11, 12, 13, 14, 15, 16, 17, 18, 19,
                        21, 22, 24, 27, 28, 31, 32, 33, 34,
                        35, 37, 38, 41, 42, 43, 44, 45, 46,
                        47, 48, 49, 51, 53, 54, 55, 61, 62,
                        64, 63, 65, 66, 67, 68, 69, 71, 73,
                        74, 75, 77, 79, 81, 82, 83, 84, 85,
                        86, 87, 88, 89, 91, 92, 93, 94, 95,
                        96, 97, 98, 99
                      ]

        //verifica se o DDD é valido (sim, da pra verificar rsrsrs)
        if(codigosDDD.indexOf(parseInt(phone.substring(0, 2))) == -1) valid = false

  			// E por ultimo verificar se o numero é realmente válido.
        if (phone.length == 10 && [2, 3, 4, 5, 7].indexOf(parseInt(phone.substring(2, 3))) == -1)
          valid = false


        if (valid) {
          resolve(true)
        }

        else {
          reject('Número de telefone inválido')
        }

    })

  }


  this.phone = (phone) =>{

    //retira todos os caracteres menos os numeros
    phone = phone.replace(/\D/g,'')

    //verifica se tem a qtde de numero correto
    if(!(phone.length >= 10 && phone.length <= 11))
      return false

    //Se tiver 11 caracteres, verificar se começa com 9 o celular
    if (phone.length == 11 && parseInt(phone.substring(2, 3)) != 9)
      return false

    //verifica se não é nenhum numero digitado errado (propositalmente)
    for(let n = 0; n < 10; n++){
      //um for de 0 a 9.
      //estou utilizando o metodo Array(q+1).join(n) onde "q" é a quantidade e n é o
      //caractere a ser repetido
      if(phone == new Array(11).join(n) || phone == new Array(12).join(n))
        return false
    }

    //DDDs validos
    let codigosDDD = [11, 12, 13, 14, 15, 16, 17, 18, 19,
                      21, 22, 24, 27, 28, 31, 32, 33, 34,
                      35, 37, 38, 41, 42, 43, 44, 45, 46,
                      47, 48, 49, 51, 53, 54, 55, 61, 62,
                      64, 63, 65, 66, 67, 68, 69, 71, 73,
                      74, 75, 77, 79, 81, 82, 83, 84, 85,
                      86, 87, 88, 89, 91, 92, 93, 94, 95,
                      96, 97, 98, 99
                    ]

      //verifica se o DDD é valido (sim, da pra verificar rsrsrs)
      if(codigosDDD.indexOf(parseInt(phone.substring(0, 2))) == -1)
        return false

      // E por ultimo verificar se o numero é realmente válido.
      if (phone.length == 10 && [2, 3, 4, 5, 7].indexOf(parseInt(phone.substring(2, 3))) == -1)
        return false


      //se passar por todas as validações acima, então está tudo certo
      return true

  }

}

module.exports = validation
