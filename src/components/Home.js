import './Home.css'; // Import the CSS file
import Notes from './Notes';

function Home() {
  return (
    <div className="home-container">
      <h1 className="home-title">My Study Notes</h1>
      <div className="notes-wrapper">
        <Notes />
      </div>
    </div>
  );
}

export default Home;
