import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// eslint-disable-next-line no-unused-vars
import { Link } from "react";
import orderByScore, { filterApiCreados, getDiets, getFilterDiets, getRecipes, orderByName } from "../actions";
import Card from "./Card";
import Paginado from "./Paginado";

export default function Home() {
    const dispatch = useDispatch();
    const allRecipes = useSelector((state) => state.recipes);
    const allDietas = useSelector((state) => state.dietas);
    const [orden, setOrden] = useState(" ");
    const [currentPage, setCurrenPage] = useState(1);
  const [recipesPerPage, setrecipesPerPage] = useState(9);
  const indexOfLastRecipes = currentPage * recipesPerPage;
  const indexOfirstRecipes = indexOfLastRecipes - recipesPerPage;
  const currentRecipes = allRecipes.slice(
    indexOfirstRecipes,
    indexOfLastRecipes
  );
//   console.log('currentRecipes ----------->',currentRecipes)
  const paginado = (pageNumber) => {
    setCurrenPage(pageNumber);
  };

  useEffect(() => {
    dispatch(getRecipes());
    dispatch(getDiets());

  }, [dispatch]);

//   console.log("ACA HAY ALGO?");
  function handleClick(e) {
    e.preventDefault();
    dispatch(getRecipes());
  }

  function handleSort(e) {
      e.preventDefault();
      dispatch(orderByName(e.target.value))
  }

  function handleDiet(e) {
    dispatch(getFilterDiets(e.target.value))
  }
  
  function handleScore(e) {
    e.preventDefault()
    console.log(e.target.value,"EN EL FRONT")
    dispatch(orderByScore(e.target.value))
  }

  function handleCreados(e){
    e.preventDefault()
    dispatch(filterApiCreados(e.target.value))
  }

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
            <option value="asc">AZ</option>
            <option value="desc">ZA</option>
          </select>
          <select onChange={(e) => handleDiet(e)}>
              <option value='all'>All</option>
            {
                    allDietas?.map(d => <option key={d.id} value={d.title}>{d.title}</option>)
                }
          </select>
          <select onChange={e=> handleScore(e)}>
              <option value='asc'>Menor puntuacion</option>
              <option value='desc'>Mayor puntuacion</option>
          </select>
          <select onChange={e=> handleCreados(e)}>
              <option value='all'>Todos</option>
              <option value='api'>Existentes</option>
              <option value='created'>Creados</option>
          </select>
          {/* <select onChange={(e) => {handleFilterDiet(e)}}>
                <option>All</option>
                {
                    diets.map(d => <option>{d}</option>)
                }
            </select>
            <select onChange={(e) => {handleSortName(e)}}>
                <option value='asc'>A-Z</option>
                <option value='desc'>Z-A</option>
            </select>
            <select onChange={(e) => {handleSortScore(e)}}>
                <option value='asc'>Score 0 - 100</option>
            <option value='desc'>Score 100 - 0</option> */}
        </div> 
      </div>
      
      <div>
        <Paginado
          recipesPerPage={recipesPerPage}
          allRecipes={allRecipes.length}
          paginado={paginado}
          currentRecipes
        />
      </div>

      {
        

          currentRecipes?.map(r => {
              return (
                  <fragment>
            <Card
              title={r.title}
              image={r.image ? r.image : r.image}
              diets={r.diets}
              key={r.id}
              score = {r.healthScore}
              />
          </fragment>
        );
      })
      }
    </div>
  );
}
// const apiInfo = await data.results.map((el) => {
//     return {
//       id: el.id,
//       title: el.title,
//       image: el.image,
//       diets: el.diets,
//       summary: el.summary,
//       likes: el.aggregateLikes,
//       score: el.spoonacularScore,
//       healthScore: el.healthScore,
//       cookingTime: el.readyInMinutes,
//       cuisines: el.cuisines,
//       instructions: el.analyzedInstructions.map((el) => el),
//     };
//   });