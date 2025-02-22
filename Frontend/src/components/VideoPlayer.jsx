import { useEffect, useState } from "react";
import { getStream } from "../api/endpoint";

export default function VideoPlayer() {
  const [streamUrl, setStreamUrl] = useState("");

  useEffect(() => {
    const fetchStreamUrl = async () => {
      try {
        const response = await getStream();
        setStreamUrl(response.data.URL);
      } catch (error) {
        console.error("Error fetching stream URL:", error);
      }
    };

    fetchStreamUrl();
  }, []);

  return streamUrl ? (
    <div className="mt-16 md:mt-[100px] px-4 md:px-[100px]  w-full md:w-3/4">
      <div className="relative pb-[56.25%] h-0 overflow-hidden">
        {console.log(streamUrl)}
        <img
          src={streamUrl}
          alt="Video Stream"
          className="w-full max-w-5xl rounded-lg shadow-md"
        />
      </div>
    </div>
  ) : (
    <div className="mt-16 md:mt-[100px] px-4 md:px-[100px]  w-full md:w-3/4">
      <div className="relative pb-[56.25%] h-0 overflow-hidden">
        {console.log(1)}
        <p>Loading video...</p>
      </div>
    </div>
  );
}