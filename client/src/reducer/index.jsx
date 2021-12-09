const initialState = {
  recipes: [],
  allRecipes: [],
  diet: [],
  detail:[],
  
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_RECIPES":
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
      return {
        ...state,
        diet: action.payload,
      };
    case "GET_DETAIL":
      return {
        ...state,
        detail: action.payload,
      };

    case "FILTER_BY_DIETS":
      let filDiets = state.allRecipes;
      filDiets = filDiets.filter((d) => d.diets.includes(action.payload));
      return {
        ...state,
        recipes: action.payload === "all" ? state.allRecipes : filDiets,
      };

    case "ORDER_BY_NAME":

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

      if (action.payload === "asc")
        return {
          ...state,
          recipes: [...state.allRecipes].sort(
            (a, b) => (a.spoonacularScore > b.healthspoonacularScore ? 1 : -1) //
          ),
        };
      return {
        ...state,
        recipes: [...state.allRecipes].sort((a, b) =>
          a.spoonacularScore > b.spoonacularScore ? -1 : 1
        ),
      };

    case 'FILTER_API_CREATED':
 let allRep = state.allRecipes;
    let filtrado = action.payload === 'created'? allRep.filter(c => c.createdInDb): allRep.filter(c=> !c.createdInDb) 
    return  action.payload === 'all'? {...state, recipes: allRep}: {...state, recipes: filtrado}

    case "POST_RECIPE":
      return{
        ...state,
      }

    case "RESET_RECIPE":
      return{
        ...state,
        recipes:[]
      }
    

    default:
      return state;
  }
}

export default rootReducer;
