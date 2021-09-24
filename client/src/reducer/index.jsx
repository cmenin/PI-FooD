const initialState = {
    recipes: [],
    allRecipes: [],
    dietas: []
}

function rootReducer(state = initialState, action){
    switch(action.type){
        case 'GET_RECIPES':
            console.log("EL PAYLOAD EN EL REDUCER => ",action.payload)
            
        return{
            ...state,
            recipes: action.payload,
            allRecipes: action.payload
        }

    case 'GET_NAME_RECIPES':
        return{
            ...state,
            recipes: action.payload
        }  
    case 'GET_DIETAS':
        return{
            ...state,
            dietas: action.payload
        }    

    case 'FILTER_BY_DIETS':
        return{

        }    
        default:
            return state
}
}

export default rootReducer;