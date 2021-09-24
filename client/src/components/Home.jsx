import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// eslint-disable-next-line no-unused-vars
import { Link } from "react";
import { getRecipes } from "../actions";
import Card from "./Card";
import Paginado from "./Paginado";

export default function Home() {
    const dispatch = useDispatch();
    const allRecipes = useSelector((state) => state.recipes);
    const [orden, setOrden] = useState(" ");
    const [currentPage, setCurrenPage] = useState(1);
  const [recipesPerPage, setrecipesPerPage] = useState(9);
  const indexOfLastRecipes = currentPage * recipesPerPage;
  const indexOfirstRecipes = indexOfLastRecipes - recipesPerPage;
  const currentRecipes = allRecipes.slice(
    indexOfirstRecipes,
    indexOfirstRecipes
  );

  const paginado = (pageNumber) => {
    setCurrenPage(pageNumber);
  };

  useEffect(() => {
    dispatch(getRecipes());
  }, [dispatch]);

  console.log("ACA HAY ALGO?");
  function handleClick(e) {
    e.preventDefault();
    dispatch(getRecipes());
  }

  function handleSort(e) {}

  return (
    <div>
      <div>
        <h1>Henry's Food</h1>
        <button
          onClick={(e) => {
            handleClick(e);
          }}
        >
          Volver a cargar recetas
        </button>
      </div>

      <div>
        <div>
          <select onChange={(e) => handleSort(e)}>
            <option value="asc">Ascendente</option>
            <option value="desc">Descendente</option>
          </select>
          <select>
              <option value='all'>All</option>
              <option value='created'>Created</option>
              <option value='existing'>Existing</option>
          </select>
        </div>
      </div>
      
      <div>
        <Paginado
          recipesPerPage={recipesPerPage}
          allRecipes={allRecipes.length}
          paginado={paginado}
        />
      </div>

      {
          currentRecipes?.map(r => {
              console.log('currentRecipes ----------->',currentRecipes)
              return (
                  <fragment>
            <Card
              name={r.name}
              image={r.image ? r.image : r.image}
              diets={r.diets}
              key={r.id}
              />
          </fragment>
        );
      })}
    </div>
  );
}
