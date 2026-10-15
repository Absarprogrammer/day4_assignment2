import { useEffect, useState } from "react";

export default function FighterPage({ id, onBack }) {
  const [fighter, setFighter] = useState(null);

  useEffect(() => {
    const fetchFighter = async () => {
      const res = await fetch("https://api.octagon-api.com/fighters");
      const result = await res.json();
      setFighter(result[id]);
    };

    fetchFighter();
  }, [id]);

  if (!fighter) {
    return <h2>Loading fighter...</h2>;
  }

  return (
    <div className="profile-container">
      <button onClick={onBack}> Back to Fighters</button>

      <div className="profile-card">
        <img src={fighter.imgUrl} alt={fighter.name} width="250" />

        <div>
          <h1>{fighter.name}</h1>
          <h3>{fighter.nickname}</h3>
          <p>Division: {fighter.category}</p>
          <p>Height: {fighter.height}</p>
          <p>Weight: {fighter.weight}</p>
          <p>Wins: {fighter.wins}</p>
          <p>Losses: {fighter.losses}</p>
          <p>Draws: {fighter.draws}</p>
          <p>Status: {fighter.status}</p>
          <p>PlaceOfBirth: {fighter.placeOfBirth}</p>
          <p>FightingStyle: {fighter.fightingStyle}</p>
        </div>
      </div>
    </div>
  );
}