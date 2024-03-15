import Swal from "sweetalert2";
import { cartCount, cartItemCount, cartItemTemplate, cartTotal, productGroup } from "../core/selector";


export const createCartItem = (product,quantity) => {
    const template = cartItemTemplate.content.cloneNode(true)
    template.querySelector(".cart-item").setAttribute("cart-product-id",product.id)
    template.querySelector(".cart-item-img").src = product.image;
    template.querySelector(".cart-item-title").innerText = product.title;
    template.querySelector(".cart-item-price").innerText = product.price;
    template.querySelector(".cart-quantity").innerText = quantity;
    template.querySelector(".cart-item-cost").innerText = product.price * quantity;
    return template;
};


export const countCartItem = () => {
    const totalItemInCart = document.querySelectorAll(".cart-item");
    return  totalItemInCart.length;
};

export const updateCartItemCount = () => {
    const currentTotal = countCartItem();
    cartCount.innerText = currentTotal;
    cartItemCount.innerText = currentTotal;
};

export const calculateCartCostTotal = () => {
    const total = [...document.querySelectorAll(".cart-item-cost")].reduce((pv,cv) => pv + parseFloat(cv.innerText),0);
    return total;
}

export const updateCartTotal = () => {
    const total = calculateCartCostTotal().toFixed(2);
    cartTotal.innerText = total;
};

export const handleCartItemGroup = (event) => {
    if(event.target.classList.contains("cart-item-remove")){
        const currentCart = event.target.closest(".cart-item");
        const  currentProductId = currentCart.getAttribute("cart-product-id");
       
       
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
          }).then((result) => {
     
            if (result.isConfirmed) {
              currentCart.remove();
              updateCartItemCount();
              updateCartTotal();
              const currentProduct = productGroup.querySelector(`[product-id = '${currentProductId}']`);
                if(currentProduct){
                    
              const currentProductAddCartBtn = currentProduct.querySelector(".product-add-cart-btn");
              currentProductAddCartBtn.removeAttribute("disabled");
              currentProductAddCartBtn.innerText = "Add to Cart";
                }
            }
          });
          
    }else if(event.target.classList.contains("cart-q-add")){
     const currentCartItem = event.target.closest(".cart-item");
     const currentCartItemCost = currentCartItem.querySelector(".cart-item-cost");
     const currentCartItemPrice = currentCartItem.querySelector(".cart-item-price");
     const currentCartItemQuantity = currentCartItem.querySelector(".cart-quantity");

     currentCartItemQuantity.innerText = parseInt(currentCartItemQuantity.innerText) + 1;
     currentCartItemCost.innerText = Math.round(currentCartItemPrice.innerText * currentCartItemQuantity.innerText);

     updateCartTotal();

    }else if(event.target.classList.contains("cart-q-sub")){
        const currentCartItem = event.target.closest(".cart-item");
     const currentCartItemCost = currentCartItem.querySelector(".cart-item-cost");
     const currentCartItemPrice = currentCartItem.querySelector(".cart-item-price");
     const currentCartItemQuantity = currentCartItem.querySelector(".cart-quantity");
            if(currentCartItemQuantity.innerText > 1){
                currentCartItemQuantity.innerText = parseInt(currentCartItemQuantity.innerText) - 1;
     currentCartItemCost.innerText = Math.round(currentCartItemPrice.innerText * currentCartItemQuantity.innerText);
            }
     
    }
}