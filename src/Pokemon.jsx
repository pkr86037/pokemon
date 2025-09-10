import { useState, useEffect } from "react";
import "./App.css"

export const Pokemon = () => {
  const [pokemon, setPokemon] = useState([]);
  const [search, setSearch] = useState("");
  const [loding, setLoding] = useState(true);
  const [error, seterror] = useState(null);

  const API = "https://pokeapi.co/api/v2/pokemon?limit=100&offset=0";
  const fristApiData = async () => {
    try {
      const res = await fetch(API);
      const data = await res.json();

      const secondApiData = data.results.map(async (curr) => {
        const res = await fetch(curr.url);
        const data = await res.json();
        return data;
      });
      const responseData = await Promise.all(secondApiData);
      setPokemon(responseData);
      setLoding(false);
    } catch (error) {
      console.log(error);
      seterror(error);
    }
  };

  const searchData = pokemon.filter((currPokrmon) =>
    currPokrmon.name.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    fristApiData();
  }, []);

  if (loding) {
    return (
      <div>
        <h1>Loding.....</h1>
      </div>
    );
  }
  if (error) {
    return (
      <div>
        <h1>{error.message}</h1>
      </div>
    );
  }

  return (
    <>
      <h1>Makeing API Pokemon Project Demo</h1>
      <section>
        <header>
          <h1>Pokemon Api fetch data</h1>
        </header>
        <input
          type="text"
          placeholder="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <ul>
          {searchData.length === 0 && <h2>Data Not Found</h2>}
          {searchData.map((data) => {
            return (
              <li key={data.id}>
                <section>
                  <div className="img">
                    <figure>
                      <img
                        src={data.sprites.other.dream_world.front_default}
                        alt=""
                      />
                    </figure>
                    <div className="name">
                      <h2>{data.name}</h2>
                    </div>
                    <div className="type">
                      <p>{data.types.map((pen) => pen.type.name).join(", ")}</p>
                    </div>
                    <div className="childOne">
                      <div className="childName">
                        <p>
                          Height - <span>{data.height}</span>
                        </p>
                      </div>
                      <div className="childName">
                        <p>
                          Weight - <span>{data.weight}</span>
                        </p>
                      </div>
                      <div className="childName">
                        <p>
                          Speed - <span>{data.stats[5].base_stat}</span>
                        </p>
                      </div>
                    </div>
                    <div className="childTwo">
                      <div className="secondChild">
                        <p>
                          Experience - <span>{data.base_experience}</span>
                        </p>
                      </div>
                    </div>
                    <div className="secondChild">
                      <p>
                        Attack - <span>{data.stats[1].base_stat}</span>
                      </p>
                    </div>
                    <div className="secondChild">
                      <p>
                        Abilites -{" "}
                        <span>
                          {data.abilities
                            .map((paper) => paper.ability.name)
                            .join(", ")}
                        </span>
                      </p>
                    </div>
                  </div>
                </section>
              </li>
            );
          })}
        </ul>
      </section>
    </>
  );
};

