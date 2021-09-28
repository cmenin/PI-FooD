import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDiets, getRecipes, postRecipe } from "../actions";
import { Link, useHistory } from "react-router-dom";

export default function(params){

    const dispatch = useDispatch();
    const allRecipes = useSelector(state => state.crearRecetas);
    const [form, setForm] = useState({  dieta:[], });

    useEffect(() =>{
        dispatch(getDiets())
    },[]);

    function handleSubmit(e){
        dispatch(postRecipe(form));
        alert("Receta creada!");
        setForm({});
        dispatch(getRecipes());
        history.push("/home")

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


       
        </form>
    </div>
</body>
    )

}
