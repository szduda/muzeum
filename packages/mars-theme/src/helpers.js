export const scrollToAnchor = id => {
  const yOffset = -32;
  const element = document.querySelector(id);
  const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;

  window.scrollTo({ top: y, behavior: 'smooth' });
}