module.exports = {
    getProducts: async(req, res) => {
        const db = req.app.get('db');

        const allProducts = await db.products.get_all_products();
        res.status(200).send(allProducts);
    },
    getProduct: async(req, res) => {
        const db = req.app.get('db');
        const { product_id } = req.params;

        const [product] = await db.products.get_product(+product_id);
        res.status(200).send(product)
    },
    addProduct: async(req, res) => {
        const db = req.app.get('db');
        const { productName, price, productImage, category, description } = req.body;
        if(price === 0){
            return res.status(400).send('price cannot be zero')
        }
        const addedProduct = await db.products.add_product({productName, price,productImage, category, description})
        res.status(200).send(addedProduct)
    },
    deleteProduct: async(req, res) => {
        const db = req.app.get('db');
        const { product_id } = req.params;

        await db.products.delete_product(+product_id)
        res.sendStatus(200)
    },
    updateProduct: async(req, res) => {
        
    }
}