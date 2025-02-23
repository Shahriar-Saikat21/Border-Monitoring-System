import { useEffect, useState, useRef } from "react";
import { getStream } from "../api/endpoint";
import notificationSound from "../assets/alert.mp3";

export default function VideoPlayer() {
  const [streamUrl, setStreamUrl] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const buzzerRef = useRef(null);
  const lastAlertRef = useRef("");
  const isPlayingRef = useRef(false);
  const eventSourceRef = useRef(null); // Store SSE connection

  useEffect(() => {
    buzzerRef.current = new Audio(notificationSound);
    buzzerRef.current.loop = true; // 🔥 Keep buzzer looping when needed
    buzzerRef.current.preload = "auto"; // Preload sound for instant play

    // Fetch video stream URL from Django backend
    const fetchStreamUrl = async () => {
      try {
        const response = await getStream();
        setStreamUrl(response.data.URL);
      } catch (error) {
        console.error("Error fetching stream URL:", error);
      }
    };

    fetchStreamUrl();

    // Set up SSE for real-time object detection alerts
    eventSourceRef.current = new EventSource("http://127.0.0.1:8000/stream/events/");

    eventSourceRef.current.onmessage = (event) => {
      const data = JSON.parse(event.data);

      if (data.message !== lastAlertRef.current) {
        setAlertMessage(data.message);
        lastAlertRef.current = data.message;

        if (data.message.includes("Detected")) {
          if (!isPlayingRef.current) {
            buzzerRef.current.play().catch((err) => console.warn("Autoplay prevented:", err));
            isPlayingRef.current = true;
          }
        } else {
          buzzerRef.current.pause();
          buzzerRef.current.currentTime = 0;
          isPlayingRef.current = false;
        }
      }
    };

    eventSourceRef.current.onerror = () => {
      console.error("EventSource failed");
      eventSourceRef.current.close();
    };

    return () => {
      // Cleanup function: stop buzzer & close SSE connection when component unmounts (logout)
      buzzerRef.current.pause();
      buzzerRef.current.currentTime = 0;
      isPlayingRef.current = false;

      if (eventSourceRef.current) {
        eventSourceRef.current.close();
      }
    };
  }, []);

  return (
    <div className="mt-16 md:mt-[100px] px-4 md:px-[100px] w-full md:w-3/4">
      {alertMessage && (
        <div className="p-4 bg-red-500 text-white rounded-md text-center">
          {alertMessage}
        </div>
      )}
      <div className="relative pb-[56.25%] h-0 overflow-hidden">
        {streamUrl ? (
          <img
            src={streamUrl + "?" + new Date().getTime()}
            alt="Video Stream"
            className="w-full max-w-5xl rounded-lg shadow-md"
          />
        ) : (
          <p>Loading video...</p>
        )}
      </div>
    </div>
  );
}
