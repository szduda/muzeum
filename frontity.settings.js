const settings = {
  "name": "muzeum",
  "state": {
    "frontity": {
      "url": "https://lucanus.ayz.pl",
      "title": "Visit Auschwitz",
      "description": "Clear and useful information on numerous aspects of the visit - in order to save time and help both the visitors and the Museum staff."
    }
  },
  "packages": [
    {
      "name": "@frontity/mars-theme",
      "state": {
        "theme": {
          "menu": [
            [
              "Tickets & Guide",
              "/tickets-and-guide/",
            ],
            [
              "Arrival",
              "/arrival/"
            ],
            [
              "Get ready",
              "/get-ready/"
            ],
            [
              "Auschwitz-Birkenau",
              "/auschwitz-birkenau/"
            ],
            [
              "See more",
              "/see-more/"
            ],
            [
              "Search",
              "#",
              "Search"
            ],
            [
              "Change language",
              "#",
              "Lang"
            ],
            [
              "Help",
              "/help/",
              "Help"
            ],
            [
              "Mission",
              "/mission/"
            ]
          ],
          "featured": {
            "showOnList": false,
            "showOnPost": false
          }
        }
      }
    },
    {
      "name": "@frontity/wp-source",
      "state": {
        "source": {
          "url": "https://lucanus.ayz.pl",
          "homepage": "home"
        }
      }
    },
    "@frontity/tiny-router",
    "@frontity/html2react"
  ]
};

export default settings;
