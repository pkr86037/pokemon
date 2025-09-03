// import { useState, useEffect } from "react";
// import "./App.css";

// function App() {
//   const [userApiData, setUserApiData] = useState(null);
//   const [loding, setLoding] = useState(true);
//   const [error, setError] = useState(null)

//   const API = "https://pokeapi.co/api/v2/pokemon/squirtle";

//   const fetchData = () => {
//        fetch(API)
//       .then((res) => res.json())
//       .then((data) => {setUserApiData(data); setLoding(false)})
//       .catch((error) => {console.log(error); setError(error); setLoding(false)});
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

// if(loding){
//     return ( 
//     <div>
//       <h1>Loding....</h1>
//     </div>
//   );
// }

//   if(error){
//       return(
//       <div>
//         <h1>{error.message}</h1>
//       </div>
//     )
//   }

//   return (
//     <>
//       <section>
//         <div className="card">
//               <figure>
//                   <img
//                 src={userApiData.sprites.other.dream_world.front_default}
//                 alt={userApiData.name} />
//               </figure>
//          <h1>{userApiData.name}</h1>
//          <div className="">
//           <p className="pokemon-infi">
//             height: <span>{userApiData.height}</span>
//           </p>
//            <p className="pokemon-infi">
//             weight: <span>{userApiData.weight}</span>
//           </p>
//           <p className="pkoemon-info">
//             speed: <span>{userApiData.stats[5].base_stat}</span>
//           </p>
//          </div>
//         </div>
//       </section>
//     </>
//   );
// }

// export default App;

import { Pokemon } from "./Pokemon";
 function App() {
  return(
      <>
      <Pokemon />
      </>
  )
}
export default App;