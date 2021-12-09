import React from "react";
import {Link} from "react-router-dom"
import './card.css'
import foto from '../../src/foto.png'



export default function Card({title, image,diets, score, id}){
    console.log('diets---------',title, diets)
    return(
        
        <div className="container">
            <Link to={`/recipe/${id}`}>
            <div>
            <img className="img" src={image? image: foto  } alt="not found" width="200xp" height="250xp" />
    
            <h3 className='h3title'>{title}</h3>
            
            <h5 className='h5score'>{score}</h5>
            {
            Array.isArray(diets) ? diets.map(d=> d.title? <h5 className="diets">{d.title}</h5> :<h5 className="diets">{d} </h5>) : <h1>no hay dieta</h1>
               }
            </div>
        
            </Link>
            </div>
            
        
        
    )
}