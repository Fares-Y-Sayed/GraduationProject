import { useNavigate } from 'react-router-dom';

function HomePage() {
  const navigate = useNavigate();

  const navigateToProject = () => {
    navigate('/project');
  };

  return (
    <div className="home-page">
      <h1>Welcome to Our Project</h1>
      {/* <p>This is a brief introduction to our project.</p> */}
      <button onClick={navigateToProject} className="test-button  "  style={{width: "300px", marginTop:"20px"  }}>
        Go to Project
      </button>
    </div>
  );
}

export default HomePage;