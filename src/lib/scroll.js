
let targets = {}


function scrollWatch(el) {
  let screenHeight = window.innerHeight
  let docOffsetHeight = document.body.scrollHeight
  let currentPageYOffset = window.pageYOffset
  let anchors = document.querySelectorAll('[scroll]')
  anchors = Array.from(anchors)

  //navigation bar follow main content scroll
  el.scrollTop = currentPageYOffset / 15


  for(let item of Object.keys(targets)) {
    if(targets[item] <= currentPageYOffset + 10 ){
      let targetAnchor = anchors.filter(function(anchor){
        // title id === anchorScrollValue
        let anchorScrollValue = anchor.attributes.getNamedItem('scroll').value
        return item === anchorScrollValue
      })
      if(document.querySelector('.customActive')) {
        document.querySelector('.customActive').setAttribute('class', ' ')
      }
      // add class to tag a parent li
      targetAnchor[0].parentNode.setAttribute('class', 'customActive');
    } 
    // 
    else if(docOffsetHeight <= currentPageYOffset + screenHeight){
      let targetAnchor = anchors.filter(function(anchor){
        let anchorScrollValue = anchor.attributes.getNamedItem('scroll').value
        return item === anchorScrollValue
      })
      if(document.querySelector('.customActive')) {
        document.querySelector('.customActive').setAttribute('class', ' ')
      }
      targetAnchor[0].parentNode.setAttribute('class', 'customActive');
    }
  }
}


function smoothScroll(el, duration, offset) {
  let target = document.querySelector(el.getAttribute('scroll'))
  let targetPosition = target.getBoundingClientRect().top - offset
  let startPosition = window.pageYOffset
  let startTime = null
  
  function animation(currentTime) {
    if(startTime === null) {
      startTime = currentTime
    }
    let timeElapsed = currentTime - startTime
    let run = ease(timeElapsed, startPosition, targetPosition, duration)
    window.scrollTo(0, run)
    if(timeElapsed < duration) {
      requestAnimationFrame(animation)
    }
  }

  function ease(t, b, c, d) {
    return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b;
  }

  requestAnimationFrame(animation)
}

function OffsetData(targetId, targetOffset) {
   this[targetId] = targetOffset
}


const VueScrollData = function(el, offset, watchElement) {
  if(watchElement) {
    let targetId = el.getAttribute('scroll')
    let targetOffset = document.querySelector(el.getAttribute('scroll')).getBoundingClientRect().top - offset
    let target = new OffsetData(targetId, targetOffset)
    Object.assign(targets, target)
    console.log(targets)
    console.log(document.querySelector(el.getAttribute('scroll')).getBoundingClientRect())
  }


}

const VueScrollWatch = function(el) {
  let ticking = false
  window.addEventListener('scroll', function() {
    if (!ticking) {
      window.requestAnimationFrame(function() {
        scrollWatch(el)
        ticking = false
      });
    }
    ticking = true
  })
}


const VueScrollTo = function (el, duration, offset) {
  let watchElement = document.querySelector(el.getAttribute('scroll')) || undefined
  
  VueScrollData(el, offset, watchElement)
  el.addEventListener('click', function() {
    watchElement? smoothScroll(el, duration, offset): console.log('No data')
  })
}














export { 
  VueScrollWatch,
  VueScrollTo
}
