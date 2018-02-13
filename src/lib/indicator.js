const determineThreatLevel = (events) => {
  const points = events.reduce((count, event) => count + event.points, 0);
  return points / 6.7;
};

export { determineThreatLevel };
