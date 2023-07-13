import React, { useEffect, ReactNode } from "react";
import { useLocation } from "react-router-dom";

type ScrollToTopProps = {
  children: ReactNode;
};

const ScrollToTop: React.FC<ScrollToTopProps> = ({ children }) => {
  const location = useLocation();
  const { pathname } = location;

  useEffect(() => {
    const canControlScrollRestoration = 'scrollRestoration' in window.history;
    if (canControlScrollRestoration) {
      window.history.scrollRestoration = 'manual';
    }

    window.scrollTo(0, 0);
  }, [pathname]);

  return <>{children}</>;
};

export default ScrollToTop;
