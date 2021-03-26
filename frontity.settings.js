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
              "Arrival",
              "/arrival/"
            ],
            [
              "Before entering",
              "/before-entering/"
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
              "After visiting",
              "/after-visiting/"
            ],
            [
              "more...",
              "/more/"
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
          "url": "https://lucanus.ayz.pl"
        }
      }
    },
    "@frontity/tiny-router",
    "@frontity/html2react"
  ]
};

export default settings;
