import axios from 'axios';

export function getRecipes(){
    return async function(dispatch){
        var json = await axios('http://localhost:3001/recipes');

        return dispatch ({
            type: 'GET_RECIPES',
            payload: json.data
        })
    }
}

export function getNameDiets(name){
    return async function(dispatch){
        try{
            var json = await axios('http://localhost:3001/recipes?name' +  name)
            return dispatch({
                type: 'GET_NAME_RECIPES',
                payload: json.data
            })
        } catch(error){
            console.log(error)
        }
    }
}

export function getDiets(){
    return async function(dispatch){
        const info = axios()
    }
}