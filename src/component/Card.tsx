interface CardInterface {
  header: string;
  details: string;
}

function Card({ details, header }: CardInterface) {
  return (
    <div className=' mb-5 mx-2 font-extrabold px-4 py-2 h-30 w-10 rounded-lg bg-green-800 text-clip box-border overflow-hidden '>
      <h3 className='p-2 mb-2 font-medium text-sm text-white '> {header}</h3>
      <p className='text-white text-sm'>{details}</p>
    </div>
  );
}

export default Card;
