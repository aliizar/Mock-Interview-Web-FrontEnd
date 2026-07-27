import { useEffect, useState } from "react";

export default function useCountUp(
  end: number,
  startAnimation: boolean,
  duration = 1800,
) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!startAnimation) return;

    let start = 0;

    const increment = end / (duration / 16);

    const timer = setInterval(() => {
      start += increment;

      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [end, startAnimation, duration]);

  return count;
}
