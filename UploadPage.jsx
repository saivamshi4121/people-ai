import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const UploadPage = () => {
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = () => setImage(reader.result);
    reader.readAsDataURL(file);
  };

  return (
    <div className="container full-height">
      <h1>people + ai</h1>
      <h2>ConsumeWise</h2>
      <p>Verify how accurate are the claims made on your packaged food products like 'no added sugar', 'gluten-free', etc.</p>
      
      <div className="upload-options">
        <h2>Upload Your Product</h2>
        <input type="file" className="upload-input" onChange={handleFileUpload} />
      </div>
      
      {image && (
        <>
          <h2>Image Preview</h2>
          <img src={image} alt="Uploaded Product" className="preview-image" />
          <button className="btn" onClick={() => navigate('/enter-claim')}>Proceed to Enter Claim</button>
        </>
      )}
      
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

export default UploadPage;
