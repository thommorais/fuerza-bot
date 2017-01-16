let inputs = doc.querySelectorAll('input')

function focus(t) {
  if(t.value)
    t.parentElement.classList.add('focus')
  else
    t.parentElement.classList.remove('focus')
}

for (let input of inputs) {

    input.addEventListener('focus', function() {
        this.parentElement.classList.add('focus')
    });

    input.addEventListener('blur', function() {
        focus(this)
    });

    focus(input)

}
