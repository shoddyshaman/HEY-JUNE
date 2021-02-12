require('dotenv').config()
const express = require('express')
const massive = require('massive')
const session = require('express-session')
const authCtrl = require('./controllers/authController')
const bagCtrl = require('./controllers/bagController')
const prodCtrl = require('./controllers/productController')
const invctrl = require('./controllers/invoiceController')
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
app.get('/auth/me', authCtrl.getUser)

//Bag Endpoints
app.get('/api/bag', bagCtrl.getBag)
app.post('/api/bag/add',bagCtrl.addToBag)
app.put('/api/bag', bagCtrl.updateBag)
app.get('/api/bag/total/:bag_id', bagCtrl.getTotal)
app.delete('/api/bag/:bag_id',bagCtrl.clearBag)
app.delete('/api/bag_item/:bag_item_id', bagCtrl.deleteItem)

//Product Endpoints
app.get('/api/product/:product_id', prodCtrl.getProduct)
app.get('/api/products', prodCtrl.getProducts)
app.post('/api/products', prodCtrl.addProduct)
app.put('/api/product/:product_id', prodCtrl.updateProduct)
app.delete('/api/product/:product_id', prodCtrl.deleteProduct)

//Invoice endpoints
app.post('/api/invoice',invctrl.createInvoice)
app.get('/api/invoice/:invoice_id',invctrl.getInvoice)


//stripe
const stripe = require('stripe')('sk_test_51IJM2nCrvY2fBYe0Aqf0szFyVaehKT0lKM9GuqnX5T5k4vHTtTgUM1Ytc6xyr1t02X4yAVZunH6xbwpHLlLfHjUx00YUGGNfNK')

//stripe endpoints
app.post('/create-checkout-session/:total', async (req, res) => {
  const {total} = req.params
  console.log(total)
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: 'T-shirt',
          },
          unit_amount: +total *100,
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: 'https://www.heyjunekids.com/#/invoice?session_id={CHECKOUT_SESSION_ID}',
    cancel_url: 'https://example.com/cancel',
  });

  res.json({ id: session.id });
});

//AWS S3
const aws = require('aws-sdk');

const {
    S3_BUCKET,
    AWS_ACCESS_KEY_ID,
    AWS_SECRET_ACCESS_KEY
} = process.env

app.get('/sign-s3', (req, res) => {

  aws.config = {
    region: 'us-west-1',
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_ACCESS_KEY
  }
  
  const s3 = new aws.S3();
  const fileName = req.query['file-name'];
  const fileType = req.query['file-type'];
  const s3Params = {
    Bucket: S3_BUCKET,
    Key: fileName,
    Expires: 60,
    ContentType: fileType,
    ACL: 'public-read'
  };

  s3.getSignedUrl('putObject', s3Params, (err, data) => {
    if(err){
      console.log(err);
      return res.end();
    }
    const returnData = {
      signedRequest: data,
      url: `https://${S3_BUCKET}.s3.amazonaws.com/${fileName}`
    };

    return res.send(returnData)
  });
});