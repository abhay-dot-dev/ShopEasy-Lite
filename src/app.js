import express from 'express';
import products from './products.js'

const app = express();

// Middleware
app.use(express.json());

// Home route
app.get('/', (req, res) => {
    res.status(200).json({
        message: 'Welcome to ShopEasy Lite!'
    });
});

app.get('/products', (req, res) => {
    res.status(200).json(products);
})

app.get('/products/:id', (req, res) => {
    const { id } = req.params;
    try {
        const product = products.find((p) => {
            if (p.id === Number(id)) {
                return p;
            }
        })

        if (!product) {
            res.status(404).json({ "message": "product not found!" });
            return;
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ Error: error })
    }

})

export default app;