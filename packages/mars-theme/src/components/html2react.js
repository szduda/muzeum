import { loadable } from "frontity";
import { Link } from "./theme";
import { H2, H3, H4 } from "./headings";

const Carousel = loadable(() => import("./carousel"));
const OpeningHours = loadable(() => import("./opening-hours"));
// const TableOfContents = loadable(() => import("./toc"));
const Steps = loadable(() => import("./steps"));

export const Anchor = Link;

const elements = [
  ["a", Anchor],
  ["h2", H2],
  ["h3", H3],
  ["h4", H4],
];

export const init = ({ libraries }) => {
  elements.map(([tag, component]) => {
    const entry = createEntry(tag, component);
    libraries.html2react.processors.push(entry);
  });

  const carouselEntry = createEntry(
    ({ node }) =>
      node.component === "div" && node.props.className?.includes("carousel"),
    null,
    ({ node }) => {
      node.component = Carousel;
      node.children = node.children[0].children;
      return node;
    }
  );

  const stepsEntry = createEntry(
    ({ node }) =>
      node.component === "ol" &&
      node.props.className?.includes("steps-section"),
    Steps
  );

  // const tocEntry = createEntry(
  //   ({ node }) =>
  //     node.component === "div" &&
  //     node.props.className?.includes("table-of-contents"),
  //   null,
  //   ({ node }) => {
  //     node.component = TableOfContents;
  //     node.children = node.children[0].children;
  //     return node;
  //   }
  // );

  const openingHours = createEntry(
    ({ node }) =>
      node.component === "div" &&
      node.props.className?.includes("opening-hours"),
    OpeningHours
  );

  libraries.html2react.processors.push(carouselEntry);
  libraries.html2react.processors.push(stepsEntry);
  libraries.html2react.processors.push(openingHours);
  // libraries.html2react.processors.push(tocEntry)
};

export default init;

const createEntry = (test, component, _processor) => ({
  test:
    typeof test === "function" ? test : ({ node }) => node.component === test,
  processor:
    _processor ||
    (({ node }) => {
      node.component = component;
      return node;
    }),
});
