"use client";

import { useEffect, useState } from "react";

const formatter = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Asia/Ho_Chi_Minh",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: false,
});

export default function HanoiClock({ seconds = true }: { seconds?: boolean }) {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const tick = () => {
      const value = formatter.format(new Date());
      setTime(seconds ? value : value.slice(0, 5));
    };
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, [seconds]);

  return (
    <time className="clock" suppressHydrationWarning>
      {time ?? (seconds ? "--:--:--" : "--:--")}
    </time>
  );
}
