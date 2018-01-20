const cart = require('./cart')
const cars = require('./data/cars.js')

describe('Cart Properties:', function () {
    test("Tests Cart Property", () => {
        expect(Array.isArray(cart.cart)).toEqual(true);
        expect(cart.cart.length).toEqual(0);
        expect(cart.cart).toEqual([]);
    })

    test("cart total", () => {
        expect(cart.total).toEqual(0);
    })

    test('oldCart should default to an empty array', function () {
        expect(Array.isArray(cart.oldCart)).toEqual(true);
        expect(cart.oldCart).toEqual([]);
        expect(cart.oldCart.length).toEqual(0);
    });

    test('oldTotal should default to 0.', function () {
        expect(cart.oldTotal).toEqual(0);
    });
});

describe('Cart Methods:', function () {
    afterEach(function () {
        cart.cart = [];
        cart.total = 0;
        cart.oldCart = [];
        cart.total = 0;
    });

    test('addToCart method', () => {
        cart.addToCart(cars[0]);
        expect(cart.cart.length).toEqual(1);
        expect(cart.cart[0]).toEqual(cars[0]);
        expect(cart.total).toEqual(cars[0].price);
    })

    test('removeFromCart', () => {

        cart.addToCart(cars[0]);
        cart.addToCart(cars[1]);
        cart.addToCart(cars[2]);

        cart.removeFromCart(0, cars[0]);
        expect(cart.cart.length).toEqual(2);
        expect(cart.total).toEqual(cars[1].price + cars[2].price);
    })

    test('checkOut', function () {

        cart.addToCart(cars[0]);
        cart.addToCart(cars[1]);
        cart.checkout();

        expect(cart.cart.length).toEqual(0);
        expect(cart.total).toEqual(0);
    }
    )

    test('checkOut', function () {
        cart.addToCart(cars[0])
        cart.addToCart(cars[1])
        cart.addToCart(cars[2])
        cart.addToCart(cars[3])
        cart.checkout();
        expect(cart.oldCart.length).toEqual(4);
        expect(cart.oldCart[0]).toEqual(cars[0]);
        expect(cart.oldTotal).toEqual(cars[0].price + cars[1].price + cars[2].price + cars[3].price);

    });

    test('failedCharge() equals oldCart and oldTotal', function () {
        cart.oldCart.push(cars[0]);
        cart.oldCart.push(cars[1]);
        cart.oldCart.push(cars[2]);
        cart.oldCart.push(cars[3]);
        cart.oldTotal = cars[0].price + cars[1].price + cars[2].price + cars[3].price;

        cart.failedCharge();

        expect(cart.cart.length).toEqual(4);
        expect(cart.cart[0]).toEqual(cars[0]);
        expect(cart.total).toEqual(cars[0].price + cars[1].price + cars[2].price + cars[3].price);
    });

    test('failedCharge() empties old Cart and total', () => {
        cart.oldCart.push(cars[0]);
        cart.oldCart.push(cars[1]);
        cart.oldCart.push(cars[2]);
        cart.oldCart.push(cars[3]);
        cart.oldTotal = cars[0].price + cars[1].price + cars[2].price + cars[3].price;

        cart.failedCharge();

        expect(cart.oldCart.length).toEqual(0);
        expect(cart.oldTotal).toEqual(0);
    });


});