import { useEffect } from 'react'
import { useConnect } from "frontity"

export const useSearch = () => {
  const { state, actions } = useConnect()
  const { results, term, open } = state.theme.search
  const { setResults, setTerm, toggle } = actions.theme.search

  useEffect(() => {
    if (!!!term || term.trim().length < 3)
      return

    const fetchResults = async () => {
      const response = await fetch(`https://www.lucanus.ayz.pl/wp-json/wp/v2/search?search=${encodeURIComponent(term)}`)
      const results = await response.json()
      setResults(results)
    }
    fetchResults()
  }, [term])

  return [results, term, setTerm, open, toggle]
}

export default useSearch