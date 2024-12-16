function calculateRotation(x: number, y: number, z: number) {
  // Calculate pitch and roll in radians
  const pitch = Math.atan(y / Math.sqrt(x * x + z * z));
  const roll = Math.atan(x / Math.sqrt(y * y + z * z));

  // Convert radians to degrees
  const pitchDegrees = pitch * (180 / Math.PI);
  const rollDegrees = roll * (180 / Math.PI);

  return { pitch: pitchDegrees, roll: rollDegrees };
}

// Example ADXL345 readings
const adxlReading = { x: 0.2, y: 0.6, z: 0.9 };
const rotation = calculateRotation(adxlReading.x, adxlReading.y, adxlReading.z);

console.log(`Pitch: ${rotation.pitch.toFixed(2)}°, Roll: ${rotation.roll.toFixed(2)}°`);

export default calculateRotation;