document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM fully loaded and parsed for index');

    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    const updateCartCount = () => {
        const cartCount = cart.reduce((total, product) => total + product.quantity, 0);
        const cartCountElement = document.getElementById('cart-count');
        if (cartCountElement) {
            cartCountElement.textContent = cartCount;
        }
    };

    const addProductToCart = (productId, productPrice, productName, productImage, quantity = 1) => {
        let product = cart.find(p => p.id === productId);
        if (product) {
            product.quantity += quantity;
        } else {
            cart.push({ id: productId, price: productPrice, name: productName, imagePath: productImage, quantity: quantity });
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
    };

    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', () => {
            console.log('Add to Cart button clicked');
            let productId = parseInt(button.getAttribute('data-id'));
            let productPrice = parseFloat(button.getAttribute('data-price'));
            let productName = button.getAttribute('data-name');
            let productImage = button.getAttribute('data-image');
            console.log(`Product added: ${productName}, ID: ${productId}, Price: ${productPrice}`);
            addProductToCart(productId, productPrice, productName, productImage, 1);
        });
    });

    updateCartCount();
});

<><script src="~/assets/js/index.js"></script><script src="~/assets/js/cart.js"></script></>