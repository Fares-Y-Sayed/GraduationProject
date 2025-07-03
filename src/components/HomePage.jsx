import { useNavigate } from 'react-router-dom';
import Typewriter from "./Typewriter";

function HomePage() {
  const navigate = useNavigate();

  const navigateToProject = () => {
    navigate('/project');
  };

  return (
    <div className="home-page" style={{ position: 'relative', width: '100vw', height: '100vh', minHeight: '100vh', minWidth: '100vw', overflow: 'hidden' }}>
      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          objectFit: 'cover',
          zIndex: 0,
        }}
        src="/istockphoto-1433421492-640_adpp_is.mp4"
      />
      {/* Overlay */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        background: 'rgba(36, 36, 36, 0.95) ',
        zIndex: 1,
        pointerEvents: 'none',
      }} />
      {/* Content */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 2,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white',
        textAlign: 'center',
      }}>
        <h1 className="typewriter-text"><Typewriter text="Welcome to our project!" speed={50} /></h1>
        {/* <p>This is a brief introduction to our project.</p> */}
        <button
          onClick={navigateToProject}
          className="test-button"
          style={{
            width: "300px",
            marginTop: "20px"
          }}
        >
          Go to Project
        </button>
      </div>
    </div>
  );
}

export default HomePage;