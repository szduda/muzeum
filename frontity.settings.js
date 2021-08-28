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
              "Tickets",
              "/tickets/",
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
          ],
          settings: [
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
            "showOnList": true,
            "showOnPost": true
          }
        }
      }
    },
    {
      "name": "@frontity/wp-source",
      "state": {
        "source": {
          "url": "https://lucanus.ayz.pl",
          "homepage": "home",
          postTypes: [
            {
              type: "common",
              endpoint: "common"
            }
          ]
        }
      }
    },
    "@frontity/tiny-router",
    "@frontity/html2react"
  ]
};

export default settings;
