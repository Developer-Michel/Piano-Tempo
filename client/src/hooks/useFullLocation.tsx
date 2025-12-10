import { useLocation } from "wouter";
import { useEffect, useState } from "react";

export function useFullLocation() {
  const [path] = useLocation();
  const [full, setFull] = useState(
    () =>
      window.location.pathname + window.location.search + window.location.hash
  );

  useEffect(() => {
    const update = () => {
      setFull(
        window.location.pathname + window.location.search + window.location.hash
      );
    };

    // update when browser back/forward or hash changes
    window.addEventListener("popstate", update);
    window.addEventListener("hashchange", update);

    // patch pushState / replaceState to detect SPA navigations
    const origPush = history.pushState;
    const origReplace = history.replaceState;

    history.pushState = function (...args) {
      origPush.apply(this, args as any);
      update();
    };

    history.replaceState = function (...args) {
      origReplace.apply(this, args as any);
      update();
    };

    // initial sync
    update();

    return () => {
      window.removeEventListener("popstate", update);
      window.removeEventListener("hashchange", update);
      history.pushState = origPush;
      history.replaceState = origReplace;
    };
  }, []);

  // also update when wouter's path changes (just to be extra safe)
  useEffect(() => {
    setFull(
      window.location.pathname + window.location.search + window.location.hash
    );
  }, [path]);

  return full;
}
