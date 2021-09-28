import React from "react";
import "./paginado.css"
export default function Paginado({ recipesPerPage, allRecipes, paginado }) {
  const pageNumber = [];
  for (var i = 1; i <= Math.ceil(allRecipes / recipesPerPage); i++) {
    pageNumber.push(i);
  }
  return (
    <nav>
      <ul>
        {pageNumber &&
          pageNumber.map(number => {
              return(
            <li className="number" key={number}>
              <a onClick={() => paginado(number)}>{number}</a>
            </li>
            )
            
          })}
      </ul>
    </nav>
  );
}
