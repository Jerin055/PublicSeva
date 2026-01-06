export function mapAISeverity(label) {
  const map = {
    LOW: 10,
    MEDIUM: 25,
    HIGH: 40,
    CRITICAL: 55
  };
  return map[label] || 15;
}
