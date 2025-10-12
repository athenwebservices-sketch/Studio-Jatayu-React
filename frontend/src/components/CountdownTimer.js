import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const TimerContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
`;

const TimeUnit = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: rgba(255, 255, 255, 0.2);
  padding: 0.25rem 0.5rem;
  border-radius: 5px;
  min-width: 30px;
`;

const TimeValue = styled.span`
  font-weight: bold;
  font-size: 1rem;
`;

const TimeLabel = styled.span`
  font-size: 0.7rem;
  opacity: 0.8;
`;

const Separator = styled.span`
  font-weight: bold;
  font-size: 1rem;
`;

const CountdownTimer = () => {
  const targetDate = new Date("2025-10-31T23:59:59").getTime();
  const [timeLeft, setTimeLeft] = useState(getTimeRemaining());

  function getTimeRemaining() {
    const now = new Date().getTime();
    const difference = targetDate - now;

    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60)
    };
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(getTimeRemaining());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (value) => value.toString().padStart(2, '0');

  return (
    <TimerContainer>
      <span>⏰</span>
      <TimeUnit>
        <TimeValue>{formatTime(timeLeft.days)}</TimeValue>
        <TimeLabel>D</TimeLabel>
      </TimeUnit>
      <Separator>:</Separator>
      <TimeUnit>
        <TimeValue>{formatTime(timeLeft.hours)}</TimeValue>
        <TimeLabel>H</TimeLabel>
      </TimeUnit>
      <Separator>:</Separator>
      <TimeUnit>
        <TimeValue>{formatTime(timeLeft.minutes)}</TimeValue>
        <TimeLabel>M</TimeLabel>
      </TimeUnit>
      <Separator>:</Separator>
      <TimeUnit>
        <TimeValue>{formatTime(timeLeft.seconds)}</TimeValue>
        <TimeLabel>S</TimeLabel>
      </TimeUnit>
    </TimerContainer>
  );
};

export default CountdownTimer;
