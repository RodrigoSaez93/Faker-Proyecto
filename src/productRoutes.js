const express = require("express");
const ProductosCtrl = require("./controllers/ProductosCtrl");
const faker = require("faker");

const router = express.Router();

// Ahora en la ruta ingresar le paso los datos porque los voy a usar 
// la primera vez que cargue
router.get("/ingresar", async (req, res) => {
    const data = {};
    data.productos = await ProductosCtrl.getProductos();
    data.hayProductos = data.productos.length > 0;
    res.render("ingresar", data);
});

router.get("/vista", async (req, res) => {
    const data = {};
    data.productos = await ProductosCtrl.getProductos();
    data.hayProductos = data.productos.length > 0;
    res.render("vista", data);
});

router.get("/vista-test", (req, res) => {
    const data = {};
    const cantidad = ++req.query.cant || 0;
    data.productos = generarProductos(cantidad);
    data.hayProductos = cantidad !== 0;
    res.render("vista", data);
});

function generarProductos(cantidad) {
    const result = [];
    for(let i = 0; i < cantidad; i++) {
        const producto = {};
        producto.title = faker.commerce.product();
        producto.price = faker.commerce.price(10, 10000);
        producto.thumbnail = faker.image.food(100, 100);
        result.push(producto);
    }

    return result;
}

module.exports = router;