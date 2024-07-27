const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const Product = require('./models/products');
const { NOT_FOUND, BAD_REQUEST, OK } = require('http-status');
const Purchase = require('./models/purchase');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(cookieParser());
let server;
async function bootstrap() {
    server = await mongoose.connect(process.env.DB_URI, { dbName: 'fit-mart' });
    console.log('Database successfully connected.');

    app.listen(port, () => {
        console.log(`Server running on port: ${port}`);
    })
    // Route for fetch all products
    app.get('/products', async (req, res, next) => {
        try {
            const { search, categories, maxPrice, minPrice, sort, skip, limit } = req?.query;
            const queryObj = {};

            if (search) {
                queryObj.$text = { $search: search };
            }

            if (categories) {
                const categoriesArr = categories.split(',');
                queryObj.category = { $in: categoriesArr };
            }

            if (maxPrice && minPrice) {
                queryObj.price = { $gte: minPrice, $lte: maxPrice }
            }

            const foundProducts = await Product.find(queryObj).sort({ price: Number(sort ?? 1) }).skip(Number(skip) ?? 0).limit(Number(limit ? limit : null));

            res.status(OK).json({
                success: true,
                statusCode: OK,
                message: 'Products successfully retrieved.',
                data: foundProducts
            })
        } catch (error) {
            next(error);
        }
    })
    // Route for fetch single product
    app.get('/products/:id', async (req, res, next) => {
        try {
            const foundProducts = await Product.findOne({ _id: req?.params?.id })

            res.status(OK).json({
                success: true,
                statusCode: OK,
                message: 'Product successfully retrieved.',
                data: foundProducts
            })
        } catch (error) {
            next(error);
        }
    })
    // Route for create new product
    app.post('/products', async (req, res, next) => {
        try {
            const data = new Product(req.body);
            const result = await data.save();
            res.status(OK).json({
                success: true,
                statusCode: OK,
                message: 'Product created successfully.',
                data: 'result'
            })
        } catch (error) {
            next(error);
        }
    })
    // Route for update single product
    app.put('/products/:id', async (req, res, next) => {
        try {
            const id = req.params?.id;

            const result = await Product.findByIdAndUpdate(id, req.body, { new: true });

            res.status(OK).json({
                success: true,
                statusCode: OK,
                message: 'Product updated successfully.',
                data: result
            })
        } catch (error) {
            next(error);
        }
    })
    // Route for delete product
    app.delete('/products/:id', async (req, res, next) => {
        try {
            const id = req.params?.id;

            const result = await Product.findByIdAndDelete(id);

            res.status(OK).json({
                success: true,
                statusCode: OK,
                message: 'Product deleted successfully.'
            })
        } catch (error) {
            next(error);
        }
    })

    app.post('/purchase', async (req, res, next) => {
        try {
            const carts = req?.body?.products;
            const productIds = req?.body?.products?.map(cart => {
                return (cart.product);
            });
            const data = new Purchase(req.body);
            const result = await data.save();

            const findProducts = await Product.find({
                _id: { $in: productIds }
            })

            const bulkOps = findProducts.map(product => {
                const cart = carts.find(cart => cart.product.toString() === product._id.toString());

                if (cart) {
                    const newQuantity = Number(product.stockQuantity) - Number(cart.quantity);

                    return ({
                        updateOne: {
                            filter: { _id: product._id },
                            update: { $set: { stockQuantity: newQuantity } }
                        }
                    })
                }
            })

            await Product.bulkWrite(bulkOps);

            res.status(OK).json({
                success: true,
                statusCode: OK,
                message: 'Your order has been approved.',
                data: result
            })
        } catch (error) {
            next(error);
        }
    })

    // Path error handler
    app.use('*', (req, res) => {
        res.status(NOT_FOUND).json({
            success: false,
            statusCode: NOT_FOUND,
            message: 'Not Found',
        });
    })

    // Global error handler
    app.use((err, req, res, next) => {
        res.status(BAD_REQUEST).json({
            success: false,
            statusCode: BAD_REQUEST,
            message: err?.message ?? 'An error occurred.',
        });
    })
}

bootstrap()


// Handle Unhandled Promise Rejections
process.on('unhandledRejection', (reason, promise) => {
    console.log('😈 Shutting down the server due to unhandled rejection....');
    if (server) {
        server.close(() => {
            process.exit(1);
        });
    } else {
        process.exit(1);
    }
});

// Handle Uncaught Exceptions
process.on('uncaughtException', (err) => {
    console.log('😈 Shutting down the server due to uncaught exception....');
    if (server) {
        server.close(() => {
            process.exit(1);
        });
    } else {
        process.exit(1);
    }
});