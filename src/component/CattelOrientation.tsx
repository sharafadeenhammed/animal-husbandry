import { useEffect, useState } from "react";
import calculateRotation from "../helpers/orientation";

type CattelOrientationType = {
  x: number;
  y: number;
  z: number;
};

// component

// const a = new THREE.Euler(0, 1, 1.57, "XYZ");
// const b = new THREE.Vector3(1, 0, 1);
function CattelOrientation({ x, y, z }: CattelOrientationType) {
  const [pitch, setPitch] = useState(0);
  const [rool, setRool] = useState(0);
  useEffect(() => {
    // a.set(x, y, z);
    // b.applyEuler(a);
    // b.applyEuler(a);
    // const orientate = document.getElementById("orientate");
    const result = calculateRotation(x, y, z);
    // const result = calculateRotation(0.2, 0.6, 0.9);
    console.log("x, y, z :", x, y, z);
    console.log("pitch rool :", result);
    setPitch(result.pitch);
    setRool(result.roll);
  }, [x, y, z]);
  return (
    <>
      <div>
        <h2 className='text-center font-thin text-2xl mb-7'>Orientation</h2>
        <p className='text-sm font-bold'>
          Pitch: {pitch ? pitch.toFixed(2) + "deg" : "--"}
        </p>
        <p className='text-sm font-bold'>
          Roll: {rool ? rool.toFixed() + "deg" : "--"}
        </p>
      </div>
      {/* <h2 className='my-2'>Orientation</h2> */}
      <div
        style={{
          WebkitTransformStyle: "preserve-3d",
          transformStyle: "preserve-3d",
          transform: `rotateX(${rool}deg) rotateY(${pitch}deg)`,
          WebkitTransform: `rotateX(${rool}deg) rotateY(${pitch}deg)`,
        }}
        id='orientate'
        className=' py-20 transition-all flex item-center justify-center'
      >
        <div className='bg-slate-600 h-14 w-[250px]'></div>
        {/* <FaCow className='text-slate-700' size={150} /> */}
      </div>
    </>
  );
}

export default CattelOrientation;
