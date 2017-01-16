// Detect css transform
let cssTransform = (function() {
    let prefixes = 'transform webkitTransform mozTransform oTransform msTransform'.split(' '),
        el = document.createElement('div'),
        cssTransform, i = 0
    while (cssTransform === undefined) {
        cssTransform = document.createElement('div').style[prefixes[i]] != undefined ? prefixes[i] : undefined
        i++
    }
    return cssTransform
})()

let sections = doc.querySelectorAll('.section'),
    wrapper = doc.querySelector('#wrap'),
    menu = doc.querySelector('#menu'),
    anchors = doc.querySelectorAll('#menu a'),
    count = sections.length,
    section = [],
    wHeight = window.innerHeight
var lastY = -1

// Pre calculate sizes to get better perfs
function props() {
    lastY = -1 // Force a recalculation
    let wHeight = window.innerHeight
    for (let i = 0; i < count; i++) {
        section[i] = section[i] || {  el: sections[i] }
        section[i].height = section[i].el.offsetHeight
        section[i].start = section[i - 1] ? section[i - 1].stop : 0
        section[i].stop = section[i - 1] ? section[i - 1].stop + section[i].height : section[i].height
        section[i].dark = section[i].el.className.indexOf('dark') > 0
    }
}

window.onresize = props

function setTop(m, t) {
    if (cssTransform)
        m.style[cssTransform] = "translate3d(0, -" + t + "px,0)"
    else
        m.style["top"] = t
}

function loop() {
    // Avoid calculations if not needed
    if (lastY == window.pageYOffset) {
        animation(loop)
        return false
    } else {
        lastY = window.pageYOffset
    }

    let i = 0
    for (i = 0; i < count; i++) {

        // if it is on screen
        if (lastY >= (section[i].start - 2) && lastY <= (section[i].stop + 2) ){


            //setTop(section[i].el, lastY * .1 / 3);

            section[i].el.classList.add('actual')


            // to get menu fixed
            if (lastY >= section[0].stop)
                menu.classList.add('fixed')
            else
                menu.classList.remove('fixed')

            // marking menu
            for (let anchor of anchors) {
                if(anchor.classList.contains(section[i].el.id))
                    anchor.classList.add('on')
                else
                    anchor.classList.remove('on')
            }

            // if is dark
            if (section[i].dark)
                menu.setAttribute("data-color", "dark")
            else
                menu.setAttribute("data-color", "light")

        } else {
            section[i].el.classList.remove('actual')
        }


    }

    animation(loop)
}





// Let's go
props()
loop()



// scroll to sections
/**
    Smoothly scroll element to the given target (element.scrollTop)
    for the given duration

    Returns a promise that's fulfilled when done, or rejected if
    interrupted
 */
var smooth_scroll_to = function(element, target, duration) {
    target = Math.round(target)
    duration = Math.round(duration)

    if (duration < 0)
        return Promise.reject("bad duration")

    if (duration === 0) {
        element.scrollTop = target
        return Promise.resolve()
    }

    let
        start_time = Date.now(),
        end_time = start_time + duration,
        start_top = element.scrollTop,
        distance = target - start_top,

        // based on http://en.wikipedia.org/wiki/Smoothstep
        smooth_step = function(start, end, point) {
            if (point <= start) return 0
            if (point >= end) return 1
            let x = (point - start) / (end - start) // interpolation
            return x * x * (3 - 2 * x)
        }

    return new Promise(function(resolve, reject) {
        // This is to keep track of where the element's scrollTop is
        // supposed to be, based on what we're doing
        let
            previous_top = element.scrollTop,

            // This is like a think function from a game loop
            scroll_frame = function() {
                if (element.scrollTop != previous_top) {
                    reject(previous_top)
                    return
                }

                // set the scrollTop for this frame
                let
                    now = Date.now(),
                    point = smooth_step(start_time, end_time, now),
                    frameTop = Math.round(start_top + (distance * point))

                element.scrollTop = frameTop

                // check if we're done!
                if (now >= end_time) {
                    resolve()
                    return
                }

                // If we were supposed to scroll but didn't, then we
                // probably hit the limit, so consider it done; not
                // interrupted.
                if (element.scrollTop === previous_top &&
                    element.scrollTop !== frameTop) {
                    resolve()
                    return
                }
                previous_top = element.scrollTop

                // schedule next frame for execution
                animation(scroll_frame)
            }

        // boostrap the animation process
        animation(scroll_frame)
    })
}

function Y(t) {
    let
        // make it an string
        going = t.attributes.href.nodeValue.toString(),
        // get the coordinates
        box = doc.querySelector(going).getBoundingClientRect(),
        // get the body
        body = document.body,
        // get the document ... firefox friendly
        docEl = document.documentElement,
        // get the document top
        scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop,
        // get the client top
        clientTop = docEl.clientTop || body.clientTop || 0,
        // the top of element plus the document top minus the window top.
        top = box.top + scrollTop - clientTop

    return {
        top: Math.round(top)
    }
}

for (let anchor of anchors) {

    anchor.onclick = function() {
        // where we want to go?
        let goTo = Y(this)
        smooth_scroll_to(document.body, goTo.top, 900)
        return false
    }

}
