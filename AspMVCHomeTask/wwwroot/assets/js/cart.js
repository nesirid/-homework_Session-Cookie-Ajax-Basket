document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM fully loaded and parsed for cart');

    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    console.log('Loaded cart from localStorage:', cart);

    const updateCartCount = () => {
        const cartCount = cart.reduce((total, product) => total + product.quantity, 0);
        const cartCountElement = document.getElementById('cart-count');
        if (cartCountElement) {
            cartCountElement.textContent = cartCount;
        }
    };

    const updateCartDisplay = () => {
        console.log('Updating cart display');
        const cartTableBody = document.querySelector('#cart-body');
        if (!cartTableBody) {
            console.log('cart-body not found');
            return;
        }
        cartTableBody.innerHTML = '';
        let total = 0;

        cart.forEach(product => {
            let productTotal = product.price * product.quantity;
            total += productTotal;
            console.log(`Displaying product: ${product.name}, Quantity: ${product.quantity}, Total: ${productTotal}`);
            cartTableBody.innerHTML += `
                <tr data-id="${product.id}" data-price="${product.price}">
                    <td class="product-thumbnail"><img src="${product.imagePath}" alt="Image" class="img-fluid"></td>
                    <td class="product-name"><h2 class="h5 text-black">${product.name}</h2></td>
                    <td>$${product.price.toFixed(2)}</td>
                    <td>
                        <div class="input-group mb-3 d-flex align-items-center quantity-container" style="max-width: 120px;">
                            <div class="input-group-prepend">
                                <button class="btn btn-outline-black decrease" type="button">&minus;</button>
                            </div>
                            <input type="text" class="form-control text-center quantity-amount" value="${product.quantity}" aria-label="Quantity" readonly>
                            <div class="input-group-append">
                                <button class="btn btn-outline-black increase" type="button">&plus;</button>
                            </div>
                        </div>
                    </td>
                    <td class="product-total">$${productTotal.toFixed(2)}</td>
                    <td><button type="button" class="btn btn-black btn-sm remove-product">X</button></td>
                </tr>
            `;
        });

        document.querySelector('#cart-total').innerText = `$${total.toFixed(2)}`;
        document.querySelector('#cart-subtotal').innerText = `$${total.toFixed(2)}`;
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
    };

    const addProductToCart = (productId, productPrice, productName, productImage, quantity = 1) => {
        let product = cart.find(p => p.id === productId);
        if (product) {
            product.quantity += quantity;
        } else {
            cart.push({ id: productId, price: productPrice, name: productName, imagePath: productImage, quantity: quantity });
        }
        updateCartDisplay();
    };

    const cartBody = document.querySelector('#cart-body');
    if (cartBody) {
        cartBody.addEventListener('click', (event) => {
            if (event.target.classList.contains('remove-product')) {
                let productId = parseInt(event.target.closest('tr').getAttribute('data-id'));
                cart = cart.filter(product => product.id !== productId);
                updateCartDisplay();
            }

            if (event.target.classList.contains('increase')) {
                let row = event.target.closest('tr');
                let productId = parseInt(row.getAttribute('data-id'));
                let productPrice = parseFloat(row.getAttribute('data-price'));
                let productName = row.querySelector('.product-name').textContent.trim();
                let productImage = row.querySelector('.product-thumbnail img').getAttribute('src');
                addProductToCart(productId, productPrice, productName, productImage, 1);
            } else if (event.target.classList.contains('decrease')) {
                let row = event.target.closest('tr');
                let productId = parseInt(row.getAttribute('data-id'));
                let product = cart.find(p => p.id === productId);
                if (product && product.quantity > 1) {
                    product.quantity -= 1;
                    updateCartDisplay();
                }
            }
        });
    } else {
        console.log('cart-body not found on this page');
    }

    updateCartDisplay();
});

