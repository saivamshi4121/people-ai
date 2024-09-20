import React from 'react';
import { useLocation } from 'react-router-dom';

const ResultPage = () => {
  const location = useLocation();
  const { claim } = location.state || { claim: 'N/A' };

  const containerStyle = {
    width: '100%',
    maxWidth: '450px',
    minHeight: '80vh', // Adjust as needed
    padding: '20px',
    backgroundColor: '#cfecf7',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
    color: 'green',
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between', // Ensure disclaimer sticks at the bottom
  };

  const headingStyle = {
    fontSize: '24px',
    margin: '20px 0',
  };

  const subHeadingStyle = {
    fontSize: '20px',
    margin: '10px 0',
  };

  const verdictStyle = {
    margin: '20px 0',
  };

  const buttonStyle = {
    margin: '10px',
    padding: '10px 20px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  };

  return (
    <div style={containerStyle}>
      <h1 style={headingStyle}>People + ai</h1>
      <h2 style={subHeadingStyle}>Result for: {claim}</h2>
      <div style={verdictStyle}>
        <h3>VERDICT</h3>
        <p>Yes, this product is {claim}.</p>
        <button style={buttonStyle}>WHY</button>
        <button style={buttonStyle}>MORE INFORMATION</button>
      </div>
    </div>
  );
};

export default ResultPage;
