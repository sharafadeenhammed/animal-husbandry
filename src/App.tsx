import { useEffect, useState } from "react";
import axios from "axios";
import dayjs from "dayjs";
import { FaHeart, FaWind } from "react-icons/fa";
import Card from "./component/Card";
import { FaCloudShowersWater, FaCow, FaTemperatureHalf } from "react-icons/fa6";
import relativeTime from "dayjs/plugin/relativeTime";
import * as THREE from "three";
import CattelOrientation from "./component/CattelOrientation";
type feedDataType = {
  created_at: string;
  entry_id: number;
  field1: string;
  field2: string;
  field3: string;
  field4: string;
  field5: string;
  field6: string;
  field7: string;
  field8: string;
};
const initialState = {
  createdAt: "",
  entryId: 0,
  ambientTemperature: 0.0,
  humidity: 0.0,
  heartRate: 0.0,
  bodyTemperature: 0.0,
  airAuality: 0.0,
  zAxis: 0.0,
  xAxis: 0.0,
  yAxis: 0.0,
};

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

const height = 300;
const width = 400;

// app component..
function App() {
  const [readingsData, setReadingsData] = useState(initialState);
  const fetchReadings = async () => {
    try {
      const response = await axios.get(
        ` https://api.thingspeak.com/channels/2769547/feeds.json?api_key=${READ_API_KEY}&results=2`
      );
      const latestReading: feedDataType = response.data.feeds[0];
      setReadingsData(formatToReadingsData(latestReading));
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
      <div className='bg-white/[0.95] flex items-center justify-between sticky top-0 left-0 py-5 px-2'>
        <h3 className='text-left text-sm font-bold '>
          Cattle Health Monitoring System
        </h3>
        <div className='flex items-center justify-end'>
          <p className='mx-2 text-[12px]'>
            <span className='font-bold'>Entries: </span> {readingsData.entryId}
          </p>
          <p className='mx-2 text-[12px]'>
            <span className='font-bold'> Last Entry Recorded:</span>
            {readingsData.createdAt !== ""
              ? dayjs(readingsData.createdAt).fromNow()
              : " --:--"}
          </p>
        </div>
      </div>
      <div className='px-4 min-h-screen flex flex-wrap bg-slate-200 py-5'>
        {/* heart rate */}
        <Card
          Icon={FaHeart}
          size={30}
          color='#FFFFFF'
          unit='b/min'
          value={readingsData.heartRate}
          status='NORMAL'
          tagline='Heart Rate Reading.'
          header='Heart Rate'
        />
        {/* humidity */}
        <Card
          Icon={FaCloudShowersWater}
          size={30}
          color='#FFFFFF'
          unit='%'
          value={readingsData.humidity}
          status='NORMAL'
          tagline='Humidity Reading.'
          header='Humidity'
        />
        {/* ambient temperature */}
        <Card
          Icon={FaTemperatureHalf}
          size={30}
          color='#FFFFFF'
          unit='°C'
          value={readingsData.ambientTemperature}
          status='NORMAL'
          tagline='Ambient Temperature Reading.'
          header='Ambient Temperature'
        />
        {/* ambient temperature */}
        <Card
          Icon={FaWind}
          size={30}
          color='#FFFFFF'
          unit='%'
          value={readingsData.airAuality}
          status='NORMAL'
          tagline='Air Quality Reading.'
          header='Air Quality'
        />
        {/* body temperature */}
        <Card
          Icon={FaCow}
          size={30}
          color='#FFFFFF'
          unit='°C'
          value={readingsData.bodyTemperature}
          status='NORMAL'
          tagline='Body Temperature Reading.'
          header='Body Temperature'
        />
      </div>

      {/* cattle orrientation */}
      <div className=' my-7 px-5 py-4'>
        <CattelOrientation
          x={readingsData.xAxis}
          y={readingsData.yAxis}
          z={readingsData.zAxis}
        />
      </div>
    </div>
  );
}

export default App;
