import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/Untitled.png'; 

const HomePage = () => {
  const navigate = useNavigate();
  const videoRef = useRef(null); 

  const canvasRef = useRef(null); 
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);

  useEffect(() => {
    
    if (isCameraOn && videoRef.current) {
      startCamera();
    }
  }, [isCameraOn]);
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.onloadedmetadata = () => {
          videoRef.current.play();
        };
      }
      setIsCameraOn(true);
    } catch (error) {
      console.error("Error accessing the camera: ", error);
      alert(`Could not access the camera. Error details: ${error.message}`);
    }
  };

  const captureImage = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      const imageData = canvas.toDataURL('image/png'); 
      setCapturedImage(imageData);
      stopCamera(); 
    }
  };

  const stopCamera = () => {
    const stream = videoRef.current?.srcObject;
    if (stream) {
      const tracks = stream.getTracks();
      tracks.forEach(track => track.stop());
    }
    setIsCameraOn(false);
  };

  return (
    <div className="container">
      <h1>People + ai</h1>
      <div className="logo-container" style={{ textAlign: 'center', margin: '20px 0' }}>
        <img src={logo} alt="Company Logo" style={{ maxWidth: '200px', maxHeight: '100px' }} />
      </div>
      
      <p>Verify how accurate are the claims made on your packaged food products like 'no added sugar', 'gluten-free', etc.</p>
      
      <p>Enter all ingredients listed on the packaging of the product you want to verify</p>

      
      <div className="button-container">
        <button className="btn" onClick={() => setIsCameraOn(true)}>SCAN</button>
        <button className="btn" onClick={() => navigate('/upload')}>+ UPLOAD</button>
        <p>or</p>
        <button className="btn" onClick={() => navigate('/enter-claim')}>Add Manually</button>
      </div>
      
      {isCameraOn && (
        <div className="camera-section" style={{ textAlign: 'center' }}>
          <video 
            ref={videoRef} 
            autoPlay 
            playsInline 
            style={{ 
              width: '100%', 
              maxWidth: '600px', 
              height: 'auto', 
              objectFit: 'cover',
              marginTop: '20px' 
            }} 
          />
          <button className="btn" onClick={captureImage} style={{ marginTop: '10px' }}>Capture Image</button>
        </div>
      )}

      {capturedImage && (
        <div>
          <h3>Captured Image:</h3>
          <img 
            src={capturedImage} 
            alt="Captured" 
            style={{ width: '90%', maxWidth: '900px', marginTop: '20px' }} 
          />
          <button 
            className="btn" 
            onClick={() => navigate('/enter-claim')} 
            style={{ marginTop: '20px' }}
          >
            Proceed to Enter the Claim
          </button>
        </div>
      )}

      <canvas ref={canvasRef} style={{ display: 'none' }} />

      <div className="disclaimer">
        <p>Disclaimer

The solution provided herein is a prototype in the research phase, intended for informational and testing purposes only. We make no warranties, express or implied, regarding the completeness, accuracy, reliability, suitability, or availability of the prototype or the information it provides. Any reliance you place on such information is strictly at your own risk.
The information provided through this prototype may include data from third parties, which have not been independently verified. The inclusion of such information does not imply endorsement or accuracy. All statements are intended as fair commentary based on data available in the public domain at the time of research and are not intended to harm, disadvantage, or negatively impact any individual, organization, or product.
This prototype is developed as part of a fellowship program offered by EkStep Foundation through its People+ai initiative. EkStep Foundation disclaims all liability for any loss or damage arising from the use of this prototype. By using this prototype, you acknowledge and agree to these terms and release us from any and all related liability.
For queries, please contact us at sonika@peopleplus.ai</p>
      </div>
    </div>
  );
};

export default HomePage;
