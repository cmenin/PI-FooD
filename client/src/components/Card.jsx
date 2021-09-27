import React from "react";

export default function Card({title, image,diets, score}){
    return(
        <div>
            <h3>{title}</h3>
            <h5>{score}</h5>
            <img src={image} alt= "img not found" width="200xp" height="250xp" />
            <h5>{diets}</h5>
        </div>
    )
}