import { useEffect, useRef, useState } from "react";

const defaultOptions = {
  root: null,
  rootMargin: "0px",
  threshold: 1.0,
};

export const useIntersectionObserver = (options = defaultOptions) => {
  const elementRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  const callbackFn = (entries) => {
    const [entry] = entries;
    setIsVisible(entry.isIntersecting);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(callbackFn, options);
    if (elementRef.current) observer.observe(elementRef.current);

    return () => {
      if (elementRef.current) observer.unobserve(elementRef.current);
    };
  }, [elementRef, options, callbackFn]);

  return [elementRef, isVisible];
};
