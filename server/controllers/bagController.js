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
        const {pId, quantity} = req.body;

        const entry = await db.bag.add_to_bag([user_id, pId, quantity])
        res.status(200).send(alert('Added to Bag'))
    },
    changeQty: async(req, res) => {
        const db = req.app.get('db');
        const {user_id} = req.session.user;
        const{ quantity, pId } = req.body

        const newqty = await db.bag.change_qty([quantity, user_id, pId])
        res.sendStatus(200)
    },
    deleteItem: async(req, res) => {
        const db = req.app.get('db');
        const {user_id} = req.session.user;
        const {pId} = req.body;

        const deleted = await db.bag.delete_item([pId, user_id])
        res.sendStatus(200)
    }
}