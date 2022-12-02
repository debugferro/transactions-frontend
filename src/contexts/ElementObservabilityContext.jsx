import { createContext } from "react";
import { useIntersectionObserver } from "../hooks/useIntersectionObserver";

export const ElementObservabilityContext = createContext({});

export const ElementObservabilityProvider = ({ options, children }) => {
  const [elementRef, isVisible] = useIntersectionObserver(options);

  return (
    <ElementObservabilityContext.Provider value={{ elementRef, isVisible }}>
      {children}
    </ElementObservabilityContext.Provider>
  );
};
