import React from "react";
import {Link} from "react-router-dom"
import './card.css'

export default function Card({title, image,diets, score, id}){
    return(
        
        <div className="container">
            <Link to={`/recipe/${id}`}>
            <div>
            <img className="img" src={image} alt= "img not found" width="200xp" height="250xp" />
    
            <h3 className='h3title'>{title}</h3>
            
            <h5 className='h5score'>{score}</h5>
            {
                typeof (diets) === "string" ? diets.map(d=> <h5 className="diets">{d.diets}</h5> ) :  <h5 className="diets">{title} </h5>
            }
            </div>
        
            </Link>
            </div>
            
        
        
    )
}