import { ReadingDataType, ReadingEvalutedType } from "../type";


// evaluate heart rate
export const heartRate = (data: ReadingDataType): ReadingEvalutedType => {

  // normal level 
  if (data.heartRate >= 48 && data.heartRate <= 84.5)
    return {
      status: "NORMAL",
      text: "Heat Rate reading at normal levels"
    }
  // high level
  if (data.heartRate > 90)
    return {
      status: "HIGH",
      text: "Heart rate readings at high levels"
    }

  // low level
  if (data.heartRate > 35 && data.heartRate < 40)
    return {
      status: "LOW",
      text: "Heart Rate reading at low levels"
    }

  // abnormal
  return {
    status: "ABNORMAL",
    text: data.heartRate === 0 ? "Heart Rate reading" : "Heart Rate reading is not normal, readings abnormal"
  }

}


// evaluate body temperature
export const bodyTemperature = (data: ReadingDataType): ReadingEvalutedType => {
  // normal range 
  if (data.bodyTemperature >= 38.0 && data.bodyTemperature <= 39.3)
    return {
      status: "NORMAL",
      text: "Body temperature normal"
    }

  // high range
  if (data.bodyTemperature > 39.5)
    return {
      status: "HIGH",
      text: "Body temperature high"
    }

  // low range
  if (data.bodyTemperature > 20.0 && data.bodyTemperature < 37.5)
    return {
      status: "LOW",
      text: "Body Temperature is below normal temperature"
    }

  // low range
  if (data.bodyTemperature > 15.0 && data.bodyTemperature < 20 && data.bodyTemperature !== 0)
    return {
      status: "LOW",
      text: "Body Temperature dropped too low to normal body temperature"
    }

  // abnormal
  return {
    status: "ABNORMAL",
    text: data.bodyTemperature === 0 ? "Heart Rate reading " : "Body temperature reaading seem to be off (abnormal level)"
  }
}


// evaluate ambient temperature
export const ambientTemperature = (data: ReadingDataType): ReadingEvalutedType => {

  // normal range 
  if (data.ambientTemperature >= 10.0 && data.ambientTemperature <= 40.0)
    return {
      status: "NORMAL",
      text: "Ambient temperature at normal level"
    }

  // high range
  if (data.ambientTemperature > 40)
    return {
      status: "HIGH",
      text: "Ambient temperature too high, cattle may be experiencing heat stress"
    }

  // low range
  if (data.ambientTemperature < 5.0 && data.ambientTemperature !== 0)
    return {
      status: "LOW",
      text: "Ambient Temperature dropped too low, cattle body temprature will be impacted "
    }

  // abnormal
  return {
    status: "ABNORMAL",
    text: data.ambientTemperature === 0 ? "Ambient Temperature reading" : "Ambient Temperature reading is abnormal."
  }
}

// evaluate humidity level
export const humidity = (data: ReadingDataType): ReadingEvalutedType => {

  // normal range 
  if (data.humidity >= 40.0 && data.humidity <= 70.0)
    return {
      status: "NORMAL",
      text: "Humidity reading at normal level"
    }

  // high range
  if (data.humidity > 80)
    return {
      status: "HIGH",
      text: "Humidity level too high, cattle may be experiencing respiratory problems"
    }
  // low range
  if (data.humidity < 30 && data.humidity !== 0)
    return {
      status: "LOW",
      text: "Humdidy dropped too low, cattle at dehydration risk"
    }

  // abnormal
  return {
    status: "ABNORMAL",
    text: data.humidity === 0 ? "Humidity reading " : "Humidity level is abnormal."
  }
}


// evaluate air quality
export const airQuality = (data: ReadingDataType): ReadingEvalutedType => {

  // normal range 
  if (data.airAuality >= 55.0)
    return {
      status: "NORMAL",
      text: "Air quality reading at normal level"
    }

  // low level
  if (data.airAuality < 55)
    return {
      status: "LOW",
      text: "Air Quality level low,"
    }

  // too low level
  if (data.airAuality < 40)
    return {
      status: "ABNORMAL",
      text: "Air Quality level too low, cattle at respiratory and soffocation risk"
    }

  // abnormal
  return {
    status: "ABNORMAL",
    text: data.airAuality === 0 ? "Air Quality reading" : "Air Quality reading abnormal."
  }
}



