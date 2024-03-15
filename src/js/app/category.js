import { products } from "../core/data";
import { categoryGroup, categoryTemplate, productGroup } from "../core/selector";
import { renderProduct } from "./product";

export const createCategory = (categoryName) => {
    const template = categoryTemplate.content.cloneNode(true);
    template.querySelector(".cat-btn").innerText = categoryName;
    return template
    };

export const renderCategory = (categories) => {
    categories.forEach( cat => categoryGroup.append(createCategory(cat)));
};

export const handleCategoryGroup = (event) => {
    productGroup.innerHTML = ""; 
    if(event.target.classList.contains("cat-btn")){
        const currentCategoryBtn = event.target;
        document.querySelector(".cat-btn.active")?.classList.remove("active");
        currentCategoryBtn.classList.add("active");


        const currentCategory = event.target.innerText;
        renderProduct(products.filter(el => 
            el.category === currentCategory || currentCategory === 'All'
        ))
    }
}

