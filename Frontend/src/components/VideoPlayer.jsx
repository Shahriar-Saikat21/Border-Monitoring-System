import ReactPlayer from "react-player";

export default function VideoPlayer() {
  return (
    <div className="mt-16 md:mt-[100px] px-4 md:px-[100px]  w-full md:w-3/4">
      <div className="relative pb-[56.25%] h-0 overflow-hidden">
        <ReactPlayer
          url="https://www.youtube.com/watch?v=Cn4G2lZ_g2I"
          playing
          controls
          width="100%"
          height="100%"
          className="absolute top-0 left-0"
        />
      </div>
    </div>
  );
}