import { JSXElementConstructor } from "react";
interface CardInterface {
  header: string;
  tagline: string;
  size: number;
  color: string;
  value: string | number;
  unit: string;
  status: "NORMAL" | "WARNING" | "ABNORMAL";
  Icon: JSXElementConstructor<{
    size: number;
    color: string;
    className: string;
  }>;
}

function Card({
  size,
  color,
  tagline,
  header,
  value,
  unit,
  status,
  Icon = () => null,
}: CardInterface) {
  let backgroundColor = "";
  if (status === "NORMAL") backgroundColor = "bg-green-700";
  if (status === "WARNING" && value !== 0) backgroundColor = "bg-yellow-600";
  if (status === "ABNORMAL" && value !== 0) backgroundColor = "bg-red-800";
  return (
    <div
      className={` mx-2 my-4 font-extrabold px-3 py-4 h-fit rounded-lg ${backgroundColor} box-border overflow-hidden md:w-[300px] w-full `}
    >
      <div className='flex justify-between items-start'>
        <h3 className='mb-2 font-medium text-[10px] text-sm text-white '>
          {header}
        </h3>
        <p
          style={{ letterSpacing: "2px" }}
          className='border-2 border-white text-white rounded-2xl px-1 py-[3px] text-[8px] font-mono'
        >
          {value === 0 ? " NO READING YET" : status}
        </p>
      </div>
      <div className='flex items-center justify-start '>
        <Icon className='mb-3 mr-4 mt-2' color={color} size={size} />
        <p className='text-2xl font-thin text-white'>
          {value} {unit}
        </p>
      </div>
      <p className='text-white text-sm'>{tagline}</p>
    </div>
  );
}

export default Card;
