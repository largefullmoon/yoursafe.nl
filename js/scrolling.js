const scrollToTarget = (target) => {
const element = document.querySelector(target);
  element.scrollIntoView({ behavior: "smooth", block: "start" });
}

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

module.exports = {
  scrollToTarget,
  scrollToTop,
}
