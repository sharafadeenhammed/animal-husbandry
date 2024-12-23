import { ReadingDataType, EvaluateDiseaseType } from "../type";

// mastitis disease
export const mastitis = (data: ReadingDataType): EvaluateDiseaseType => {
  if (data.heartRate > 90 && data.bodyTemperature >= 39)
    return {
      diseaseDetected: true,
      name: "Mastitis",
      text: "Mastitis disease detected, check cattle health immediately"
    }
  return {
    diseaseDetected: false,
    name: "Mastitis",
    text: "Mastilis disease not deteected"
  }
}

// pneumonia
export const pneumonia = (data: ReadingDataType): EvaluateDiseaseType => {
  if (data.heartRate >= 100 && data.bodyTemperature > 39.5)
    return {
      diseaseDetected: true,
      name: "Pneumonia",
      text: "Pneumonia detected"
    }
  return {
    diseaseDetected: false,
    name: "Pneumonia",
    text: "Pneumonia not detected"
  }
}

// heat stress
export const heatStress = (data: ReadingDataType): EvaluateDiseaseType => {
  if ((data.ambientTemperature >= 35.0 && data.humidity > 75.0) || (data.ambientTemperature >= 35.0 && data.airAuality < 35))
    return {
      diseaseDetected: true,
      name: "Heat Stress",
      text: "Heat stress detected, cattle is under temperature heat stress "
    }

  return {
    diseaseDetected: false,
    text: "no heat stress detected",
    name: "Heat Stress"
  }
}

// ketosis disease
export const ketosis = (data: ReadingDataType): EvaluateDiseaseType => {
  console.log(data.airAuality);
  return {
    diseaseDetected: false,
    name: "Ketosis",
    text: "Ketosis disease not detected"
  }
}

// foot and mouth disease
export const footAndMouth = (data: ReadingDataType): EvaluateDiseaseType => {
  if (data.heartRate > 90 && data.airAuality < 30)
    return {
      diseaseDetected: true,
      name: "Foot and Mouth",
      text: ""
    }
  return {
    diseaseDetected: false,
    name: "Foot and Mouth",
    text: "Foot and Mouth disease not detected"
  }
}

// evaluate acidosis
export const acidosis = (data: ReadingDataType): EvaluateDiseaseType => {
  if (data.heartRate > 90 && data.airAuality < 20)
    return {
      diseaseDetected: true,
      name: "Acidosis",
      text: "Acidosis disease detected"
    }
  return {
    diseaseDetected: false,
    name: "Acidosis",
    text: "Acidosis disease not detected"
  }
}

// // evaluate milkFever
// export const milkFever = (data: ReadingDataType): EvaluateDiseaseType => {

// }


const EvaluateDisease = (data: ReadingDataType): EvaluateDiseaseType[] => {
  const result: EvaluateDiseaseType[] = [];
  result.push(mastitis(data));
  result.push(pneumonia(data));
  result.push(heatStress(data));
  result.push(footAndMouth(data));
  result.push(acidosis(data));

  return result;
}


export default EvaluateDisease;