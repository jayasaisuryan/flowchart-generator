import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const HomePage = () => {
  const [inputText, setInputText] = useState('');
  const [generatedImage, setGeneratedImage] = useState(null);
  const navigate = useNavigate();

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

  const sectionStyle = {
    fontSize: '2rem',
    color: '#ffffff', // Change the section color to white
    textAlign: 'center', // Center the section content
    padding: '20px', // Add padding to the section content
    maxWidth: '600px', // Limit the section width
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Add a transparent black background for the section
    border: '2px solid #ffffff', 
  };

  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };

  const handleGenerateFlowchart = () => {
    const data = {
      prompt: inputText,
    };

    axios
      .post('http://127.0.0.1:3000/generate-flowchart', data)
      .then((response) => {
        console.log('Flowchart generated:', response.data);

        axios
          .get('http://127.0.0.1:3000/get-generated-image', {
            params: {
              dotcode: response.data.dotcode,
            },
            responseType: 'arraybuffer',
          })
          .then((imageResponse) => {
            const base64Image = btoa(
              new Uint8Array(imageResponse.data).reduce(
                (data, byte) => data + String.fromCharCode(byte),
                ''
              )
            );
            setGeneratedImage('data:image/png;base64,' + base64Image);
            // Navigate to OutputPage with dotcode as query parameter
            navigate('/output', { state: { dotcode: response.data.dotcode } });
          })
          .catch((error) => {
            console.error('Error getting generated image:', error);
          });
      })
      .catch((error) => {
        console.error('Error generating flowchart:', error);
      });
  };

  return (
    <div style={backgroundStyle}>
      <div style={titleContainerStyle}>
        <h1 style={titleStyle}>Flowchart Generator Tool</h1>
      </div>
      <div style={sectionStyle}>
        <p>
          Please mention the prompt for generating flowchart
        </p>
        <input
          type="text"
          value={inputText}
          onChange={handleInputChange}
          placeholder="Enter your prompt..."
          style={{ width: '100%', fontSize: '1.2rem', padding: '10px' }}
        />
        <button onClick={handleGenerateFlowchart}>Generate Flowchart</button>
        {generatedImage && <img src={generatedImage} alt="Generated Flowchart" />}
      </div>
    </div>
  );
};

export default HomePage;
