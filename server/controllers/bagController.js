module.exports = {
    getBag: async(req, res) => {
       const db = req.app.get('db');
       const {user_id} = req.session.user;
       if(!user_id){
        return res.status(409).send("Please log in")
       }
    //    console.log(req.session.user)
       const bag = await db.bag.get_bag(user_id)
       res.status(200).send(bag)
    },
    addToBag: async(req, res) => {
        const db = req.app.get('db');
        const {user_id} = req.session.user;
        const {product_id, quantity,size} = req.body;

        // const uniqueProduct = await db.bag.check_bag(product_id)
        const bag = await db.bag.add_to_bag({product_id,quantity,user_id,size})
        res.status(200).send(bag)
    },
    updateBag: async(req, res) => {
        const db = req.app.get('db');
        const {user_id} = req.session.user;
        const{ quantity, bag_item_id,size,bag_id,product_id } = req.body
        console.log(size)
        const bagCheck = await db.bag.check_bag({bag_id , product_id, size})
        if(bagCheck[0]){
            console.log(bagCheck[0])
            return res.status(409).send("Item in size already available in Bag")
        }
        await db.bag.update_bag({quantity,size, bag_item_id})
        const updatedBag = await db.bag.get_bag(user_id)
        res.status(200).send(updatedBag)
    },
    deleteItem: (req, res) => {
        const db = req.app.get('db');
        const {user_id} = req.session.user;
        const {bag_item_id} = req.params;

        db.bag.delete_item({ bag_item_id})
        .then(async() => {
            const updatedBag = await db.bag.get_bag(user_id)
            console.log(updatedBag)
            res.status(200).send(updatedBag)
        })
        
    },
    clearBag: async(req, res) => {
        const db = req.app.get('db');
        const { bag_id } = req.params

        await db.bag.clear_bag({bag_id: +bag_id})
        res.status(200).send([])
    },
    getTotal: async(req, res) => {
        const db = req.app.get('db');
        const { bag_id } = req.params
        const [total] = await db.bag.get_total({bag_id: +bag_id})
        // console.log(total)
        res.status(200).send(total)
    }
}