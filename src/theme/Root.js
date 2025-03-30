// Override the default scrolling behavior
// Issue : https://github.com/joseeden/joeden/issues/8

import React, { useEffect } from "react";

export default function Root({ children }) {
  useEffect(() => {
    const handleHashChange = () => {
      setTimeout(() => {
        const element = document.getElementById(window.location.hash.slice(1));
        if (element) {
          window.scrollTo({
            top: element.offsetTop - 110, // Adjust for navbar height
            behavior: "smooth",
          });
        }
      }, 50);
    };

    window.addEventListener("hashchange", handleHashChange);

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  return <>{children}</>;
}
