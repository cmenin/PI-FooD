const { Router, application } = require('express');
const axios = require ("axios");
const {Recipe, Dieta} = require("../db")
const {API_KEY} = process.env
// import API_KEY from "../../.env"
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

const getApi = async() =>{
    const {data} = await axios.get("https://api.spoonacular.com/recipes/complexSearch?apiKey=125acf81d2d24072b4ed356d8741e081&number=100&addRecipeInformation=true")
    const apiInfo = await data.results.map(
        el=>{
            return{
                id: el.id,
                name: el.title,
                image: el.image,
                diets: el.diets,
                summary: el.summary,
                aggregateLikes: el.aggregateLikes,
                healthScore: el.healthScore,
                instructions: el.analyzedInstructions.map(el=>el)
            }
        }
    )
    return apiInfo
}


const getDb = async() =>{
    return await Recipe.findAll({
        incluide:{
            model: Dieta,
            attributes:['name'],
            through:{
                attributes:[],
            }
        }
    })
}

const getAll = async () =>{
    const apiInfo = await getApi();
    const dbInfo = await getDb();
    const infoTotal = apiInfo.concat(dbInfo);
    return infoTotal
}



router.get('/recipe', async(req,res) =>{
    const {name} = req.query;
    let recipeTotal = await getAll();
    if(name){
        let recipename = await recipeTotal.filter(el=> el.name.toLowerCase().incluides(name.toLocaleLowerCase()))
        recipename.length?
        res.status(200).send(recipename):
        res.status(404).send('no existe receta')
    } else{
        res.status(200).send(recipeTotal)
    }
})

router.get('/dieta', async(req,res)=>{
    
    const dietaApi= await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&number=100&addRecipeInformation=true`)
    const dieta = dietaApi.data.results.map(el=> el.Dieta)
    const dietaEach = dieta.map(el=>{
        for(var i = 0; i < el.length;i++)return el(i)
    })
    dietaEach.forEach(el => {
        Dieta.findOrCreate({
            where:{name:el}
        })  
    });
    const allDieta = await Dieta.findAll();
    res.send(allDieta)
})

const getDiets = async (req, res) => {
   
    try {
        const getDiet = await Dieta.findAll();
        if(getDiet.length){
            return res.status(200).json(getDiet) ;
        } else {
            try{
                await Dieta.bulkCreate([
                    { name: "Gluten Free" },
                    { name: "Ketogenic" },
                    { name: "Vegetarian" },
                    { name: "Lacto-Vegetarian" },
                    { name: "Ovo-Vegetarian" },
                    { name: "Vegan" },
                    { name: "Pescetarian" },
                    { name: "Primal" },
                    { name: "Whole30" }
                ]);
            }catch (err) {
                console.error(err);
            }
            const getDiet = await Dieta.findAll();
            return  res.status(200).json(getDiet);
        }
    } catch (err) {
        console.error(err);
    }
}

router.post('/recipe', async(req,res)=>{
let{ name, image, diets, summary, aggregateLikes, healthScore, dieta, instructions, createdInDb} = req.body
try{
        // if(name && summary){
        let recipeCreate = await Recipe.create({
            name, image: image==='' ? undefined : image, diets, summary, aggregateLikes, healthScore, instructions, createdInDb})

        const dietaDb = await Dieta.findAll({
            where:{name:dieta}
        })
        
        await recipeCreate.addDieta(dietaDb)
        res.send('Receta creada con exito')
        // console.log(dietaDb,'dfgdgdfgdfgdg')
        // }
    }
catch(error){
    console.log(error)
    res.status(404).send(error)
}
})

router.get('/recipe/:id', async(req,res)=>{
    const {id} = req.params;
    const recipeTotal = await getAll()
    if(id){
        let recipeId = await recipeTotal.filter(el=>el.id == id);
        recipeId.length?
        res.status(200).json(recipeId) :
        res.status(404).send('no se encontró receta')
    }
})





module.exports = router;
