import ReactPlayer from "react-player";

export default function VideoPlayer() {
  return (
    <div className="mt-16 md:mt-[100px] px-4 md:px-[100px]  w-full md:w-3/4">
      <div className="relative pb-[56.25%] h-0 overflow-hidden">
        <img
          src="http://127.0.0.1:8000/stream/streaming/"
          alt="Video Stream"
          className="w-full max-w-5xl rounded-lg shadow-md"
        />
      </div>
    </div>
  );
}