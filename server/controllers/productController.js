module.exports = {
    getProducts: async(req, res) => {
        const db = req.app.get('db');

        const allProducts = await db.products.get_all_products();
        res.status(200).send(allProducts);
    },
    getProduct: async(req, res) => {
        const db = req.app.get('db');
        const { pId } = req.params;

        const product = await db.products.get_product(pId);
    },
    addProduct: async(req, res) => {
        const db = req.app.get('db');
        const { productName, price, productImg, category, description } = req.body;

        const addProduct = await db.products.add_product({productName, price,productImg, category, description})
        res.status(200).send('Product Added successfully')
    },
    deleteProduct: async(req, res) => {
        const db = req.app.get('db');
        const { pId } = req.params;

        const deleteProduct = await db.products.delete_product(pId)
        res.sendStatus(200)
    },
    updateProduct: async(req, res) => {
        
    }
}