import React from "react";
import {Link} from "react-router-dom"
import './card.css'

export default function Card({title, image,diets, score, id}){
    return(
        <div className='card-container'>
            <div className= 'card'>
                <div className='front'>
            <Link to={`/recipe/${id}`}>
            <img src={image} alt= "img not found" width="200xp" height="250xp" />
            </Link>
            </div>
            <div className='back'>

            <h5 className='h5score'>{score}</h5>
            <h3 className='h3title'>{title}</h3>
            {
                typeof (diets) === "string" ? diets.map(d=> <h5>{d.diets}</h5> ) :  <h5>{title} </h5>
            }
            </div>
            </div>
        </div>
    )
}