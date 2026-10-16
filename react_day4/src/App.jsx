// import { useEffect, useState } from "react";
// import "./App.css";
// import FighterPage from "./pages/fighterpage.jsx";

// function App() {
//   const [data, setData] = useState({});
//   const [selectedFighter, setSelectedFighter] = useState(null);
//   const[loading,setLoading]=useState(true);
//   const [error,setError]=useState(true);

//   useEffect(() => {
//     const fetchData = async () => {
//       const res = await fetch("https://api.octagon-api.com/fighters");
//       if(!res.ok){
//         throw new Error("Data can't fetched");
//       }
//       const result = await res.json();
//       setData(result);
      
//       setError(err);
//       const formattedObject={
//         data:array,
//         status:array.length>0?200:400
//       }
      
     
//       setLoading(false);
      
//     };

//     fetchData();
//   }, []);

//   if (selectedFighter) {
//     return (
//       <FighterPage
//         id={selectedFighter}
//         onBack={() => setSelectedFighter(null)}
//       />
//     );
//   }

//   return (
//     loading?<h1 style={{color:"white"}}>Datas are loading.......</h1>:<div className="container">
//      <div  className="header"><h1>MMA FIGHTERS</h1></div>

//       <div className="fighter-grid">
//         {Object.entries(data).map(([id, item]) => (
//           <div className="fighter-card" key={id}>
//             <img src={item.imgUrl} alt={item.name} onClick={() => setSelectedFighter(id)} style={{cursor:"pointer"}}/>
//             <h2>{item.name}</h2>
//             <p>{item.nickname}</p>
//             <p>Wins: {item.wins} | Losses: {item.losses}</p>

//             <button onClick={() => setSelectedFighter(id)}>
//               View Profile   
//             </button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }
// export default App;


import { useEffect, useState } from "react";
import "./App.css";
import FighterPage from "./pages/fighterpage.jsx";

function App() {
  const [data, setData] = useState({});
  const [selectedFighter, setSelectedFighter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [status, setStatus] = useState("Pending");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError("");
        setStatus("Pending");

        const res = await fetch(
          "https://api.octagon-api.com/fighters"
        );

        setStatus(res.status);

        if (!res.ok) {
          throw new Error(
            `Request failed with status ${res.status}`
          );
        }

        const result = await res.json();
        setData(result);
      } catch (err) {
        setError(err.message);

    
        setStatus((prev) =>
          typeof prev === "number" ? prev : "Network Error"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="api-status">
        <h1 style={{color:"white"}}>Data is loading...</h1>
        <p>Status: {status}</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="api-status">
        <h1 className="error">Something went wrong!</h1>
        <p>
          <strong>Status:</strong> {status}
        </p>
        <p>
          <strong>Error:</strong> {error}
        </p>

        <button onClick={() => window.location.reload()}>
          Retry
        </button>
      </div>
    );
  }

  if (Object.keys(data).length === 0) {
    return (
      <div className="api-status">
        <h1>No fighters found</h1>
        <p>Status: {status}</p>
      </div>
    );
  }

  if (selectedFighter) {
    return (
      <FighterPage
        id={selectedFighter}
        onBack={() => setSelectedFighter(null)}
      />
    );
  }
  console.log(status);

  return (
    <div className="container">
      <div className="header">
        <h1>MMA FIGHTERS</h1>
      </div>

      <div className="api-status">
        <p className="success">
          Data fetched successfully!
        </p>
        <p>Status: {status}</p>
      </div>

      <div className="fighter-grid">
        {Object.entries(data).map(([id, item]) => (
          <div className="fighter-card" key={id}>
            <img
              src={item.imgUrl}
              alt={item.name}
              onClick={() => setSelectedFighter(id)}
              style={{ cursor: "pointer" }}
            />

            <h2>{item.name}</h2>
            <p>{item.nickname}</p>
            <p>
              Wins: {item.wins} | Losses: {item.losses}
            </p>

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
