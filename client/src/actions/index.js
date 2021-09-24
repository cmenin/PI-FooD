import axios from 'axios';

export function getRecipes(){
    console.log("ESTAMOS EN LAS ACTIONS")
    return async function(dispatch){
        var json = await axios.get('http://localhost:3001/recipe');
        console.log("ESTE ES EL JSON DEL BACK=> ", json)
        return dispatch ({
            type: 'GET_RECIPES',
            payload: json.data
        })
    }
}

export function getNameDiets(name){
    return async function(dispatch){
        try{
            var json = await axios.get('http://localhost:3001/recipe?name' +  name)
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
        const info = axios.get('http://localhost:3001/dieta',{})
        return dispatch({
            type: 'GET_DIETAS',
            payload: info.data
        })
    }
}

export function getFilterDiets(payload){
    return{
        type: 'FILTER_BY_DIETS',
        payload
    }
}

export function filterCreados(payload){
    return{
        type: 'FILTER_CREATED'
    }
}

export function orderByName(payload){
    return{
        type: 'ORDER_BY_NAME',
        payload
    }
}