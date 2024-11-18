import React, { useEffect, useRef, useState } from "react";
import ReconnectingWebSocket from "reconnecting-websocket";

export default function VideoPlayer() {
  const [isConnected, setIsConnected] = useState(false);
  const imgRef = useRef(null);

  useEffect(() => {
    const options = {
      reconnectInterval: 3000, // Reconnect after 3 seconds if disconnected
    };

    const ws = new ReconnectingWebSocket("ws://127.0.0.1:8000/ws/video-stream/", [], options);

    ws.onopen = () => {
      console.log("WebSocket connection established");
      setIsConnected(true);
    };

    ws.onmessage = (event) => {
      // Update the image with the received frame
      if (imgRef.current) {
        imgRef.current.src = `data:image/jpeg;base64,${event.data}`;
      }
    };

    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    ws.onclose = () => {
      console.log("WebSocket connection closed");
      setIsConnected(false);
    };

    // Cleanup WebSocket connection on component unmount
    return () => {
      ws.close();
    };
  }, []);

  return (
    <div className="mt-16 md:mt-[100px] px-4 md:px-[100px] w-full md:w-3/4">
      <div className="relative pb-[56.25%] h-0 overflow-hidden">
        {isConnected ? (
          <img
            ref={imgRef}
            alt="Video Stream"
            className="absolute top-0 left-0 w-full h-full object-cover rounded-lg shadow-md"
          />
        ) : (
          <p>Connecting to video stream...</p>
        )}
      </div>
    </div>
  );
}
