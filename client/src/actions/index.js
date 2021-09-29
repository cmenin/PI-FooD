import axios from 'axios';

export function getRecipes(){
    return async function(dispatch){
        var json = await axios.get('http://localhost:3001/recipe');
        return dispatch ({
            type: 'GET_RECIPES',
            payload: json.data
        })
    }
}

export function getByName(name){
    return async function(dispatch){
        try{
            var json = await axios.get('http://localhost:3001/recipe?name=' +  name)
            console.log(json.data,"NOSE QUE HAY EN EL ACTION")
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
        const {data} = await axios.get('http://localhost:3001/dieta')
        return dispatch({
            type: 'GET_DIETAS',
            payload: data
        })
    }
}

export function getFilterDiets(payload){
    return{
        type: 'FILTER_BY_DIETS',
        payload
    }
}

export function filterApiCreados(payload){
    return{   
        type: 'FILTER_API_CREATED',
        payload
    }
}

export function orderByName(payload){
    return{
        type: 'ORDER_BY_NAME',
        payload
    }
}

export function orderByspoonacularScore(payload){
    return {
        type: "ORDER_BY_SCORE",
        payload
    }
}

export function getDetails(id){
    return async function (dispatch){
        try{
            var json = await axios.get("http://localhost:3001/recipe/"+id)
            return dispatch ({
                type: "GET_DETAIL",
                payload: json.data 
            })
        }
        catch(error){
            alert("RECIPE NOT FOUND")
        }
    }
}

export function postRecipe(payload){
    return async function(dispatch){
        const response = await axios.post("http://localhost:3001/recipe/", payload)
    return response
    }
}