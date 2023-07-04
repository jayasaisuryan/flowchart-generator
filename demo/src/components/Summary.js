import React from 'react';
import { Link } from 'react-router-dom';

const SummaryPage = () => {
  const sectionStyle = {
    fontSize: '2rem',
    textAlign: 'center',
    padding: '20px',
    border: '2px solid #ffffff',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  };

  const backgroundStyle = {
    backgroundImage: 'url(/3506328.jpg)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  };

  const titleContainerStyle = {
    backgroundColor: '#ffffff',
    padding: '20px',
    marginBottom: '50px',
    border: '2px solid #000000',
  };

  const titleStyle = {
    fontSize: '3rem',
    color: '#000000',
  };

  return (
    <div style={backgroundStyle}>
      <div style={titleContainerStyle}>
        <h1 style={titleStyle}>Summary Page</h1>
      </div>
      <div style={sectionStyle}>
        <p style={{ fontSize: '1.5rem', color: '#ffffff' }}>Summary content goes here.</p>
      </div>
      <div style={sectionStyle}>
        <Link to="/output">
          <button>Back to Output Page</button>
        </Link>
      </div>
    </div>
  );
};

export default SummaryPage;
