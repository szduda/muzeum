import { useState, useEffect } from 'react'
import { useConnect } from "frontity"
import { useDebouncedCallback } from "use-debounce";

export const useSearch = () => {
  const { state, actions } = useConnect()
  const { results, term, open } = state.theme.search
  const { setResults, setTerm, toggle } = actions.theme.search

  const [previousTerm, setPreviousTerm] = useState('')

  const fetchResults = async () => {
    const response = await fetch(`https://www.lucanus.ayz.pl/wp-json/wp/v2/search?search=${encodeURIComponent(term)}`)
    const results = await response.json()
    setResults(results)
  }
  const debouncedFetch = useDebouncedCallback(fetchResults, 500)

  useEffect(() => {
    if (!!!term || term.trim().length < 3 || term === previousTerm)
      return

    debouncedFetch()
    setPreviousTerm(term)
  }, [term, debouncedFetch])

  return [results, term, setTerm, open, toggle]
}

export default useSearch