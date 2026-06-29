import { defineRouting } from "next-intl/routing";
import { locales } from "./request";
export type AppHref =
  | "/"
  | "/gallery"
  | "/lessons/piano/groups/[city]"
  | "/lessons/piano/private/[city]"
  | "/methodology"
  | "/faq"
  | "/resources"
  | "/policy";

export const routing = defineRouting({
  locales,
  localePrefix: "always",
  defaultLocale: "fr",
  pathnames: {
    "/": "/",
    "/gallery": {
      fr: "/galerie",
      en: "/gallery",
    },
    "/lessons/piano/groups/[city]": {
      fr: "/cours-de-piano-groupes/[city]",
      en: "/groups-piano-lessons/[city]",
    },
    "/lessons/piano/private/[city]": {
      fr: "/cours-de-piano/[city]",
      en: "/piano-lessons/[city]",
    },
    "/methodology": {
      fr: "/methodologie",
    },
    "/faq": {
      fr: "/faq",
      en: "/faq",
    },
    "/resources": {
      fr: "/resources",
      en: "/resources",
    },
    "/policy": {
      fr: "/policy",
      en: "/policy",
    },
  },
});
