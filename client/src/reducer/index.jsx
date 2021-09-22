const initialState = {
    recipes: [],
    allRecipes: [],
    dietas: []
}

function rootReducer(state = initialState, action){
switch(action.type){
    case 'GET_RECIPES':
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
        default:
            return state
}
}

export default rootReducer