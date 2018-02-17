const determineThreatLevel = (events) => {
  const points = events.reduce((count, event) => count + (event.points || 0), 0);
  const threatLevel = points / (6.7 * 1000000000000);
  return threatLevel > 100 ? 100 : threatLevel;
};

export { determineThreatLevel };
