'use client';

import React, { useEffect } from 'react';
import { motion, Transition } from 'framer-motion';

const transition: Transition = { type: 'spring', duration: 0.5 };

function Digit({ value, maxVal = 9 }: { value: number; maxVal?: number }) {
  const [isChanging, setChanging] = React.useState(false);
  const [curr, setCurr] = React.useState(value);
  const nextVal = (((curr - 1) % (maxVal + 1)) + (maxVal + 1)) % (maxVal + 1);

  useEffect(() => {
    if (value == curr) {
      return;
    }

    // Display the animated components, and animate them
    setChanging(true);

    // After animation is done, revert to static components
    const timeout = setTimeout(() => {
      setCurr(value);
      setChanging(false);
    }, 500);

    return () => clearTimeout(timeout);
  }, [value, curr]);

  const currAnimation = {
    y: isChanging ? '50%' : 0,
    opacity: isChanging ? 0 : 1,
  };
  const nextAnimation = {
    y: isChanging ? 0 : '-50%',
    opacity: isChanging ? 1 : 0,
  };

  return (
    <div className="relative">
      <div className={isChanging ? 'opacity-0' : ''}>{curr}</div>
      <motion.div
        className={`absolute top-0 ${isChanging ? '' : 'hidden'}`}
        animate={currAnimation}
        transition={transition}
      >
        {curr}
      </motion.div>
      <motion.div
        className={`absolute top-0 ${isChanging ? '' : 'hidden'}`}
        animate={nextAnimation}
        transition={transition}
      >
        {nextVal}
      </motion.div>
    </div>
  );
}

const START_TIME = 1739552400000;
const END_TIME = 1739725200000;

function getDuration(now: number) {
  let next = 0;
  if (now <= START_TIME) {
    next = START_TIME;
  } else if (now <= END_TIME) {
    next = END_TIME;
  }

  return next - now;
}

export default React.memo(function Countdown() {
  const [throttledNow, setNow] = React.useState<number>();

  // Update the time every minute
  useEffect(() => {
    setNow(Date.now());

    const timeout = setInterval(() => {
      setNow(Date.now());
    }, 1000);

    return () => clearTimeout(timeout);
  }, []);

  let runningDuration = throttledNow != null ? getDuration(throttledNow) : 0;

  const dayFirstDigit = Math.floor(runningDuration / 864_000_000);
  runningDuration -= dayFirstDigit * 864_000_000;
  const daySecondDigit = Math.floor(runningDuration / 86_400_000);
  runningDuration -= daySecondDigit * 86_400_000;

  const hourFirstDigit = Math.floor(runningDuration / 36_000_000);
  runningDuration -= hourFirstDigit * 36_000_000;
  const hourSecondDigit = Math.floor(runningDuration / 3_600_000);
  runningDuration -= hourSecondDigit * 3_600_000;

  const minuteFirstDigit = Math.floor(runningDuration / 600_000);
  runningDuration -= minuteFirstDigit * 600_000;
  const minuteSecondDigit = Math.floor(runningDuration / 60_000);
  runningDuration -= minuteSecondDigit * 60_000;

  const secondFirstDigit = Math.floor(runningDuration / 10_000);
  runningDuration -= secondFirstDigit * 10_000;
  const secondSecondDigit = Math.floor(runningDuration / 1_000);

  return (
    <motion.div
      className="flex flex-row"
      animate={{
        opacity: throttledNow == null ? 0 : 1,
        y: throttledNow == null ? '-50%' : '0%',
      }}
      initial={false}
    >
      {throttledNow == null ? (
        <>00:00:00:00</>
      ) : (
        <>
          <Digit value={dayFirstDigit} />
          <Digit value={daySecondDigit} />
          <div>:</div>
          <Digit value={hourFirstDigit} maxVal={2} />
          <Digit value={hourSecondDigit} />
          <div>:</div>
          <Digit value={minuteFirstDigit} maxVal={5} />
          <Digit value={minuteSecondDigit} />
          <div>:</div>
          <Digit value={secondFirstDigit} maxVal={5} />
          <Digit value={secondSecondDigit} />
        </>
      )}
    </motion.div>
  );
});
