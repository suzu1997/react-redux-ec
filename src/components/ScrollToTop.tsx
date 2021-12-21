import { useEffect, VFC, ReactNode } from "react";
import { useLocation } from "react-router";

type Props = {
  children: ReactNode;
}

const ScrollToTop: VFC<Props> = (props) => {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return <>{props.children}</>
};

export default ScrollToTop;
