import { useState, useEffect } from 'react';

const useDateTime = () => {
  const [dateTime, setDateTime] = useState({
    time: new Date().toLocaleTimeString(),
    date: new Date().toDateString(),
  });

  useEffect(() => {
    const updateDateTime = () => {
      const newDate = new Date();
      const newTime = newDate.toLocaleTimeString();
      const newDateString = newDate.toDateString();

      setDateTime((prev) => {
        if (prev.time !== newTime || prev.date !== newDateString) {
          return { time: newTime, date: newDateString };
        }
        return prev;
      });
    };

    const intervalId = setInterval(updateDateTime, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return dateTime;
};

export default useDateTime;