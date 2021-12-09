import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDiets, getRecipes, postRecipe } from "../actions";
import { Link, useHistory } from "react-router-dom";


export default function CreateRecipe(params){

    const dispatch = useDispatch();
    const allDietas = useSelector(state => state.diet);
    const [form, setForm] = useState({  diet:[], });

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
          diet: [...form.diet, e.target.value],
        });
      }

    function handleSubmit(e){
      e.preventDefault()
        dispatch(postRecipe(form));
        console.log(form)
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
        <label className="labelname" htmlFor="title">Title:
            <input
              type="text"
              id="title"
              name="title"
              value={form.title}
              onChange={handleChange}
              required 
            />
            </label>

        <label htmlFor="summary">Summary:
            <input
              type="text"
              id="summary"
              name="summary"
              value={form.summary}
              onChange={handleChange}
              required 
            />
            </label>

        <label htmlFor="healthScore">HealthScore:
            <input
              type="number"
              id="healthScore"
              name="healthScore"
              value={form.healthScore}
              onChange={handleChange}
              required 
            />
            </label>

        <label htmlFor="likes">Likes:
        <input 
            type="number"
            id="likes"
            name="likes"
            value={form.likes}
            onChange={handleChange}
            required 
        
        ></input>
        </label>

        <label htmlFor="cookingTime">CookingTime:
            <input
              type="number"
              id="cookingTime"
              name="cookingTime"
              value={form.cookingTime}
              onChange={handleChange}
              required 
            />
            </label>

        <label htmlFor="cuisines">Cuisines:
            <input
              type="text"
              id="cuisines"
              name="cuisines"
              value={form.cuisines}
              onChange={handleChange}
              required 
            />
            </label>

        <label htmlFor="instructions">Instructions:
            <input
              type="text"
              id="instructions"
              name="instructions"
              value={form.instructions}
              onChange={handleChange}
              required 
            />
            </label>

<label htmlFor="diets">Dieta:
         <select id="" defaultValue="" name="diets" onChange={(e) => handleDiets(e)}>
         <option name="diets" value="">
                  Select
                </option>
          { allDietas?.map(el=>
            <option
              type="text"
              id="diets"
              value={el.title}
              
              required > {el.title}
              </option>
              ) }
              </select>
              <ul>
                <li>{form.diet?.map(el=> el +" ")}</li>
              </ul>
              </label>


        <label htmlFor="score">Score:</label>
            <input
              type="number"
              id="score"
              name="score"
              value={form.score}
              onChange={handleChange}
              required 
            />

        <label htmlFor="image">Image:</label>
            <input
              type="text"
              id="image"
              name="image"
              value={form.image}
              onChange={handleChange}
            />

            <button type="submit">CREATE</button>
        </form>
    </div>
</body>
    )

}
