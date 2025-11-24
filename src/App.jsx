import React, { useState, useMemo, useEffect } from 'react';
import { Plus, X, ChefHat, ShoppingCart, Trash2, Utensils, Info, AlertCircle, CheckCircle2, MapPin, DollarSign, ArrowLeft, ExternalLink, Heart, Smile, Refrigerator, User, Scale, Ruler, Activity, Leaf, Search, Shuffle, Clock, BookOpen } from 'lucide-react';

// --- BASE DE DATOS MASIVA (Simulando Google Search Results) ---

const RECIPE_DATABASE = [
  // --- DESAYUNOS Y MERIENDAS ---
  {
    id: 1,
    title: "Omelette Proteico de Jamón y Queso",
    category: "Desayuno",
    image: "🍳",
    calories: 320,
    tags: ["Alto en Proteína", "Keto", "Rápido"],
    ingredients: ["huevo", "jamón", "queso", "sal", "aceite"],
    instructions: "1. Bate 3 huevos con una pizca de sal y pimienta.\n2. Corta 50g de jamón y 30g de queso.\n3. Calienta un poco de aceite en la sartén a fuego medio.\n4. Vierte la mezcla de huevo y cuando empiece a cuajar, agrega el jamón y queso picados en la mitad.\n5. Dobla el omelette y cocina 1 minuto más hasta que el queso se derrita. Sirve de inmediato."
  },
  {
    id: 2,
    title: "Panqueques de Avena y Plátano",
    category: "Desayuno",
    image: "🥞",
    calories: 280,
    tags: ["Saludable", "Fibra", "Sin Azúcar"],
    ingredients: ["avena", "plátano", "huevo", "leche", "canela"],
    instructions: "1. Tritura 1/2 taza de avena hasta hacerla harina.\n2. Muele 1 plátano maduro y mézclalo con 1 huevo, 1/4 taza de leche y 1 cucharadita de canela.\n3. Junta todos los ingredientes hasta tener una masa homogénea.\n4. Cocina pequeñas porciones en sartén antiadherente caliente (sin aceite o con muy poco) por 2 minutos por lado."
  },
  {
    id: 3,
    title: "Batido Verde Energético",
    category: "Bebida",
    image: "🥤",
    calories: 150,
    tags: ["Detox", "Vegano", "Vitaminas"],
    ingredients: ["espinaca", "manzana", "limón", "agua", "pepino"],
    instructions: "1. Lava bien 1 puñado de espinaca, 1 manzana verde (con cáscara) y 1/2 pepino.\n2. Pica todo y pon en la licuadora con el jugo de 1 limón y 1 taza de agua fría.\n3. Licúa hasta que no queden grumos. Puedes añadir miel si lo deseas."
  },
  {
    id: 4,
    title: "Tostadas con Palta y Huevo Poché",
    category: "Desayuno",
    image: "🥑",
    calories: 340,
    tags: ["Grasas Saludables", "Clásico"],
    ingredients: ["pan", "palta", "huevo", "sal", "pimienta"],
    instructions: "1. Tuesta 2 rebanadas de pan integral.\n2. Muele 1/2 palta con sal y pimienta.\n3. Cocina 1 huevo en agua hirviendo con un chorrito de vinagre por 3 minutos (poché).\n4. Unta la palta sobre el pan tostado y coloca el huevo encima."
  },

  // --- ALMUERZOS CLÁSICOS Y LATINOS ---
  {
    id: 5,
    title: "Cazuela de Ave Chilena",
    category: "Almuerzo",
    image: "🍲",
    calories: 450,
    tags: ["Clásico Chileno", "Confort", "Familiar"],
    ingredients: ["pollo", "zapallo", "choclo", "papa", "arroz", "cebolla", "zanahoria", "cilantro"],
    instructions: "1. Dora 4 presas de pollo con 1 cebolla picada y 1 zanahoria en rodajas.\n2. Agrega agua hirviendo, 2 papas y 2 trozos de zapallo en cubos. Cocina 20 min.\n3. Agrega 1/2 taza de arroz y 1 trozo de choclo por persona.\n4. Cocina hasta que todo esté blando. Termina con cilantro fresco picado antes de servir."
  },
  {
    id: 6,
    title: "Charquicán de Verduras",
    category: "Almuerzo",
    image: "🥘",
    calories: 380,
    tags: ["Clásico Chileno", "Nutritivo", "Vitaminas"],
    ingredients: ["papa", "zapallo", "acelga", "choclo", "carne molida", "cebolla", "ajo", "aceite"],
    instructions: "1. Sofríe 200g de carne con 1 cebolla y 2 dientes de ajo.\n2. Agrega 3 papas y 200g de zapallo en cubos, cubre con agua y cocina.\n3. Cuando estén blandos, muele rústicamente con un tenedor. \n4. Agrega 1 taza de acelga picada y 1/2 taza de choclo, cocina 5 min más. Condimenta con comino y orégano."
  },
  {
    id: 7,
    title: "Porotos con Riendas",
    category: "Almuerzo",
    image: "🥣",
    calories: 520,
    tags: ["Energía", "Legumbres", "Clásico Chileno"],
    ingredients: ["porotos", "tallarines", "zapallo", "cebolla", "ajo", "ají de color", "orégano"],
    instructions: "1. Cocina 300g de porotos (remojados la noche anterior) con 200g de zapallo.\n2. Cuando estén blandos, agrega 100g de tallarines cortados (riendas).\n3. Prepara un sofrito con cebolla, ajo, ají de color y orégano.\n4. Agrega el sofrito al guiso y cocina hasta que la pasta esté lista."
  },
  {
    id: 8,
    title: "Lentejas Guisadas",
    category: "Almuerzo",
    image: "🍛",
    calories: 410,
    tags: ["Hierro", "Legumbres", "Económico"],
    ingredients: ["lentejas", "arroz", "cebolla", "zanahoria", "pimentón", "aceite"],
    instructions: "1. Haz un sofrito con 1/2 cebolla, 1 zanahoria rallada y 1/4 de pimentón.\n2. Agrega 200g de lentejas y 3 tazas de agua fría. Cocina 20 min.\n3. Agrega 1/4 taza de arroz y cocina 20 min más hasta espesar. Sirve con una hoja de cilantro."
  },
  {
    id: 9,
    title: "Pollo Arvejado con Arroz",
    category: "Almuerzo",
    image: "🍗",
    calories: 480,
    tags: ["Familiar", "Proteína"],
    ingredients: ["pollo", "arvejas", "zanahoria", "cebolla", "arroz", "ajo"],
    instructions: "1. Dora 4 presas de pollo en aceite.\n2. Agrega 1 cebolla, 1 zanahoria en rodajas y ajo picado. \n3. Cubre con un poco de agua o caldo y agrega 1 taza de arvejas.\n4. Cocina a fuego lento hasta que el pollo esté blando. Sirve acompañado de arroz blanco graneado."
  },
  {
    id: 10,
    title: "Carbonada Fácil",
    category: "Almuerzo",
    image: "🍲",
    calories: 390,
    tags: ["Clásico Chileno", "Sopa", "Verduras"],
    ingredients: ["carne molida", "papa", "zapallo", "zanahoria", "porotos verdes", "arroz", "caldo"],
    instructions: "1. Sofríe 200g de carne molida.\n2. Agrega todas las verduras picadas en cubitos pequeños (2 papas, 100g zapallo, 1 zanahoria, 1/2 taza porotos verdes).\n3. Agrega 1 litro de caldo y 1/4 taza de arroz. Hierve hasta que las papas y el arroz estén cocidos (aprox. 30 minutos)."
  },
  {
    id: 11,
    title: "Pasta a la Boloñesa",
    category: "Almuerzo",
    image: "🍝",
    calories: 650,
    tags: ["Carbohidratos", "Familiar"],
    ingredients: ["pasta", "carne molida", "salsa de tomate", "cebolla", "ajo", "oregano"],
    instructions: "1. Hierve 300g de pasta al dente.\n2. Para la salsa: sofríe 1 cebolla y 2 dientes de ajo, agrega 300g de carne molida hasta dorar.\n3. Vierte 1 caja de salsa de tomate y condimenta con orégano, sal y pimienta. Cocina 15 min.\n4. Mezcla la salsa con la pasta escurrida."
  },

  // --- CENAS LIGERAS Y VEGETARIANAS ---
  {
    id: 12,
    title: "Budín de Zapallo Italiano",
    category: "Cena",
    image: "🥧",
    calories: 290,
    tags: ["Vegetariano", "Bajo en Carb", "Ligero"],
    ingredients: ["zapallo italiano", "huevo", "cebolla", "queso", "migas de pan", "leche"],
    instructions: "1. Ralla o pica 2 zapallos italianos y cocínalos al vapor. Escurre bien.\n2. Mezcla con 3 huevos batidos, 1 cebolla frita en cubitos, 1/2 taza de queso rallado y 1/2 taza de migas de pan remojadas en leche.\n3. Lleva al horno en un molde aceitado a 180°C por 30 minutos hasta que dore."
  },
  {
    id: 13,
    title: "Tortilla de Acelga",
    category: "Cena",
    image: "🥬",
    calories: 220,
    tags: ["Bajo en Calorías", "Vegetariano", "Hierro"],
    ingredients: ["acelga", "huevo", "cebolla", "ajo", "aceite"],
    instructions: "1. Lava, sancocha y pica 1 atado de acelga.\n2. Mézclala con 1/2 cebolla frita, ajo picado y 4 huevos batidos.\n3. Condimenta con sal y pimienta.\n4. Cocina la mezcla en una sartén con aceite por ambos lados hasta que cuaje."
  },
  {
    id: 14,
    title: "Tacos de Pollo y Verduras",
    category: "Cena",
    image: "🌮",
    calories: 350,
    tags: ["Balanceado", "Divertido"],
    ingredients: ["tortillas", "pollo", "pimentón", "cebolla", "choclo", "palta"],
    instructions: "1. Saltea tiras de 300g de pollo con 1 pimentón y 1 cebolla en juliana.\n2. Calienta 8 tortillas de harina.\n3. Rellena con el salteado de pollo, agrega choclo cocido y cubitos de palta fresca. Puedes añadir salsa picante."
  },
  {
    id: 15,
    title: "Ensalada César con Pollo",
    category: "Cena",
    image: "🥗",
    calories: 380,
    tags: ["Fresco", "Proteína", "Bajo en Carb"],
    ingredients: ["lechuga", "pollo", "queso", "pan", "mayonesa", "limón", "ajo"],
    instructions: "1. Dora 200g de pollo en cubos.\n2. Prepara el aderezo con 2 cucharadas de mayonesa, jugo de 1 limón y 1 diente de ajo.\n3. Mezcla 1 atado de lechuga lavada, crutones de pan tostado, queso rallado, el pollo y el aderezo."
  },
  {
    id: 16,
    title: "Ceviche de Champiñones",
    category: "Cena",
    image: "🍄",
    calories: 180,
    tags: ["Vegano", "Gourmet", "Súper Ligero"],
    ingredients: ["champiñones", "limón", "cilantro", "cebolla", "pimentón", "palta"],
    instructions: "1. Pica 200g de champiñones y 1/2 cebolla (amortiguada en agua y sal).\n2. Mezcla con mucho jugo de limón, 1/2 pimentón picado fino y cilantro picado.\n3. Deja reposar 15 min para que el limón cocine los champiñones. Sirve con cubos de palta."
  },
  {
    id: 17,
    title: "Quesadillas de Choclo y Queso",
    category: "Cena",
    image: "🧀",
    calories: 310,
    tags: ["Rápido", "Niños"],
    ingredients: ["tortillas", "queso", "choclo", "oregano"],
    instructions: "1. Pon 1 tortilla en la sartén caliente.\n2. Agrega abundante queso rallado y 2 cucharadas de choclo cocido.\n3. Espolvorea orégano. Tapa con otra tortilla.\n4. Dora por ambos lados hasta que el queso se funda. Corta en cuartos."
  },

  // --- PICOTEOS Y EXTRAS ---
  {
    id: 18,
    title: "Papas Rústicas al Horno",
    category: "Picoteo",
    image: "🥔",
    calories: 280,
    tags: ["Vegano", "Guarnición"],
    ingredients: ["papa", "aceite", "romero", "sal", "merquén"],
    instructions: "1. Lava bien 4 papas y córtalas en gajos con cáscara.\n2. Mezcla con aceite, sal, romero y merquén.\n3. Hornea a 200°C por 35-40 min hasta que estén doradas y crujientes."
  },
  {
    id: 19,
    title: "Pebre Chileno con Pan Amasado",
    category: "Picoteo",
    image: "🍅",
    calories: 300,
    tags: ["Clásico Chileno", "Picante"],
    ingredients: ["tomate", "cebolla", "cilantro", "aji verde", "ajo", "aceite", "pan"],
    instructions: "1. Pica 3 tomates, 1 cebolla, 1/2 atado de cilantro, 1/2 ají verde y 1 diente de ajo, todo muy chiquitito.\n2. Mezcla con 2 cucharadas de aceite, 1 de vinagre y sal a gusto.\n3. Deja reposar 15 minutos en el refrigerador. Sirve con pan amasado o marraqueta calentita."
  },
  {
    id: 20,
    title: "Sándwich de Atún y Lechuga",
    category: "Merienda",
    image: "🥪",
    calories: 320,
    tags: ["Rápido", "Proteína"],
    ingredients: ["pan", "atún", "mayonesa", "lechuga", "cebolla"],
    instructions: "1. Escurre bien 1 lata de atún.\n2. Mezcla el atún con 1 cucharada de mayonesa y 1/4 de cebolla picada fina (opcional).\n3. Pon la mezcla sobre 2 rebanadas de pan y agrega hojas de lechuga fresca para dar crocancia."
  },
  {
    id: 21,
    title: "Arroz con Huevo Frito",
    category: "Almuerzo",
    image: "🍚",
    calories: 450,
    tags: ["Salva Almuerzos", "Económico"],
    ingredients: ["arroz", "huevo", "aceite", "sal", "tomate"],
    instructions: "1. Prepara 1 taza de arroz blanco.\n2. Fríe 2 huevos en aceite bien caliente para que los bordes queden crocantes.\n3. Sirve sobre el arroz, acompañado de tomate picado y sal."
  },
  {
    id: 22,
    title: "Tomates Rellenos",
    category: "Almuerzo",
    image: "🍅",
    calories: 250,
    tags: ["Fresco", "Bajo en Calorías"],
    ingredients: ["tomate", "atún", "arroz", "mayonesa", "perejil", "choclo"],
    instructions: "1. Ahueca 4 tomates grandes y reserva la pulpa.\n2. Mezcla la pulpa con 1 lata de atún, 1/2 taza de arroz cocido, 1/4 taza de choclo y 1 cucharada de mayonesa.\n3. Rellena los tomates y decora con perejil picado."
  },
  {
    id: 23,
    title: "Garbanzos con Acelga",
    category: "Almuerzo",
    image: "🥘",
    calories: 460,
    tags: ["Legumbres", "Fibra", "Vegano"],
    ingredients: ["garbanzos", "acelga", "zapallo", "cebolla", "arroz", "comino"],
    instructions: "1. Cocina 200g de garbanzos remojados con 100g de zapallo.\n2. Haz un sofrito con cebolla, ajo y comino.\n3. Agrega el sofrito al guiso junto con 1/4 taza de arroz y 1 atado de acelga picada fina.\n4. Cocina hasta espesar y sirve bien caliente."
  },
  {
    id: 24,
    title: "Fajitas de Carne",
    category: "Cena",
    image: "🌯",
    calories: 480,
    tags: ["Familiar", "Compartir"],
    ingredients: ["tortillas", "carne", "pimentón", "cebolla", "queso", "crema"],
    instructions: "1. Corta 300g de carne en tiras y saltéala con 1 pimentón y 1 cebolla en juliana.\n2. Calienta las tortillas de harina.\n3. Lleva el salteado a la mesa con tortillas calientes, queso rallado y crema ácida para que cada uno se arme su fajita."
  }
];

