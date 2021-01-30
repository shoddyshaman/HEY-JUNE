module.exports = {
    getBag: async(req, res) => {
       const db = req.app.get('db');
       const {id} = req.params;
       const cart = await db.bag.get_bag()
    },
    addToBag: async(req, res) => {

    },
    changeQty: async(req, res) => {

    },
    deleteBag: async(req, res) => {

    }
}