const settings = {
  name: "muzeum",
  state: {
    frontity: {
      url: "https://noderesources.visitauschwitz.info",
      title: "Visit Auschwitz",
      description:
        "Clear and useful information on numerous aspects of the visit - in order to save time and help both the visitors and the Museum staff.",
    },
  },
  packages: [
    {
      name: "@frontity/mars-theme",
      state: {
        theme: {
          menu: [
            ["Tours", "/tours/"],
            ["Arrival", "/arrival/"],
            ["Get ready", "/get-ready/"],
            ["Auschwitz-Birkenau", "/auschwitz-birkenau/"],
            ["Surroundings", "/surroundings/"],
          ],
          settings: [["Change language", "#", "Lang"]],
          featured: {
            showOnList: true,
            showOnPost: true,
          },
        },
      },
    },
    {
      name: "@frontity/wp-source",
      state: {
        source: {
          url: "https://noderesources.visitauschwitz.info",
          homepage: "home",
          postsPage: "articles",
          postTypes: [
            {
              type: "common",
              endpoint: "common",
            },
          ],
        },
      },
    },
    "@frontity/tiny-router",
    "@frontity/html2react",
    "@frontity/yoast",
  ],
};

export default settings;
