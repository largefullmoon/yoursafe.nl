(function () {
  let isMobile = window.matchMedia("(any-pointer:coarse)").matches;

  if (isMobile) {
    const elm = document.querySelector("html")
    elm.classList.add('mobile')
  }
})()
