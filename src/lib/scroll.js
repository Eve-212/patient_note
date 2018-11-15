// scroll watch function
function scrollWatch() {
  
}


// smooth scroll function
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






const VueScrollTo = function (el, duration, offset) {
  el.addEventListener('click', function() {
    document.querySelector(el.getAttribute('scroll'))? smoothScroll(el, duration, offset): console.log('No data')
  })
}

export default VueScrollTo
