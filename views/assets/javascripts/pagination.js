var portfolios  = body.querySelectorAll('.thumb a')
    ,sections_h = doc.querySelector('.sections-home')
    ,content = false


// click of portfolio
for (let portfolio of portfolios) {

    portfolio.onclick = function() {
      // url
      url(this)

      // ajax
      get(this.getAttribute('href'))
      return false
    }
}

// print new url
function url(a) {

  history.pushState( {
    portfolio_id: a.getAttribute('href'),
    portfolio: a.innerHTML
  }, null, "/" + a.getAttribute('href') )


}

window.onpopstate = function (event) {
  let conten = ""
  if(event.state)
    conten = event.state.plate

}


// function to parse the responseText returned by XMLHttpRequest
function parseHTML(c) {
    let temp
    temp = document.createElement('TEMPLATE')
    if (temp.content) {
        temp.innerHTML = c
        return temp
    }
}

// if is old IE
if (window.XMLHttpRequest) {
    content = new XMLHttpRequest()
} else if (window.ActiveXObject) {
    content = new ActiveXObject("Microsoft.XMLHTTP")
}

// ajax function
function get(source){
    if (content) {

        content.open('GET', 'http://localhost:3000/' + source)

        content.onreadystatechange = function (){
            if (content.readyState == 4 && content.status == 200){

                let main = parseHTML(content.responseText)

                let clone = document.importNode(main.content.querySelector('main'), true);

                document.body.appendChild(clone);


              }

        }
        content.send(null)
    }
}
