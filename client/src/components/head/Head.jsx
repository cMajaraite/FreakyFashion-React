import { useEffect } from "react";

const Head = ({ title }) => {
  useEffect(() => {
    document.title = title;
  }, [title]);

  return null;
};

export default Head;

