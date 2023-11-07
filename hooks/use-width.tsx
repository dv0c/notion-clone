import { currWidth, maxWidth, minWidth } from "@/PublicVariables";
import { useEffect, useState } from "react";

export const handleResize = () => {
  const [width, setWidth] = useState(currWidth);
  useEffect(() => {
    width === minWidth ? setWidth(maxWidth) : setWidth(minWidth);
  }, [width]);

  console.log(width);

  return width;
};
