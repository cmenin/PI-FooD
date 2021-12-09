const { Router, application } = require("express");
const axios = require("axios");
const { Recipe, Diet } = require("../db");
const { API_KEY } = process.env;
// import API_KEY from "../../.env"
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get("/recipe", async (req, res) => {
  const { name } = req.query;

  const { data } = await axios.get(
    `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&number=10&addRecipeInformation=true`
    
  );
  const rta = data.results;
  const getDb = await Recipe.findAll({
      include: {
        model: Diet,
        attributes: ["title"],
        through: {
          attributes: [],
        },
      },
    });
  const infoTotal = getDb.concat(rta);
  // const infoTotal = getDb;

  if (name) {
    let recipename = infoTotal.filter((el) =>
      el.title.toLowerCase().includes(name.toLocaleLowerCase())
    );
    infoTotal.length
      ? res.status(200).send(recipename)
      : res.status(404).send("no existe receta");
  } else {
    res.status(200).json(infoTotal);
  }
});

router.get("/dieta", async (req, res) => {
  const allDieta = await Diet.findAll();
  if (allDieta.length === 0) {
    const dietaApi = await axios.get(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&number=100&addRecipeInformation=true`
    );
    const dieta = dietaApi.data.results.map((el) => el.diets);
    const dietasFlat = dieta.flat();

    const dietasFiltradas = dietasFlat.filter((d, index) => { 
      return dietasFlat.indexOf(d) === index   
  }) 

    await dietasFiltradas.forEach((d) =>
      Diet.findOrCreate({
        where: { title: d },
      })
    );

    // const allDieta = await Dieta.findAll();}
  
    res.send(dietasFiltradas);
  } else {
    res.json(allDieta);
  }
});

router.post("/recipe", async (req, res) => { 
  let {
      title, 
      image, 
      diets, 
      summary, 
      likes, 
      score, 
      healthScore, 
      cookingTime, 
      cuisines, 
      instructions,
      createdInDb
  } = req.body;
 console.log(req.body,"EL MALDEETO BODEE")
  if(title && summary){
    let recipeCreate = await Recipe.create({
      title, 
      image, 
      summary, 
      likes, 
      score, 
      healthScore, 
      cookingTime, 
      cuisines, 
      instructions,
      createdInDb
    });
    console.log(diets, "LAS DIETSSSSSSSSSSSSSSSSSSSSSss")

      const dietsDB = await Diet.findAll({ 
        where: {title: diets}
    })
    await recipeCreate.addDiet(dietsDB); 


    res.send("RECIPE CREATED");
    console.log(recipeCreate,"VIENE UN OBJ????")
  }

  else {
    res.status(404).send(error);
  }
});

router.get("/recipe/:id", async (req, res) => {
  const { id } = req.params;
  try {
    if(id.length > 10){
      const recipeDB = await Recipe.findByPk( id, {
        include: {
          model: Diet,
          attributes: ["title"],
          through: {
            attributes: [],
          },
        }
      })
      
        return res.status(200).json(recipeDB)
    }

    const {data} = await axios.get(
      `https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`
    )

    const result= {
      id: data.id,
      title: data.title,
      image: data.image,
      diets: data.diets,
      summary: data.summary,
      likes: data.aggregateLikes,
      score: data.spoonacularScore,
      healthScore: data.healthScore,
      cookingTime: data.readyInMinutes,
      cuisines: data.cuisines,
      instructions: data.analyzedInstructions[0].steps?.map(el => el.step)
    }
    res.send(result) 
}
  catch (error) {
   console.log(error) 
  }
});

module.exports = router;
