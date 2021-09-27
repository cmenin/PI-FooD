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
    `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&number=100&addRecipeInformation=true`
    // "https://pokeapi.co/api/v2/pokemon"
  );
  const rta = data.results;
  const getDb = await Recipe.findAll({
      incluide: {
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
      el.title.toLowerCase().incluides(name.toLocaleLowerCase())
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
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&number=100&addRecipeInformation=true`
    );
    const dieta = dietaApi.data.results.map((el) => el.diets);
    const dietasFlat = dieta.flat();
    await dietasFlat.forEach((d) =>
      Dieta.findOrCreate({
        where: { title: d },
      })
    );

    // const allDieta = await Dieta.findAll();}
    console.log(dietasFlat);
    res.send(dietasFlat);
  } else {
    res.json(allDieta);
  }
});

// router.get('/types', async (req, res) => {

//     try {
//         const getDiet = await Dieta.findAll();
//         if(getDiet.length){console.log('getDiet------->',getDiet)
//             return res.status(200).json(getDiet) ;
//         } else {
//             try{
//                 await Dieta.bulkCreate([
//                     { name: "Gluten Free" },
//                     { name: "Ketogenic" },
//                     { name: "Vegetarian" },
//                     { name: "Lacto-Vegetarian" },
//                     { name: "Ovo-Vegetarian" },
//                     { name: "Vegan" },
//                     { name: "Pescetarian" },
//                     { name: "Primal" },
//                     { name: "Whole30" }
//                 ]);
//             }catch (err) {
//                 console.error(err);
//             }
//             const getDiet = await Dieta.findAll();

//             return  res.status(200).json(getDiet);
//         }
//     } catch (err) {
//         console.error(err);
//     }
// })

router.post("/recipe", async (req, res) => {
  let {
    title,
    image,
    summary,
    likes,
    healthScore,
    score,
    dieta,
    cuisines,
    cookingTime,
    instructions,
    createdInDb,
  } = req.body;
  try {
    // if(name && summary){
    let recipeCreate = await Recipe.create({
      title,
      image: image === "" ? undefined : image,
      summary,
      likes,
      healthScore,
      cuisines,
      cookingTime,
      instructions,
      createdInDb,
    });

    const dietaDB = await Dieta.findAll({
      where: { name: dieta },
    });

    await recipeCreate.addDieta(dietaDB);

    res.send("Receta creada con exito");
  } catch (error) {
    res.status(404).send(error);
  }
});

router.get("/recipe/:id", async (req, res) => {
  const { id } = req.params;
  const recipeTotal = await getAll();
  if (id) {
    let recipeId = await recipeTotal.filter((el) => el.id == id);
    recipeId.length
      ? res.status(200).json(recipeId)
      : res.status(404).send("no se encontró receta");
  }
});

module.exports = router;
