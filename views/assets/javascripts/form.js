// forms
// on focus #####################
let inputs = document.querySelectorAll('#contato input')

function onFocus() {
    let parent = this.parentNode
    parent.classList.add('focus')
}

function onBlur(e, i) {

    let parent = e.parentNode || this.parentNode,
        value = (this) ? this.value : i

    if (!value)
        parent.classList.remove('focus')
    else
        parent.classList.add('focus')

}

for (let input of inputs) {
    input.addEventListener('focus', onFocus)
    input.addEventListener('blur', onBlur)
    onBlur(input, input.value)
}
