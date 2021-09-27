import axios from 'axios';

export function getRecipes(){
    return async function(dispatch){
        console.log("ESTAMOS EN LAS ACTIONS")
        var json = await axios.get('http://localhost:3001/recipe');
        console.log("ESTE ES EL JSON DEL BACK=> ", json.data)
        return dispatch ({
            type: 'GET_RECIPES',
            payload: json.data
        })
    }
}

export function getByName(name){
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
        const {data} = await axios.get('http://localhost:3001/dieta')
        console.log(data,"INDODATA ACTION")
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
    console.log(payload,"ahora en el ACTION")
    return{
        type: 'ORDER_BY_NAME',
        payload
    }
}

export default function orderByScore(payload){
    console.log(payload,"EN EL ACTION")
    return {
        type: "ORDER_BY_SCORE",
        payload
    }
}
