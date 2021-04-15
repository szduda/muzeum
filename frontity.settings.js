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
              "Before tour",
              "/before-tour/"
            ],
            [
              "Auschwitz",
              "/auschwitz/"
            ],
            [
              "Birkenau",
              "/birkenau/"
            ],
            [
              "After visit",
              "/after-visit/"
            ],
            [
              "Help",
              "/help/",
              "help"
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
