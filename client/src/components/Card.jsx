import React from "react";

export default function Card({name, image,diets}){
    return(
        <div>
            <h3>{name}</h3>
            <img src={image} alt= "img not found" width="200xp" height="250xp" />
            <h5>{diets}</h5>
        </div>
    )
}