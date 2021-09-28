import React, {useEffect,useState} from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetails } from "../actions";

export default function Details(props){
    const dispatch = useDispatch()

    useEffect(()=>{
      dispatch(getDetails(props.match.params.id))
    }, [dispatch])

    // useEffect(()=>{
    //     return ()=>{
    //         dispatch(resetRecipe())
    //     }
    // }, [])

    const theRecipe = useSelector(state=> state.detail)
    //LOADING

    return (
        <div>
            <h2>{theRecipe.title}</h2>
            <div>
                <img src={theRecipe.image} alt= "IMG NOT FOUND"></img>
            </div>
            <div>
                <ul>
                    <p>SUMMARY: {theRecipe.summary}</p>
                    <p>DIETS: {theRecipe.diets}</p>
                    <p>COOKING TIME: {theRecipe.cookingTime}</p>
                    <p>HEALTH SCORE {theRecipe.healthScore}</p>
                    <p>SCORE: {theRecipe.score}</p>
                    <p>CUISINES: {theRecipe.cuisines}</p>
                    <p>INSTRUCTIONS: {theRecipe.instructions}</p>
                    <p>LIKES: {theRecipe.likes}</p>
                </ul>
            </div>
            <Link to="/home">
            <button>GO HOME</button>
            </Link>
        </div>
    )

}