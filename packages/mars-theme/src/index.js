import Theme from "./components"
import image from "@frontity/html2react/processors/image"
import iframe from "@frontity/html2react/processors/iframe"
import { init } from './components/html2react'

const marsTheme = {
  name: "@frontity/mars-theme",
  roots: {
    /**
     * In Frontity, any package can add React components to the site.
     * We use roots for that, scoped to the `theme` namespace.
     */
    theme: Theme,
  },
  state: {
    /**
     * State is where the packages store their default settings and other
     * relevant state. It is scoped to the `theme` namespace.
     */
    theme: {
      autoPrefetch: "in-view",
      menu: [],
      settings: [],
      isMobileMenuOpen: false,
      isMapOpen: false,
      isHeaderSticky: false,
      isSettingsOpen: false,
      search: {
        open: false,
        term: '',
        results: []
      },
      featured: {
        showOnList: false,
        showOnPost: false,
      },
    },
  },

  /**
   * Actions are functions that modify the state or deal with other parts of
   * Frontity like libraries.
   */
  actions: {
    theme: {
      init,
      beforeSSR: ({ actions }) => async ({ ctx }) => {
        await actions.source.fetch(`/common/footer/`)
      },
      toggleMobileMenu: ({ state }) => {
        state.theme.isMobileMenuOpen = !state.theme.isMobileMenuOpen
      },
      closeMobileMenu: ({ state }) => {
        state.theme.isMobileMenuOpen = false
      },
      toggleMap: ({ state }) => {
        state.theme.isMapOpen = !state.theme.isMapOpen
      },
      setSticky: ({ state }) => {
        state.theme.isHeaderSticky = true
      },
      unsetSticky: ({ state }) => {
        state.theme.isHeaderSticky = false
      },
      setLandscapeOrientation: ({ state }) => {
        state.theme.isLandscape = true
      },
      setPortraitOrientation: ({ state }) => {
        state.theme.isLandscape = false
      },
      toggleSettings: ({ state }) => {
        state.theme.isSettingsOpen = !state.theme.isSettingsOpen
      },
      search: {
        toggle: ({ state }) => {
          state.theme.search.open = !state.theme.search.open
        },
        setTerm: ({ state }) => term => {
          state.theme.search.term = term
        },
        setResults: ({ state }) => {
          state.theme.search.results = ['x', 'y', 'z', 'a', 'b', 'c']
        }
      }
    },
  },
  libraries: {
    html2react: {
      /**
       * Add a processor to `html2react` so it processes the `<img>` tags
       * and internal link inside the content HTML.
       * You can add your own processors too.
       */
      processors: [image, iframe],
    },
  },
};

export default marsTheme
