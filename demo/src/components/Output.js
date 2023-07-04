import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const OutputPage = () => {
  const [generatedImage, setGeneratedImage] = useState(null);
  const location = useLocation();
  const dotcode = location.state?.dotcode || '';

  useEffect(() => {
    // Make the GET request to fetch the generated image when the component mounts
    axios
      .get('http://127.0.0.1:3000/get-generated-image', {
        params: {
          dotcode: dotcode, // Replace with the actual DOT code received from Flask
        },
        responseType: 'arraybuffer', // Tell axios to expect binary data
      })
      .then((imageResponse) => {
        // Convert the received binary data to a base64 string
        const base64Image = btoa(
          new Uint8Array(imageResponse.data).reduce(
            (data, byte) => data + String.fromCharCode(byte),
            ''
          )
        );
        setGeneratedImage('data:image/png;base64,' + base64Image);
      })
      .catch((error) => {
        // Handle errors if the request fails
        console.error('Error getting generated image:', error);
      });
  }, []); // The empty dependency array ensures this effect runs only once when the component mounts

  const sectionStyle = {
    fontSize: '2rem',
    textAlign: 'center',
    padding: '20px',
    border: '2px solid #ffffff',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  };

  const backgroundStyle = {
    backgroundImage: 'url(/3506328.jpg)', // Replace with your actual image file path
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  };

  const flowchartContainerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  };

  const flowchartTitleStyle = {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: '10px',
  };

  const titleContainerStyle = {
    backgroundColor: '#ffffff', // White background for the title
    padding: '20px', // Add padding to the title container
    marginBottom: '50px', // Add some space between the title and section
    border: '2px solid #000000',
  };

  const titleStyle = {
    fontSize: '3rem',
    color: '#000000',
  };

  const handleDownloadFlowchart = () => {
    // Create a dummy link to download the image
    const link = document.createElement('a');
    link.href = generatedImage;
    link.download = 'flowchart.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div style={backgroundStyle}>
      <div style={titleContainerStyle}>
        <h1 style={titleStyle}>Generated Flowchart</h1>
      </div>
      {generatedImage && (
        <div style={flowchartContainerStyle}>
          <img src={generatedImage} alt="Generated Flowchart" />
        </div>
      )}
      <div style={sectionStyle}>
        <button onClick={handleDownloadFlowchart}>Download Flowchart</button>
      </div>
    </div>
  );
};

export default OutputPage;
