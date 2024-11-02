from flask import Flask,jsonify,Response
from flask_cors import CORS
import cv2


app = Flask(__name__)
CORS(app,origins=['http://localhost:5173','http://127.0.0.1:8000/'],supports_credentials=True)

# Initialize the camera
camera = cv2.VideoCapture(0)  # 0 is the default camera on your laptop

def generate_frames():
    while True:
        success, frame = camera.read()
        if not success:
            break
        else:
            # Resize frame
            frame = cv2.resize(frame, (640, 480))  # Lower resolution
            # Encode frame as JPEG
            ret, buffer = cv2.imencode('.jpg', frame)
            frame = buffer.tobytes()
            
            # Yield frame in byte format
            yield (b'--frame\r\n'
                   b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')


@app.route('/video_feed', methods=['GET'])
def video_feed():
    # Return the response generated from frames
    return Response(generate_frames(), mimetype='multipart/x-mixed-replace; boundary=frame')


if __name__=="__main__":
    app.run(debug=True, host='0.0.0.0', port=5000)