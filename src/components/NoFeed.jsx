const NoFeed = ({heading,message,image}) => {
  return (
    <div className="flex flex-col items-center justify-center h-full p-6 text-center">
      <img
        src={image}
        alt="No feed"
        className="w-40 h-40 mb-6 opacity-80 rounded-md"
      />
      <h2 className="text-2xl font-semibold text-gray-700">{heading}</h2>
      <p className="text-gray-500 mt-2">
        {message}
      </p>
    </div>
  );
};

export default NoFeed;