// Lista de ingredientes comunes AMPLIADA para el autocomplete
const COMMON_INGREDIENTS = [
  "huevo", "arroz", "aceite", "sal", "leche", "pollo", "tomate", "queso", 
  "cebolla", "ajo", "pasta", "carne molida", "carne", "lechuga", "limón", "palta",
  "atún", "pan", "harina", "azúcar", "jamón", "mantequilla", "papa", 
  "zapallo", "choclo", "acelga", "zanahoria", "cilantro", "pimentón", "porotos",
  "lentejas", "garbanzos", "arvejas", "porotos verdes", "zapallo italiano", 
  "espinaca", "avena", "plátano", "manzana", "pepino", "champiñones"
];

// Precios base (agregando nuevos ingredientes)
const INGREDIENT_PRICES = {
  "huevo": 200, "jamón": 2500, "queso": 3000, "sal": 500, "aceite": 1800,
  "pasta": 900, "carne molida": 4500, "carne": 5500, "salsa de tomate": 800, 
  "cebolla": 600, "ajo": 300, "tomate": 1200, "albahaca": 700, "aceite de oliva": 5000, 
  "arroz": 1100, "tortillas": 1500, "pollo": 3800, "cilantro": 400, "limón": 800, 
  "harina": 950, "leche": 1000, "azúcar": 900, "mantequilla": 2200, "pan": 1300, 
  "atún": 1400, "mayonesa": 1600, "lechuga": 800, "plátano": 1100, "hielo": 500, 
  "papa": 1000, "pimienta": 600, "palta": 3500, "nachos": 2000, 
  "zapallo": 1200, "choclo": 800, "acelga": 900, "zanahoria": 700, "pimentón": 1000,
  "porotos": 1800, "lentejas": 1900, "garbanzos": 2000, "arvejas": 1100, 
  "porotos verdes": 1400, "zapallo italiano": 800, "espinaca": 1000, "avena": 1500,
  "manzana": 1200, "pepino": 800, "champiñones": 2500, "merquén": 2000, "oregano": 600,
  "default": 1500
};

