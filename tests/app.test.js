import { test } from 'node:test';
import assert from 'node:assert';
import request from 'supertest';

import app from '../src/app.js';

test('GET / should return welcome message', async () => {
    const response = await request(app).get('/');

    assert.strictEqual(response.status, 200);
    assert.strictEqual(response.body.message, 'Welcome to ShopEasy Lite - Version 2!');
});

test('GET /products should return all products', async () => {
    const response = await request(app).get('/products');

    assert.strictEqual(response.status, 200);
    assert.strictEqual(response.body.length, 5);
});

test('GET /products/1 should return a specific product', async () => {
    const response = await request(app).get('/products/1');

    assert.strictEqual(response.status, 200);
    assert.strictEqual(response.body.name, 'Wireless Mouse');
});

test('GET /products/100 should return 404', async () => {
    const response = await request(app).get('/products/100');

    assert.strictEqual(response.status, 404);
});