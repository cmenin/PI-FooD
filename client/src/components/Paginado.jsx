import React from "react";

export default function Paginado({recipesPerPage,allRecipes,paginado}){
    const pageNumber = [];
    for(var i = 1; i <= Math.ceil(allRecipes/recipesPerPage);i++){
        pageNumber.push(i)
    }
    return(
        <nav>
            <ul>
                {
                
                    pageNumber && pageNumber.map(number=> {
                        <li> 
                            <a onClick={() => paginado(number)}>{number}</a>
                        </li>
                    })
                }
            </ul>
        </nav>
    )
}