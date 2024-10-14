export const platillos = [
    {
        id: 1,
        nombre: "Ensalada Cajún",
        tiempo: "30 min",
        precio: 55,
        personalizable: true,
        ingredientes: ["Pollo", "Lechuga", "Tomate", "Pimiento", "Cebolla", "Zanahoria"],
        descripcion: "Mezcla de lechugas, tomate y cebolla con pollo sazonado al estilo cajún, acompañado de pimientos frescos y zanahoria."
    },
    {
        id: 2,
        nombre: "Ensalada Curry con nuez de la India",
        tiempo: "30 min",
        precio: 55,
        personalizable: true,
        ingredientes: ["Pollo", "Lechuga", "Calabaza", "Pimiento", "Zanahoria", "Nuez de la India"],
        descripcion: "Lechugas frescas, zanahoria, calabacitas y pimiento rojo con pechuga de pollo asada en salsa curry y nuez de la India. Servida con nuestro aderezo de temporada Curry Ranch."
    },
    {
        id: 3,
        nombre: "Baguette",
        tiempo: "30 min",
        precio: 55,
        personalizable: false,
        ingredientes: [],
        descripcion: "Crujiente baguette relleno de jamón, queso, lechuga, tomate y aderezo de mostaza."
    },
    {
        id: 4,
        nombre: "Croissant",
        tiempo: "30 min",
        precio: 55,
        personalizable: false,
        ingredientes: [],
        descripcion: "Croissant horneado relleno de jamón, queso suizo y un toque de mantequilla."
    }
];

export const imagenes: { [key: number]: any } = {
    1: require("@/assets/images/platillos/ensalada_cajun.png"),
    2: require("@/assets/images/platillos/ensalada_curry.png"),
    3: require("@/assets/images/platillos/baguette.png"),
    4: require("@/assets/images/platillos/croissant.png"),
};
