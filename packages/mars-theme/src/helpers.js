import { useEffect, useState } from 'react';

export const scrollToAnchor = id => {
  const yOffset = 0;
  const element = document.querySelector(id);

  if (element) {
    const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
    document.querySelector('#root').scrollTo({ top: y, behavior: 'smooth' });
  }
}

export const useMediaQuery = (query) => {
  const [matches, setMatches] = useState();
  useEffect(() => {
    const mediaMatch = window.matchMedia(query);
    if (!mediaMatch) return
    setMatches(mediaMatch.matches)

    const handler = e => setMatches(e.matches)
    mediaMatch.addEventListener('change', handler)

    return () => mediaMatch.removeEventListener('change', handler)
  })

  return matches
};

export const useMousedown = () => {
  const [mousedown, setMousedown] = useState(false)
  const handlerTrue = () => setMousedown(true)
  const handlerFalse = () => setMousedown(false)

  useEffect(() => {
    document.addEventListener('mousedown', handlerTrue)
    document.addEventListener('keydown', handlerFalse)
    return () => {
      document.removeEventListener('mousedown', handlerTrue)
      document.removeEventListener('keydown', handlerFalse)
    }
  }, [])

  return mousedown
}

export const getBodyLockStyle = ({ padRight = 0 }) => ({
  body: {
    overflowY: "hidden",
    paddingRight: padRight ? '15px' : 0
  }
})