module.exports = {
    getInvoice: async(req, res) => {
        const db = req.app.get('db');
        const {user_id} = req.session.user;
        const {invoice_id} = req.params;
    
        if(!user_id){
            return res.status(409).send("Please log in")
           }
        const invoice = await db.invoices.get_invoice({invoice_id})
        // console.log(invoice)
        res.status(200).send(invoice)
    },
    createInvoice: async(req, res) => {
        const db = req.app.get('db');
        
        const {user_id,address_1,address_2,city,state,zip_code} = req.session.user;

        const { bag,bag_id} = req.body;
        // console.log(bag)
        const [invoice] = await db.invoices.create_invoice({user_id, bag_id, address_1, address_2, city, state, zip_code})
        const {invoice_id} = invoice
        // console.log(invoice)
        try {
        bag.forEach(async(item) => {
            const { product_id,quantity,size } = item
            await db.invoices.add_inv_item({invoice_id, product_id, quantity,size})
        })} catch(err) {console.log(err)}
        let finalInvoice = []
        setTimeout(async() => {
            finalInvoice = await db.invoices.get_invoice({invoice_id})
            // console.log(finalInvoice)
            res.status(200).send(finalInvoice)
        },1000)
        // req.session.user.last_invoice = invoice_id
        
        
    }
}

