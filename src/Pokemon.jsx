import { useState, useEffect } from "react";
import React from "react";
import "./App.css";

export const Pokemon = () => {
  const [pokemon, setPokemon] = useState([]);
  const [loding, setLoding] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] =useState("");

  const API = "https://pokeapi.co/api/v2/pokemon?limit=100&offset=0";

  const apiData = async () => {
    try {
      const res = await fetch(API);
      const data = await res.json();

      const datailedPokemondata = data.results.map(async (curr) => {
        const res = await fetch(curr.url);
        const data = await res.json();
        return data;
      });

      const responseData = await Promise.all(datailedPokemondata);
      console.log(responseData);
      setPokemon(responseData);
      setLoding(false);
    } catch (error) {
      console.log(error);
      setLoding(false);
      setError(error);
    }
  };

  useEffect(() => {
    apiData();
  }, []);

  const searchData = pokemon.filter((currPokrmon) => currPokrmon.name.toLowerCase().includes(search.toLowerCase()) )

  if (loding) {
    return (
      <div>
        <h1>Loding....</h1>
      </div>
    );
  }

  if (error) {
    return <div>{error.message}</div>;
  }

  return (
    <>
      <section>
        <header>
          <h1>Know Some About Data of Pokemon </h1>
        </header>
        <input
          type="text"
          className="inputfield"
          placeholder="Search Pokeman Name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="card-section">
          <ul>
            {searchData.map((curr) => {
              return (
                <li key={curr.id}>
                  <figure>
                    <img
                      src={curr.sprites.other.dream_world.front_default}
                      alt="pokeman-img"
                    />
                  </figure>
                  <h2>{curr.name}</h2>
                  <div className="spaciality">
                    <h3>
                      {curr.types.map((inner) => inner.type.name)
                      .join(", ")}
                    </h3>
                  </div>
                  <div className="detals">
                    <p>Height: {curr.height}</p>
                    <p>Weight: {curr.weight}</p>
                    <p>Speed : {curr.stats[5].base_stat}</p>
                  </div>
                  <div className="second-info">
                    <p>Experience: {curr.base_experience}</p>
                    <p>Attack: {curr.stats[1].base_stat}</p>
                    <span>Abilities</span>
                    <p>
                      {curr.abilities
                        .map((abilityInfo) => abilityInfo.ability.name)
                        .slice(0, 4)
                        .join(", ")}
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </section>
    </>
  );
};
