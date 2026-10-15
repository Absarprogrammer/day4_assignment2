import { useEffect, useState } from "react";
import "./App.css";
import FighterPage from "./pages/fighterpage.jsx";

function App() {
  const [data, setData] = useState({});
  const [selectedFighter, setSelectedFighter] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("https://api.octagon-api.com/fighters");
      const result = await res.json();
      setData(result);
    };

    fetchData();
  }, []);

  if (selectedFighter) {
    return (
      <FighterPage
        id={selectedFighter}
        onBack={() => setSelectedFighter(null)}
      />
    );
  }

  return (
    <div className="container">
     <div  className="header"><h1>MMA FIGHTERS</h1></div>

      <div className="fighter-grid">
        {Object.entries(data).map(([id, item]) => (
          <div className="fighter-card" key={id}>
            <img src={item.imgUrl} alt={item.name} onClick={() => setSelectedFighter(id)} style={{cursor:"pointer"}}/>
            <h2>{item.name}</h2>
            <p>{item.nickname}</p>
            <p>Wins: {item.wins} | Losses: {item.losses}</p>

            <button onClick={() => setSelectedFighter(id)}>
              View Profile   
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
export default App;