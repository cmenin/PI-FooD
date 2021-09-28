const { Router, application } = require("express");
const axios = require("axios");
const { Recipe, Dieta } = require("../db");
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
    `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&number=20&addRecipeInformation=true`
    // "https://pokeapi.co/api/v2/pokemon"
  );
  const rta = data.results;
  const getDb = await Recipe.findAll({
      include: {
        model: Dieta,
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
  const allDieta = await Dieta.findAll();
  if (allDieta.length === 0) {
    const dietaApi = await axios.get(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&number=20&addRecipeInformation=true`
    );
    const dieta = dietaApi.data.results.map((el) => el.diets);
    const dietasFlat = dieta.flat();

    const dietasFiltradas = dietasFlat.filter((d, index) => { 
      return dietasFlat.indexOf(d) === index   //busca el primer indice de la dieta 'd' en el arreglo dietasUnidas y se fija que coincida con el index para devolverlo
  }) 

    await dietasFiltradas.forEach((d) =>
      Dieta.findOrCreate({
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

      const dietsDB = await Dieta.findAll({ //adddiets con arreglo de id
        where: {title: diets}
    })

    await recipeCreate.addDieta(dietsDB); 

  // const dietaDB = diets.map( async d=>{
  //       const dietByRecipe = await Dieta.findByPk(d) 
  //       recipeCreate.addDieta(dietByRecipe);
  //   });
  //   await Promise.all(dietaDB)

    res.send("RECIPE CREATED");
  }

  else {
    res.status(404).send(error);
  }
});


//MODIFICAAAAAR 
router.get("/recipe/:id", async (req, res) => {
  const { id } = req.params;
  try {
    if(id.length > 10){
      const recipeDB = await Recipe.findByPk( id, {
        include: {
          model: Dieta,
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
      instructions: data.analyzedInstructions[0].steps.map(el => el.step)
    }
    res.send(result) 
}
  catch (error) {
   console.log(error) 
  }
});

module.exports = router;
