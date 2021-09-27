const initialState = {
  recipes: [],
  allRecipes: [],
  dietas: [],
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_RECIPES":
      console.log("las recetas***********", action.payload);
      return {
        ...state,
        recipes: action.payload,
        allRecipes: action.payload,
      };

    case "GET_NAME_RECIPES":
      return {
        ...state,
        recipes: action.payload,
      };

    case "GET_DIETAS":
      console.log("action rdducer***********", action.payload);
      return {
        ...state,
        dietas: action.payload,
      };

    case "FILTER_BY_DIETS":
      let filDiets = state.allRecipes;
      filDiets = filDiets.filter((d) => d.diets.includes(action.payload));
      return {
        ...state,
        recipes: action.payload === "all" ? state.allRecipes : filDiets,
      };

    case "ORDER_BY_NAME":
      console.log(action.payload, "AHORA EN EL REDUCER");
      if (action.payload === "asc")
        return {
          ...state,
          recipes: [...state.allRecipes].sort(
            (a, b) => (a.title > b.title ? 1 : -1) //
          ),
        };
      return {
        ...state,
        recipes: [...state.allRecipes].sort((a, b) =>
          a.title > b.title ? -1 : 1
        ),
      };
    case "ORDER_BY_SCORE":
      console.log(action.payload,"EN EL REDUCER")
      if (action.payload === "asc")
        return {
          ...state,
          recipes: [...state.allRecipes].sort(
            (a, b) => (a.healthScore > b.healthScore ? 1 : -1) //
          ),
        };
      return {
        ...state,
        recipes: [...state.allRecipes].sort((a, b) =>
          a.healthScore > b.healthScore ? -1 : 1
        ),
      };

    case 'FILTER_API_CREATED':
 let allRep = state.allRecipes;
    let filtrado = action.payload === 'created'? allRep.filter(c => c.createdInDb): allRep.filter(c=> !c.createdInDb) 
    return  action.payload === 'all'? {...state, recipes: allRep}: {...state, recipes: filtrado}

    default:
      return state;
  }
}

export default rootReducer;
