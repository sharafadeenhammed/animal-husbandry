import { useEffect, useState } from "react";
import axios from "axios";
import dayjs from "dayjs";
import { FaHeart, FaWind } from "react-icons/fa";
import Card from "./component/Card";
import {
  FaCloudShowersWater,
  FaCow,
  FaTemperatureHalf,
  FaBriefcaseMedical,
} from "react-icons/fa6";
import relativeTime from "dayjs/plugin/relativeTime";
import CattelOrientation from "./component/CattelOrientation";
import { EvaluateDiseaseType, feedDataType } from "./type";
import { initialState } from "./constants/initials";
import * as analize from "./helpers/readingAnalyzer";
import EvaluateDisease from "./helpers/analizeDiseases";

const formatToReadingsData = (data: feedDataType): typeof initialState => {
  return {
    createdAt: data.created_at,
    entryId: data.entry_id,
    ambientTemperature: parseFloat(data.field1),
    humidity: parseFloat(data.field2),
    heartRate: parseFloat(data.field3),
    bodyTemperature: parseFloat(data.field4),
    airAuality: parseFloat(data.field5),
    zAxis: parseFloat(data.field6),
    xAxis: parseFloat(data.field7),
    yAxis: parseFloat(data.field8),
  };
};
dayjs.extend(relativeTime);
const READ_API_KEY = "CLC2P68LXMZ7KDN4";

// app component..
function App() {
  const [readingsData, setReadingsData] = useState(initialState);
  const [diseases, setDiseases] = useState<EvaluateDiseaseType[]>([]);
  const fetchReadings = async () => {
    try {
      const response = await axios.get(
        ` https://api.thingspeak.com/channels/2769547/feeds.json?api_key=${READ_API_KEY}&results=2`
      );
      const latestReading: feedDataType = response.data.feeds[0];
      setReadingsData(formatToReadingsData(latestReading));
      setDiseases(EvaluateDisease(formatToReadingsData(latestReading)));
    } catch (error) {
      console.log("error fetching readings: ", error);
    }
  };
  useEffect(() => {
    const timer = setInterval(() => fetchReadings(), 3000);
    return () => clearInterval(timer);
    // fetchReadings();
  }, []);

  return (
    <div>
      <div className='sticky top-0 left-0 py-5 px-2 bg-white/[0.95] '>
        <div className='flex items-center justify-between'>
          <h3 className='text-left text-sm font-bold '>
            Cattle Health Monitoring System
          </h3>
          <div className='flex items-center justify-end'>
            <p className='mx-2 text-[12px]'>
              <span className='font-bold'>Entries: </span>{" "}
              {readingsData.entryId}
            </p>
            <p className='mx-2 text-[12px]'>
              <span className='font-bold'> Last Entry Recorded:</span>
              {readingsData.createdAt !== ""
                ? dayjs(readingsData.createdAt).fromNow()
                : " --:--"}
            </p>
          </div>
        </div>
        {/* {diseases.map((disease) => disease.diseaseDetected).includes(true) ? (
          <p className='px-3 mt-2 text-red-700 text-center'>
            Someting is not right please check cattle health immediately
          </p>
        ) : null} */}
      </div>

      <div className='px-4 min-h-screen flex flex-wrap bg-slate-200 py-5'>
        {/* heart rate */}
        <Card
          Icon={FaHeart}
          size={30}
          color='#FFFFFF'
          unit='b/min'
          value={readingsData.heartRate}
          status={analize.heartRate(readingsData).status}
          tagline={analize.heartRate(readingsData).text}
          header='Heart Rate'
        />
        {/* humidity */}
        <Card
          Icon={FaCloudShowersWater}
          size={30}
          color='#FFFFFF'
          unit='%'
          value={readingsData.humidity}
          status={analize.humidity(readingsData).status}
          tagline={analize.humidity(readingsData).text}
          header='Humidity'
        />
        {/* ambient temperature */}
        <Card
          Icon={FaTemperatureHalf}
          size={30}
          color='#FFFFFF'
          unit='°C'
          value={readingsData.ambientTemperature}
          status={analize.ambientTemperature(readingsData).status}
          tagline={analize.ambientTemperature(readingsData).text}
          header='Ambient Temperature'
        />
        {/* ambient temperature */}
        <Card
          Icon={FaWind}
          size={30}
          color='#FFFFFF'
          unit='%'
          value={readingsData.airAuality}
          status={analize.airQuality(readingsData).status}
          tagline={analize.airQuality(readingsData).text}
          header='Air Quality'
        />
        {/* body temperature */}
        <Card
          Icon={FaCow}
          size={30}
          color='#FFFFFF'
          unit='°C'
          value={readingsData.bodyTemperature}
          status={analize.bodyTemperature(readingsData).status}
          tagline={analize.bodyTemperature(readingsData).text}
          header='Body Temperature'
        />

        {/* overall heallth status */}
        <div
          className={` mx-2 my-4 font-extrabold px-3 py-4 h-fit rounded-lg ${
            diseases.map((disease) => disease.diseaseDetected).includes(true)
              ? "bg-red-800"
              : "bg-green-700"
          } box-border overflow-hidden md:w-[300px] w-full `}
        >
          <div className='flex justify-between items-start'>
            <h3 className='mb-2 font-medium text-[10px] text-sm text-white '>
              Overall health status
            </h3>
          </div>
          <div className='flex items-center justify-start '>
            <FaBriefcaseMedical
              className='mb-3 mr-4 mt-2'
              color={"white"}
              size={30}
            />
            {/* <p className='text-2xl font-thin text-white'>
          {value} {unit}
        </p> */}
          </div>
          <p className='text-white text-sm'>
            {diseases.map((disease) => disease.diseaseDetected).includes(true)
              ? "Possible health issues " +
                diseases
                  .filter((disease) => disease.diseaseDetected)
                  .map((item) => item.name)
                  .join(" ,")
              : "No Disesase of illeness detected cattle health okay"}
          </p>
        </div>
      </div>

      {/* cattle orrientation */}
      <div className=' my-7 px-5 py-4'>
        <CattelOrientation
          x={readingsData.xAxis}
          y={readingsData.yAxis}
          z={readingsData.zAxis}
        />
      </div>

      <div>
        {diseases
          .filter((item) => item.diseaseDetected)
          .map((item, index) => {
            return (
              <>
                {index === 0 ? (
                  <h2 className='mt-5 mb-7'>Diseases Detected</h2>
                ) : null}
                <div className='mb-3' key={index.toString()}>
                  <h3> {item.name}</h3>
                  <p> {item.text}</p>
                </div>
              </>
            );
          })}
      </div>
    </div>
  );
}

export default App;