const SUPERMARKETS = [
  { id: 1, name: "Súper Vecino", distance: 1.2, priceFactor: 0.9, color: "bg-blue-500", icon: "🏪" },
  { id: 2, name: "Mercado Central", distance: 3.5, priceFactor: 1.0, color: "bg-red-500", icon: "🛒" },
  { id: 3, name: "Tienda Express", distance: 0.4, priceFactor: 1.25, color: "bg-green-500", icon: "🏃" },
  { id: 4, name: "La Gran Bodega", distance: 8.0, priceFactor: 0.85, color: "bg-orange-500", icon: "🏭" },
  { id: 5, name: "Don Pepe Market", distance: 0.8, priceFactor: 1.1, color: "bg-purple-500", icon: "🍇" },
];

export default function App() {
  // Estado Principal
  const [pantry, setPantry] = useState(['huevo', 'arroz', 'aceite', 'sal', 'leche']);
  const [inputValue, setInputValue] = useState('');
  const [activeTab, setActiveTab] = useState('perfect');
  
  // Estado Perfil Saludable
  const [showProfile, setShowProfile] = useState(false);
  const [userStats, setUserStats] = useState({ weight: '', height: '' }); // peso en kg, altura en cm
  const [healthGoal, setHealthGoal] = useState(null); 

  // Estado Navegación
  const [currentView, setCurrentView] = useState('home'); // 'home' | 'shopping' | 'random' | 'recipe'
  const [mobileSection, setMobileSection] = useState('recipes'); // 'pantry' | 'recipes' | 'random'
  const [shoppingList, setShoppingList] = useState([]);
  const [targetRecipe, setTargetRecipe] = useState(null);

  // Lógica para el nuevo CUADRO DE SUGERENCIAS RÁPIDAS
  const quickAddSuggestions = useMemo(() => {
    // Filtramos los ingredientes comunes para mostrar sólo los que el usuario NO tiene,
    // limitando a 10 para que no sea una lista infinita.
    return COMMON_INGREDIENTS.filter(ing => !pantry.includes(ing)).slice(0, 10);
  }, [pantry]);

  // Cálculo de Perfil de Salud
  useEffect(() => {
    const weight = parseFloat(userStats.weight);
    const height = parseFloat(userStats.height) / 100; 

    if (weight > 0 && height > 0) {
      const bmi = weight / (height * height);
      let goal = { type: 'maintain', text: 'Mantenimiento', color: 'text-emerald-600', bg: 'bg-emerald-100' };

      if (bmi < 18.5) {
        goal = { type: 'gain', text: 'Ganar Peso', color: 'text-blue-600', bg: 'bg-blue-100' };
      } else if (bmi >= 25) {
        goal = { type: 'lose', text: 'Perder Peso', color: 'text-orange-600', bg: 'bg-orange-100' };
      }
      setHealthGoal(goal);
    } else {
      setHealthGoal(null);
    }
  }, [userStats]);

  // Añadir ingrediente
  const addIngredient = (item) => {
    const newItem = item.toLowerCase().trim();
    if (!pantry.includes(newItem)) {
      setPantry([...pantry, newItem]);
    }
    setInputValue('');
  };

  const handleInputSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim()) addIngredient(inputValue);
  };

  const removeIngredient = (itemToRemove) => {
    setPantry(pantry.filter(item => item !== itemToRemove));
  };

  const clearPantry = () => setPantry([]);

  // Lógica de Recomendación Mejorada (Usada en Home y Random)
  const recommendedRecipes = useMemo(() => {
    return RECIPE_DATABASE.map(recipe => {
      const existingIngredients = recipe.ingredients.filter(ing => 
        pantry.some(pItem => pItem.includes(ing) || ing.includes(pItem))
      );
      const missingIngredients = recipe.ingredients.filter(ing => 
        !pantry.some(pItem => pItem.includes(ing) || ing.includes(pItem))
      );
      
      let isHealthMatch = false;
      if (healthGoal) {
        if (healthGoal.type === 'lose' && recipe.calories <= 400) isHealthMatch = true;
        if (healthGoal.type === 'gain' && recipe.calories >= 450) isHealthMatch = true;
        if (healthGoal.type === 'maintain' && recipe.calories > 300 && recipe.calories < 600) isHealthMatch = true;
      }

      return {
        ...recipe,
        existingCount: existingIngredients.length,
        missingCount: missingIngredients.length,
        existingIngredients,
        missingIngredients,
        totalIngredients: recipe.ingredients.length,
        matchPercentage: Math.round((existingIngredients.length / recipe.ingredients.length) * 100),
        isHealthMatch
      };
    }).sort((a, b) => {
      if (healthGoal && a.isHealthMatch && !b.isHealthMatch) return -1;
      if (healthGoal && !a.isHealthMatch && b.isHealthMatch) return 1;
      return 0;
    });
  }, [pantry, healthGoal]);

  const perfectMatches = recommendedRecipes.filter(r => r.missingCount === 0);
  const partialMatches = recommendedRecipes.filter(r => r.missingCount > 0 && r.missingCount <= 4); 

  const goToShopping = (recipe) => {
    setTargetRecipe(recipe);
    setShoppingList(recipe.missingIngredients);
    setCurrentView('shopping');
  };
  
  const viewRecipe = (recipe) => {
    setTargetRecipe(recipe);
    setCurrentView('recipe');
  };

  const goHome = () => {
    setCurrentView('home');
    setTargetRecipe(null);
    setShoppingList([]);
  };

  const setView = (viewName) => {
    setCurrentView(viewName);
    if (viewName !== 'home') {
      setShowProfile(false); // Ocultar perfil al cambiar de vista
    }
  }

  // Define el contenido de la vista actual
  let currentContent;
  if (currentView === 'home') {
    currentContent = (
      <HomeView 
        mobileSection={mobileSection}
        pantry={pantry}
        inputValue={inputValue}
        setInputValue={setInputValue}
        handleInputSubmit={handleInputSubmit}
        addIngredient={addIngredient}
        removeIngredient={removeIngredient}
        clearPantry={clearPantry}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        perfectMatches={perfectMatches}
        partialMatches={partialMatches}
        healthGoal={healthGoal}
        setMobileSection={setMobileSection}
        goToShopping={goToShopping}
        quickAddSuggestions={quickAddSuggestions}
        viewRecipe={viewRecipe} // PASAR NUEVA FUNCIÓN
      />
    );
  } else if (currentView === 'random') {
    currentContent = (
      <RandomRecipeView 
        perfectMatches={perfectMatches}
        partialMatches={partialMatches}
        healthGoal={healthGoal}
        goToShopping={goToShopping}
        viewRecipe={viewRecipe} // PASAR NUEVA FUNCIÓN
      />
    );
  } else if (currentView === 'shopping') {
    currentContent = (
      <SupermarketView missingIngredients={shoppingList} onBack={goHome} />
    );
  } else if (currentView === 'recipe' && targetRecipe) {
    currentContent = (
      <RecipePageView 
        recipe={targetRecipe} 
        pantry={pantry} 
        healthGoal={healthGoal} 
        onBack={() => setCurrentView('home')} // Volver a home o random (se simplificó a home)
        onShop={() => goToShopping(targetRecipe)}
      />
    );
  }


  return (
    <div className="min-h-screen bg-orange-50 text-stone-800 font-sans pb-24 lg:pb-10 selection:bg-rose-200">
      
      {/* Header */}
      <header className="bg-gradient-to-r from-orange-500 to-rose-500 text-white p-4 lg:p-6 shadow-xl sticky top-0 z-30 rounded-b-3xl lg:rounded-b-[2rem] mb-6 lg:mb-8 transition-all">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            {(currentView === 'shopping' || currentView === 'random' || currentView === 'recipe') ? (
              <button onClick={() => currentView === 'recipe' ? setCurrentView('home') : setView('home')} className="bg-white/20 backdrop-blur-sm p-2 rounded-full hover:bg-white/30 transition-all transform active:scale-95">
                <ArrowLeft size={24} strokeWidth={2.5} />
              </button>
            ) : (
              <div className="bg-white text-orange-500 p-2 rounded-2xl shadow-lg transform -rotate-6">
                <ChefHat size={28} strokeWidth={2.5} className="lg:w-9 lg:h-9" />
              </div>
            )}
            <div>
              <h1 className="text-2xl lg:text-3xl font-black tracking-tight drop-shadow-sm" style={{ fontFamily: '"Comic Sans MS", "Chalkboard SE", sans-serif' }}>
                Pocket Chef
              </h1>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            {currentView === 'home' && (
              <button 
                onClick={() => setView('random')}
                className={`p-2 rounded-full flex items-center gap-2 transition-colors shadow-sm bg-white/20 text-white hover:bg-white/30 hover:scale-105`}
              >
                <Shuffle size={20} strokeWidth={2.5} />
                <span className="hidden md:inline font-bold text-xs uppercase">Al Azar</span>
              </button>
            )}
             {currentView !== 'shopping' && currentView !== 'recipe' && (
               <button 
                onClick={() => setShowProfile(!showProfile)}
                className={`p-2 rounded-full flex items-center gap-2 transition-colors shadow-sm ${showProfile ? 'bg-white text-rose-500' : 'bg-white/20 text-white hover:bg-white/30'}`}
              >
                <User size={20} strokeWidth={2.5} />
                {healthGoal && <span className="hidden md:inline font-bold text-xs uppercase">{healthGoal.text}</span>}
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Modal/Panel de Perfil de Salud */}
      {showProfile && (
        <div className="max-w-5xl mx-auto px-4 mb-6 animate-fadeIn">
          <div className="bg-white rounded-3xl shadow-lg border-2 border-rose-100 p-6 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-orange-400 to-rose-400"></div>
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div>
                <h2 className="text-xl font-black text-stone-700 flex items-center gap-2 mb-2">
                  <Activity className="text-rose-500" /> Tu Perfil Saludable
                </h2>
                <p className="text-stone-500 text-sm">Ingresa tus datos para filtrar las mejores recetas para ti.</p>
              </div>
              
              <div className="flex flex-wrap gap-4 items-end">
                <div>
                  <label className="block text-xs font-bold text-stone-400 uppercase mb-1 ml-1">Peso (kg)</label>
                  <div className="relative">
                    <Scale className="absolute left-3 top-3 text-stone-300" size={18} />
                    <input 
                      type="number" 
                      value={userStats.weight}
                      onChange={(e) => setUserStats({...userStats, weight: e.target.value})}
                      placeholder="Ej: 70"
                      className="pl-10 pr-4 py-2.5 bg-stone-50 border-2 border-stone-200 rounded-xl w-28 focus:border-rose-400 focus:outline-none font-bold text-stone-700"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-stone-400 uppercase mb-1 ml-1">Altura (cm)</label>
                  <div className="relative">
                    <Ruler className="absolute left-3 top-3 text-stone-300" size={18} />
                    <input 
                      type="number" 
                      value={userStats.height}
                      onChange={(e) => setUserStats({...userStats, height: e.target.value})}
                      placeholder="Ej: 170"
                      className="pl-10 pr-4 py-2.5 bg-stone-50 border-2 border-stone-200 rounded-xl w-28 focus:border-rose-400 focus:outline-none font-bold text-stone-700"
                    />
                  </div>
                </div>
              </div>
            </div>

            {healthGoal && (
              <div className={`mt-6 p-4 rounded-xl flex items-start gap-3 ${healthGoal.bg}`}>
                <Leaf className={`mt-1 shrink-0 ${healthGoal.color}`} size={20} />
                <div>
                  <h3 className={`font-bold ${healthGoal.color}`}>Meta: {healthGoal.text}</h3>
                  <p className="text-sm text-stone-600 opacity-80 mt-1">
                    Priorizaremos recetas {healthGoal.type === 'lose' ? 'ligeras y bajas en calorías' : healthGoal.type === 'gain' ? 'energéticas y nutritivas' : 'balanceadas'} en tu lista.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      <main className="max-w-5xl mx-auto p-4 md:p-6 pt-0">
        {currentContent}
      </main>

      {/* Navegación Móvil */}
      {currentView !== 'shopping' && currentView !== 'recipe' && (
        <nav className="lg:hidden fixed bottom-0 left-0 w-full bg-white border-t border-stone-200 px-6 py-3 flex justify-around items-center z-40 shadow-[0_-4px_20px_rgba(0,0,0,0.05)] rounded-t-2xl safe-area-pb">
          <button 
            onClick={() => { setView('home'); setMobileSection('pantry'); }}
            className={`flex flex-col items-center gap-1 transition-colors ${mobileSection === 'pantry' && currentView === 'home' ? 'text-orange-500' : 'text-stone-400'}`}
          >
            <Refrigerator size={24} strokeWidth={mobileSection === 'pantry' && currentView === 'home' ? 3 : 2} />
            <span className="text-[10px] font-bold">Mi Refri</span>
          </button>

          <button 
            onClick={() => { setView('home'); setMobileSection('recipes'); }}
            className={`flex flex-col items-center gap-1 transition-colors ${mobileSection === 'recipes' && currentView === 'home' ? 'text-orange-500' : 'text-stone-400'}`}
          >
            <ChefHat size={24} strokeWidth={mobileSection === 'recipes' && currentView === 'home' ? 3 : 2} />
            <span className="text-[10px] font-bold">Sugeridas</span>
          </button>

          <button 
            onClick={() => setView('random')}
            className={`flex flex-col items-center gap-1 transition-colors ${currentView === 'random' ? 'text-rose-500' : 'text-stone-400'}`}
          >
            <Shuffle size={24} strokeWidth={currentView === 'random' ? 3 : 2} />
            <span className="text-[10px] font-bold">Al Azar</span>
          </button>
        </nav>
      )}
    </div>
  );
}

// --- VISTAS Y COMPONENTES PRINCIPALES ---

function HomeView({ 
  mobileSection, pantry, inputValue, setInputValue, handleInputSubmit, 
  addIngredient, removeIngredient, clearPantry, activeTab, 
  setActiveTab, perfectMatches, partialMatches, healthGoal, setMobileSection, goToShopping,
  quickAddSuggestions, viewRecipe
}) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
      {/* COLUMNA IZQUIERDA: INPUT + INGREDIENTES */}
      <div className={`${mobileSection === 'pantry' ? 'block' : 'hidden'} lg:block lg:col-span-4 space-y-6 animate-fadeIn`}>
        
        {/* Caja de Input Principal */}
        <div className="bg-white p-5 lg:p-6 rounded-3xl shadow-lg border-2 border-orange-100 relative z-20">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-orange-600">
            {/* INICIO DE CAMBIO: Usar ChefHat en lugar de Smile */}
            <ChefHat size={24} strokeWidth={2.5} />
            ¿Qué hay en la refri?
            {/* FIN DE CAMBIO */}
          </h2>
          <form onSubmit={handleInputSubmit} className="flex flex-col gap-3 relative">
            <div className="relative">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Escribe aquí para agregar un ingrediente..."
                className="w-full pl-11 pr-5 py-3 border-2 border-orange-200 rounded-2xl focus:outline-none focus:border-orange-400 focus:ring-4 focus:ring-orange-100 transition-all placeholder-orange-300 text-lg"
                autoComplete="off"
              />
              <Search className="absolute left-4 top-3.5 text-orange-300" size={20} />
            </div>
            
            <button type="submit" className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3.5 rounded-2xl transition-transform active:scale-95 shadow-md flex justify-center items-center gap-2 text-lg mt-1">
              <Plus size={24} strokeWidth={3} /> ¡Agregar!
            </button>
          </form>
        </div>

        {/* CUADRADO DE SUGERENCIAS RÁPIDAS */}
        {quickAddSuggestions.length > 0 && (
            <div className="bg-white p-5 lg:p-6 rounded-3xl shadow-lg border-2 border-rose-100 animate-fadeIn">
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-rose-600">
                    <Info size={24} strokeWidth={2.5} />
                    Sugerencias Rápidas
                </h2>
                <p className="text-sm text-stone-500 mb-4">¿Te falta algo de esto? ¡Pincha el **+** para añadirlo!</p>
                <div className="flex flex-wrap gap-2">
                    {quickAddSuggestions.map((ing, i) => (
                        <button 
                            key={i}
                            type="button"
                            onClick={() => addIngredient(ing)}
                            className="bg-rose-50 text-rose-800 border-2 border-rose-200 px-3 py-1.5 rounded-full font-bold text-sm flex items-center gap-2 shadow-sm transition-all hover:bg-rose-200 active:scale-95 capitalize"
                        >
                            <Plus size={14} className="text-rose-600" /> {ing}
                        </button>
                    ))}
                </div>
            </div>
        )}

        {/* Lista de Despensa */}
        <div className="bg-white p-5 lg:p-6 rounded-3xl shadow-lg border-2 border-orange-100 min-h-[200px]">
          <div className="flex justify-between items-center mb-5">
            <h2 className="text-xl font-bold text-stone-700">Tu Inventario</h2>
            {pantry.length > 0 && (
              <button onClick={clearPantry} className="text-xs font-bold text-rose-500 hover:text-rose-700 hover:bg-rose-50 px-3 py-1.5 rounded-full transition-colors flex items-center gap-1">
                <Trash2 size={14} /> Borrar
              </button>
            )}
          </div>
          {pantry.length === 0 ? (
            <div className="text-center py-10 bg-orange-50 rounded-2xl border-2 border-dashed border-orange-200 flex flex-col items-center">
              <div className="bg-white p-3 rounded-full mb-3 shadow-sm">
                <Utensils className="text-orange-300" size={32} />
              </div>
              <p className="text-stone-500 font-medium">Tu cocina está vacía.</p>
            </div>
          ) : (
            <div className="flex flex-wrap gap-2">
              {pantry.map((item, index) => (
                <span key={index} className="bg-yellow-100 text-orange-800 border-2 border-yellow-200 px-3 py-1.5 rounded-full font-bold text-sm flex items-center gap-2 shadow-sm animate-fadeIn capitalize">
                  {item}
                  <button onClick={() => removeIngredient(item)} className="bg-white/50 hover:bg-white text-orange-600 rounded-full p-0.5 transition-colors w-5 h-5 flex items-center justify-center">
                    <X size={12} strokeWidth={3} />
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* COLUMNA DERECHA: RESULTADOS */}
      <div className={`${mobileSection === 'recipes' ? 'block' : 'hidden'} lg:block lg:col-span-8 animate-fadeIn`}>
        <div className="flex gap-2 lg:gap-3 mb-6 p-1">
          <button 
            onClick={() => setActiveTab('perfect')}
            className={`flex-1 py-3 px-2 rounded-2xl font-bold text-sm md:text-base flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 transition-all shadow-sm ${activeTab === 'perfect' ? 'bg-emerald-500 text-white shadow-emerald-200 shadow-lg transform scale-105' : 'bg-white text-stone-500 border-2 border-transparent'}`}
          >
            <span className="flex items-center gap-2">
              <CheckCircle2 size={20} />
              <span>Cocinar ya</span>
            </span>
            <span className={`text-xs py-0.5 px-2 rounded-full ${activeTab === 'perfect' ? 'bg-emerald-700 text-white' : 'bg-stone-100 text-stone-600'}`}>{perfectMatches.length}</span>
          </button>
          <button 
            onClick={() => setActiveTab('partial')}
            className={`flex-1 py-3 px-2 rounded-2xl font-bold text-sm md:text-base flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 transition-all shadow-sm ${activeTab === 'partial' ? 'bg-amber-400 text-white shadow-amber-200 shadow-lg transform scale-105' : 'bg-white text-stone-500 border-2 border-transparent'}`}
          >
            <span className="flex items-center gap-2">
              <ShoppingCart size={20} />
              <span>Me falta poco</span>
            </span>
            <span className={`text-xs py-0.5 px-2 rounded-full ${activeTab === 'partial' ? 'bg-amber-600 text-white' : 'bg-stone-100 text-stone-600'}`}>{partialMatches.length}</span>
          </button>
        </div>

        <div className="space-y-5 pb-20 lg:pb-0">
          {activeTab === 'perfect' && (
            <>
              {perfectMatches.length === 0 ? (
                  <EmptyState 
                    icon={<CheckCircle2 size={56} className="text-emerald-200" />}
                    title="¡Aún no hay match!"
                    text="Prueba agregando ingredientes típicos como: Papa, Zapallo, Cebolla, Arroz..."
                    color="emerald"
                    action={() => setMobileSection('pantry')}
                  />
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {perfectMatches.map(recipe => <RecipeCard key={recipe.id} recipe={recipe} type="perfect" healthGoal={healthGoal} viewRecipe={viewRecipe} />)}
                </div>
              )}
            </>
          )}

          {activeTab === 'partial' && (
            <>
              <div className="bg-amber-100 border-l-4 border-amber-400 p-4 rounded-r-xl mb-4 flex items-start gap-3 text-amber-800 shadow-sm text-sm lg:text-base">
                <Info size={22} className="mt-0.5 shrink-0 text-amber-500" />
                <p className="font-medium">Te mostramos recetas donde te faltan <b>hasta 4 ingredientes</b>.</p>
              </div>
              {partialMatches.length === 0 ? (
                  <EmptyState 
                    icon={<ShoppingCart size={56} className="text-amber-200" />}
                    title="Nada cerca"
                    text="Intenta con básicos: aceite, sal, huevo, harina..."
                    color="amber"
                    action={() => setMobileSection('pantry')}
                  />
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {partialMatches.map(recipe => (
                    <RecipeCard key={recipe.id} recipe={recipe} type="partial" healthGoal={healthGoal} onShop={() => goToShopping(recipe)} viewRecipe={viewRecipe} />
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function RandomRecipeView({ perfectMatches, partialMatches, healthGoal, goToShopping, viewRecipe }) {
  const [randomKey, setRandomKey] = useState(0); // Para forzar un re-shuffle

  const getRandomItems = (arr, n) => {
    if (arr.length === 0) return [];
    // Shuffle + Slice para obtener elementos aleatorios sin repetición
    const shuffled = [...arr].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, n);
  };

  const randomPerfect = useMemo(() => getRandomItems(perfectMatches, 3), [perfectMatches, randomKey]);
  const randomPartial = useMemo(() => getRandomItems(partialMatches, 3), [partialMatches, randomKey]);
  
  const handleShuffle = () => setRandomKey(prev => prev + 1);

  return (
    <div className="animate-fadeIn">
      <div className="bg-white p-6 rounded-3xl shadow-lg border-2 border-rose-100 mb-8 flex flex-col md:flex-row items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="bg-rose-100 p-3 rounded-full text-rose-500">
            <Shuffle size={28} />
          </div>
          <div>
            <h2 className="text-xl font-black text-stone-700 leading-tight">¡Hoy Cocina la Suerte!</h2>
            <p className="text-stone-500 text-sm">¿Qué te toca preparar? Presiona "Mezclar" para nuevos resultados.</p>
          </div>
        </div>
        <button 
          onClick={handleShuffle}
          className="bg-rose-500 hover:bg-rose-600 text-white font-bold py-3.5 px-6 rounded-2xl transition-transform active:scale-95 shadow-lg shadow-rose-200 flex justify-center items-center gap-2 text-lg mt-4 md:mt-0"
        >
          <Shuffle size={24} strokeWidth={3} /> Mezclar
        </button>
      </div>

      {/* SECCIÓN 1: RECETAS 100% LISTAS (Ingredientes que ya tienes) */}
      <h3 className="text-2xl font-black text-stone-700 mb-4 flex items-center gap-2">
        <CheckCircle2 size={24} className="text-emerald-500" />
        Para Cocinar ¡YA!
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10">
        {randomPerfect.length > 0 ? (
          randomPerfect.map(recipe => <RecipeCard key={recipe.id} recipe={recipe} type="perfect" healthGoal={healthGoal} viewRecipe={viewRecipe} />)
        ) : (
          <div className="md:col-span-2">
            <EmptyState 
              icon={<CheckCircle2 size={56} className="text-emerald-200" />}
              title="No hay nada 100% listo al azar"
              text="Agrega más ingredientes a tu refri para aumentar tus chances."
              color="emerald"
            />
          </div>
        )}
      </div>

      {/* SECCIÓN 2: RECETAS DESAFÍO (Ingredientes que faltan) */}
      <h3 className="text-2xl font-black text-stone-700 mb-4 flex items-center gap-2">
        <ShoppingCart size={24} className="text-amber-500" />
        Desafío (¡Me falta poco!)
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pb-10">
        {randomPartial.length > 0 ? (
          randomPartial.map(recipe => (
            <RecipeCard 
              key={recipe.id} 
              recipe={recipe} 
              type="partial" 
              healthGoal={healthGoal} 
              onShop={() => goToShopping(recipe)}
              viewRecipe={viewRecipe}
            />
          ))
        ) : (
          <div className="md:col-span-2">
            <EmptyState 
              icon={<ShoppingCart size={56} className="text-amber-200" />}
              title="No hay desafíos cercanos"
              text="Prueba con la sección de Sugeridas para ver recetas con más faltantes."
              color="amber"
            />
          </div>
        )}
      </div>
    </div>
  );
}

// NUEVO COMPONENTE: VISTA DE RECETA EXTENDIDA
function RecipePageView({ recipe, pantry, healthGoal, onBack, onShop }) {
    const lines = recipe.instructions.split('\n').filter(line => line.trim() !== '');
    const isReady = recipe.missingIngredients.length === 0;
    const isRecommended = recipe.isHealthMatch;

    return (
        <div className="animate-fadeIn max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-6">
                <button onClick={onBack} className="flex items-center gap-2 text-rose-500 font-bold hover:text-rose-700 transition-colors">
                    <ArrowLeft size={20} />
                    Volver a Recetas
                </button>
            </div>

            <div className="bg-white rounded-3xl shadow-2xl p-6 lg:p-10 border-4 border-rose-100">
                <div className="flex items-center gap-4 mb-4">
                    <div className="text-6xl lg:text-8xl drop-shadow-md">{recipe.image}</div>
                    <div>
                        <h1 className="text-3xl lg:text-4xl font-black text-stone-800 leading-tight">{recipe.title}</h1>
                        <div className="flex gap-2 mt-2">
                            <span className="text-xs font-black text-stone-500 uppercase tracking-widest bg-stone-100 px-3 py-1 rounded-md">{recipe.category}</span>
                            <span className="text-xs font-black text-orange-500 uppercase tracking-widest bg-orange-50 border border-orange-100 px-3 py-1 rounded-md">{recipe.calories} kcal</span>
                        </div>
                    </div>
                </div>

                <div className="mt-8 border-t pt-6 border-stone-100">
                     <h2 className="text-2xl font-black text-stone-700 mb-4 flex items-center gap-2">
                        <BookOpen size={24} className="text-rose-500" />
                        Instrucciones Paso a Paso
                    </h2>
                    <ol className="list-decimal pl-5 space-y-4 text-lg text-stone-600">
                        {lines.map((line, index) => (
                            <li key={index} className="pl-2 border-l-2 border-orange-200">
                                {line}
                            </li>
                        ))}
                    </ol>
                </div>

                <div className="mt-8 pt-6 border-t border-stone-100 grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div>
                        <h2 className="text-2xl font-black text-stone-700 mb-4 flex items-center gap-2">
                            <Utensils size={24} className="text-emerald-500" />
                            Ingredientes ({isReady ? '¡Todo listo!' : 'Faltantes'})
                        </h2>
                        <div className="flex flex-wrap gap-2">
                            {recipe.existingIngredients.map((ing, i) => (
                                <span key={i} className="text-sm font-bold px-3 py-1.5 bg-emerald-100 text-emerald-800 rounded-full flex items-center gap-2 capitalize">
                                    <CheckCircle2 size={16} strokeWidth={3} /> {ing}
                                </span>
                            ))}
                            {recipe.missingIngredients.map((ing, i) => (
                                <span key={i} className="text-sm font-bold px-3 py-1.5 bg-red-100 text-red-800 rounded-full flex items-center gap-2 border border-red-200 capitalize">
                                    <AlertCircle size={16} strokeWidth={3} /> {ing}
                                </span>
                            ))}
                        </div>
                    </div>
                    
                    <div className="bg-stone-50 p-5 rounded-2xl border border-stone-200">
                        <h3 className="text-xl font-bold text-stone-700 mb-3 flex items-center gap-2">
                            <Info size={20} className="text-orange-500" />
                            Detalles Rápidos
                        </h3>
                        <div className="space-y-2 text-stone-600">
                            <p className="flex justify-between border-b border-stone-100 pb-1">
                                <span className="font-medium">Calorías:</span>
                                <span className="font-bold text-orange-600">{recipe.calories} kcal</span>
                            </p>
                            <p className="flex justify-between border-b border-stone-100 pb-1">
                                <span className="font-medium">Tags:</span>
                                <span>{recipe.tags.join(', ')}</span>
                            </p>
                            {isRecommended && healthGoal && (
                                <p className="pt-2 flex justify-between font-black text-rose-600">
                                    <span>Recomendado para:</span>
                                    <span className="uppercase">{healthGoal.text}</span>
                                </p>
                            )}
                        </div>
                    </div>
                </div>

                {!isReady && (
                    <div className="mt-8 pt-6 border-t border-rose-100">
                        <button onClick={onShop} className="w-full bg-amber-400 text-white font-bold py-4 rounded-xl transition-all shadow-amber-200 shadow-md flex justify-center items-center gap-3 text-lg transform active:scale-95 hover:bg-amber-500">
                            <ShoppingCart size={24} strokeWidth={3} /> ¡Comprar {recipe.missingIngredients.length} faltantes!
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}


function SupermarketView({ missingIngredients, onBack }) {
  const [maxDistance, setMaxDistance] = useState(5);

  const marketsWithPrices = useMemo(() => {
    return SUPERMARKETS.map(market => {
      const totalCost = missingIngredients.reduce((acc, item) => {
        const basePrice = INGREDIENT_PRICES[item] || INGREDIENT_PRICES.default;
        return acc + (basePrice * market.priceFactor);
      }, 0);

      return {
        ...market,
        totalCost: Math.round(totalCost),
        isWithinRange: market.distance <= maxDistance
      };
    }).sort((a, b) => a.totalCost - b.totalCost);
  }, [missingIngredients, maxDistance]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-fadeIn pb-20">
      <div className="lg:col-span-1 order-2 lg:order-1">
        <div className="bg-yellow-50 p-6 rounded-xl shadow-lg border border-yellow-200 lg:sticky lg:top-28 rotate-1">
          <div className="w-4 h-4 bg-red-400 rounded-full absolute -top-2 left-1/2 transform -translate-x-1/2 shadow-sm"></div>
          <h2 className="text-xl font-black mb-6 flex items-center gap-2 text-stone-800 border-b-2 border-yellow-200 pb-2 font-serif">
            📝 Lista del Mandado
          </h2>
          <ul className="space-y-3 mb-6 font-handwriting">
            {missingIngredients.map((item, idx) => (
              <li key={idx} className="flex justify-between items-center text-stone-700 text-lg">
                <span className="capitalize flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-stone-400 rounded-sm inline-block bg-white"></span>
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="lg:col-span-2 order-1 lg:order-2">
        <div className="bg-white p-6 rounded-3xl shadow-lg border-2 border-stone-100 mb-6">
           <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-stone-700 flex items-center gap-2 text-lg">
              <div className="bg-rose-100 p-2 rounded-full text-rose-500">
                <MapPin size={20} />
              </div>
              Distancia
            </h3>
            <span className="bg-rose-500 text-white px-4 py-1 rounded-full text-sm font-bold shadow-md">
              {maxDistance} km
            </span>
          </div>
          <input 
            type="range" 
            min="0.5" 
            max="15" 
            step="0.5" 
            value={maxDistance}
            onChange={(e) => setMaxDistance(parseFloat(e.target.value))}
            className="w-full h-6 bg-stone-200 rounded-full appearance-none cursor-pointer accent-rose-500 hover:accent-rose-400 transition-all"
          />
        </div>
        <div className="space-y-4">
          {marketsWithPrices.filter(m => m.isWithinRange).map((market, idx) => (
            <div key={market.id} className={`bg-white p-5 rounded-3xl shadow-md border-2 hover:shadow-xl transition-all flex flex-col gap-4 relative overflow-hidden ${idx === 0 ? 'border-amber-300 ring-4 ring-amber-100' : 'border-stone-100'}`}>
              {idx === 0 && (
                <div className="absolute top-0 right-0 bg-amber-400 text-white text-[10px] font-black px-3 py-1 rounded-bl-xl z-10 tracking-wide">MEJOR PRECIO</div>
              )}
              <div className="flex items-center gap-4">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-white font-bold text-2xl shadow-md transform rotate-3 shrink-0 ${market.color}`}>{market.icon}</div>
                <div className="flex-1">
                  <h4 className="font-black text-stone-800 text-lg leading-tight">{market.name}</h4>
                  <p className="text-stone-500 font-medium flex items-center gap-1 text-sm mt-1"><MapPin size={14} className="text-rose-400" /> {market.distance} km</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-black text-emerald-600">${market.totalCost.toLocaleString()}</p>
                </div>
              </div>
              <button className="w-full bg-stone-800 hover:bg-stone-900 text-white py-3 rounded-xl transition-all font-bold flex justify-center items-center gap-2 active:scale-95">Ir ahora <ExternalLink size={18} /></button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function RecipeCard({ recipe, type, onShop, healthGoal, viewRecipe }) {
  const isRecommended = recipe.isHealthMatch;

  return (
    <div className={`bg-white rounded-3xl shadow-md border-2 overflow-hidden hover:shadow-xl transition-all flex flex-col h-full group touch-manipulation ${isRecommended ? 'border-rose-400 ring-2 ring-rose-100' : 'border-stone-100 hover:border-orange-200'}`}>
      
      {/* Badge de Recomendación de Salud */}
      {isRecommended && healthGoal && (
        <div className="bg-rose-500 text-white text-xs font-black py-1 px-3 text-center uppercase tracking-widest">
          ★ Recomendado para tu meta
        </div>
      )}

      <div className={`p-5 flex items-start justify-between bg-gradient-to-br ${type === 'perfect' ? 'from-emerald-50 to-white' : 'from-amber-50 to-white'}`}>
        <div className="flex items-center gap-4">
          <div className="text-5xl drop-shadow-sm transform group-hover:scale-110 transition-transform duration-300">{recipe.image}</div>
          <div>
            <div className="flex gap-1 mb-1">
              <span className="text-[10px] font-black text-stone-400 uppercase tracking-widest bg-stone-100 px-2 py-0.5 rounded-md">{recipe.category}</span>
              <span className="text-[10px] font-black text-orange-500 uppercase tracking-widest bg-orange-50 border border-orange-100 px-2 py-0.5 rounded-md">{recipe.calories} kcal</span>
            </div>
            <h3 className="font-black text-stone-800 text-lg leading-tight mt-1">{recipe.title}</h3>
          </div>
        </div>
        {type === 'perfect' && (
          <span className="bg-emerald-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-emerald-200 shadow-lg flex items-center gap-1">
            <Heart size={12} fill="currentColor" />
          </span>
        )}
        {type === 'partial' && (
           <span className="bg-white text-amber-600 border-2 border-amber-200 text-xs font-bold px-2 py-1 rounded-full">
             -{recipe.missingCount}
           </span>
        )}
      </div>

      <div className="p-5 flex-1">
        <div className="flex flex-wrap gap-2 mb-5">
          {recipe.tags && recipe.tags.map((tag, i) => (
            <span key={`tag-${i}`} className="text-[10px] font-bold px-2 py-1 bg-purple-50 text-purple-700 rounded-md border border-purple-100">
              {tag}
            </span>
          ))}
        </div>

        <div className="flex flex-wrap gap-2 mb-5">
          {recipe.existingIngredients.map((ing, i) => (
            <span key={i} className="text-xs font-bold px-2.5 py-1 bg-emerald-100 text-emerald-800 rounded-lg flex items-center gap-1.5 capitalize">
              <CheckCircle2 size={12} strokeWidth={3} /> {ing}
            </span>
          ))}
          {recipe.missingIngredients.map((ing, i) => (
            <span key={i} className="text-xs font-bold px-2.5 py-1 bg-red-100 text-red-800 rounded-lg flex items-center gap-1.5 border border-red-200 opacity-80 capitalize">
              <AlertCircle size={12} strokeWidth={3} /> {ing}
            </span >
          ))}
        </div>
      </div>

      <div className="p-4 bg-stone-50 border-t border-stone-100 flex gap-3">
        <button 
          onClick={() => viewRecipe(recipe)} // CAMBIO: Llama a la nueva vista
          className={`flex-1 py-3 text-sm font-bold rounded-xl transition-all active:scale-95 bg-white text-orange-500 shadow-sm border border-orange-100 hover:bg-orange-50 flex justify-center items-center gap-2`}
        >
          <BookOpen size={16} /> Ver Receta
        </button>
        {type === 'partial' && (
          <button onClick={onShop} className="flex-1 py-3 text-sm font-bold bg-amber-400 text-white hover:bg-amber-500 rounded-xl transition-all shadow-amber-200 shadow-md flex justify-center items-center gap-2 transform active:scale-95">
            <DollarSign size={16} strokeWidth={3} /> Comprar
          </button>
        )}
      </div>
    </div>
  );
}

function EmptyState({ icon, title, text, color, action }) {
  const colorClasses = {
    emerald: 'bg-emerald-50 border-emerald-200 text-emerald-700',
    amber: 'bg-amber-50 border-amber-200 text-amber-700',
  };

  return (
    <div className={`text-center py-16 px-6 rounded-3xl border-2 border-dashed ${colorClasses[color]} flex flex-col items-center`}>
      <div className="mb-4 transform animate-bounce">{icon}</div>
      <h3 className="text-xl font-black mb-2">{title}</h3>
      <p className="font-medium max-w-xs mx-auto opacity-80 mb-4">{text}</p>
      {action && (
        <button onClick={action} className="lg:hidden text-sm font-bold underline opacity-70 hover:opacity-100">
          Ir a Mi Refri
        </button>
      )}
    </div>
  );
}
