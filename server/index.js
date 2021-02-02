require('dotenv').config()
const express = require('express')
const massive = require('massive')
const session = require('express-session')
const authCtrl = require('./controllers/authController')
const bagCtrl = require('./controllers/bagController')
const prodCtrl = require('./controllers/productController')
const { SERVER_PORT,CONNECTION_STRING, SESSION_SECRET} = process.env
const app = express()

app.use(express.json())
app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: SESSION_SECRET,
    cookie: { maxAge:1000 * 60 * 60 * 24 * 365 }
}))

massive({
    connectionString: CONNECTION_STRING,
    ssl:{ rejectUnauthorized: false }
}).then(db => {
    app.set('db', db)
    console.log('db connected')
    app.listen(SERVER_PORT,() => console.log(`connected on port ${SERVER_PORT}`))
})

//Auth Endpoints
app.post('/auth/register', authCtrl.register)
app.post('/auth/login', authCtrl.login)
app.get('/auth/logout', authCtrl.logout)

//Bag Endpoints
app.get('/api/bag', bagCtrl.getBag)
app.post('api/bag',bagCtrl.addToBag)
app.put('api/bag', bagCtrl.changeQty)
app.delete('api/bag', bagCtrl.deleteItem)

//Product Endpoints
app.get('/api/product/:id', prodCtrl.getProduct)
app.get('/api/products', prodCtrl.getProducts)
app.post('/api/products', prodCtrl.addProduct)
app.put('api/product/:id', prodCtrl.updateProduct)
app.delete('api/product/:id', prodCtrl.deleteProduct)