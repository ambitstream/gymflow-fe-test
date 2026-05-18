import { useEffect, useRef, type RefObject } from "react";

export default function useInfiniteScroll(
  targetRef: RefObject<HTMLElement | null>,
  callback: () => void,
  enabled = true
) {
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    const targetElement = targetRef.current;

    if (!enabled || !targetElement) {
      return;
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (entry?.isIntersecting) {
        callbackRef.current();
      }
    });

    observer.observe(targetElement);

    return () => {
      observer.disconnect();
    };
  }, [targetRef, enabled]);
}