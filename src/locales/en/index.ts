import common from "./common.json";
import home from "./home.json";
import policy from "./policy.json";
import faq from "./faq.json";
import gallery from "./gallery.json";
import resources from "./resources.json";
import methodology from "./methodology.json";
import pianoLessonsGatineau from "./piano-lessons-gatineau.json";
import pianoLessonsOttawa from "./piano-lessons-ottawa.json";
import pianoLessonsPrivateGatineau from "./piano-lessons-private-gatineau.json";

export default {
  ...common,
  ...home,
  ...policy,
  ...faq,
  ...gallery,
  ...resources,
  ...methodology,
  ...pianoLessonsGatineau,
  ...pianoLessonsOttawa,
  ...pianoLessonsPrivateGatineau,
};
