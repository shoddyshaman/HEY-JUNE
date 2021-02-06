module.exports = {
    getBag: async(req, res) => {
       const db = req.app.get('db');
       const {user_id} = req.session.user;
       
       
       const bag = await db.bag.get_bag(user_id)
       res.status(200).send(bag)
    },
    addToBag: async(req, res) => {
        const db = req.app.get('db');
        const {user_id} = req.session.user;
        const {product_id, quantity,size} = req.body;

        const entry = await db.bag.add_to_bag([product_id,quantity,user_id,size])
        res.status(200).send(alert('Added to Bag'))
    },
    changeQty: async(req, res) => {
        const db = req.app.get('db');
        const {user_id} = req.session.user;
        const{ quantity, product_id } = req.body

        const newqty = await db.bag.change_qty([quantity, user_id, product_id])
        res.sendStatus(200)
    },
    deleteItem: async(req, res) => {
        const db = req.app.get('db');
        const {user_id} = req.session.user;
        const {product_id} = req.body;

        const deleted = await db.bag.delete_item([product_id, user_id])
        res.sendStatus(200)
    }
}