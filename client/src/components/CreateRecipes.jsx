import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDiets, getRecipes, postRecipe } from "../actions";
import { Link, useHistory } from "react-router-dom";


export default function CreateRecipe(params){

    const dispatch = useDispatch();
    const allRecipes = useSelector(state => state.crearRecetas);
    const [form, setForm] = useState({  dieta:[], });

    useEffect(() =>{
        dispatch(getDiets())
    },[]);

    function handleChange(e) {
        setForm({
          ...form,
          [e.target.name]: e.target.value,
        });
      }

      function handleDiets(e) {
        setForm({
          ...form,
          diets: [...form.dietas, e.target.value],
        });
      }

    function handleSubmit(e){
        dispatch(postRecipe(form));
        alert("Receta creada!");
        setForm({});
        dispatch(getRecipes());

    }

    return(
        <body className="bodycreated">
      <Link to="/home">
        <button>HOME</button>
      </Link>
      <div className="divRecipecreate">
        <h1 className="crearrecipe">CREATE YOUR RECIPE</h1>
        <div className="divform"></div>
        <form onSubmit = {e => handleSubmit(e)}>
        <label className="labelname" htmlFor="title">Title:</label>
            <input
              type="text"
              id="title"
              name="title"
              value={form.title}
              onChange={handleChange}
              required //no acepta un campo vacio
            />

        <label htmlFor="summary">Summary:</label>
            <input
              type="text"
              id="summary"
              name="summary"
              value={form.summary}
              onChange={handleChange}
              required //no acepta un campo vacio
            />

        <label htmlFor="healthScore">HealthScore:</label>
            <input
              type="number"
              id="healthScore"
              name="healthScore"
              value={form.healthScore}
              onChange={handleChange}
              required //no acepta un campo vacio
            />

        <label htmlFor="cookingTime">CookingTime:</label>
            <input
              type="number"
              id="cookingTime"
              name="cookingTime"
              value={form.cookingTime}
              onChange={handleChange}
              required //no acepta un campo vacio
            />

        <label htmlFor="cuisines">Cuisines:</label>
            <input
              type="text"
              id="cuisines"
              name="cuisines"
              value={form.cuisines}
              onChange={handleChange}
              required //no acepta un campo vacio
            />

        <label htmlFor="instructions">Instructions:</label>
            <input
              type="text"
              id="instructions"
              name="instructions"
              value={form.instructions}
              onChange={handleChange}
              required //no acepta un campo vacio
            />


        {/* <label htmlFor="diets">Diets:</label>
            <input
              type="text"
              id="diets"
              name="diets"
              value={form.diets}
              onChange={(e) => handleDiets(e)}
              defaultValue=""
              required //no acepta un campo vacio
            />
             <label htmlFor="type">
              Type:
              <select
                onChange={(e) => handleType(e)}
                id="type"
                name="type"
                defaultValue=""
              >
                <option name="type" value="">
                  Select
                </option>
                {allTypes?.map((t) => (
                  <option value={parseInt(t.id)}> {t.name} </option>
                ))}
              </select>
              <ul>
                <li>{form.allTypes?.map((el) => el.name + " - ")}</li>
              </ul>
            </label> */}





        <label htmlFor="score">Score:</label>
            <input
              type="number"
              id="score"
              name="score"
              value={form.score}
              onChange={handleChange}
              required //no acepta un campo vacio
            />

        <label htmlFor="image">Image:</label>
            <input
              type="text"
              id="image"
              name="image"
              value={form.image}
              onChange={handleChange}
              required //no acepta un campo vacio
            />

            <button type="submit">CREATE</button>
        </form>
    </div>
</body>
    )

}
