import VideoPlayer from "../components/VideoPlayer"
import Notification from "../components/Notification"

export default function HomePage() {
  return (
    <div>
        <div className="bg-[#F0F0F0] flex md:flex-row flex-col min-h-screen">
          <VideoPlayer/>
          <Notification/>
        </div>    
    </div>
  )
}
