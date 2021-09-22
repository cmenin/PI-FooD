
"{ [ ( ] ) }"

function bracket(string){
    const diccionario={
        "{" : "}",
        "(" : ")",
        "[" : "]"
    }

    const verificar = [];
  for(var i =0; i < string.length; i++){
    if(diccionario[string[i]]){
        verificar.push(string[i])
    }
    else if(diccionario[verificar.pop()] !== string[i]){
            return false
        
    }
}

return !verificar.length
  } 

console.log(bracket( "{ [ ] ( ) }"))