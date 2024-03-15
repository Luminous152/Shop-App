import initialRender from "./core/initialRender";
import listener from "./core/listener";

class Shop {
    init(){
        console.log("shop app start");
        initialRender();
        listener();
    }

}

export default Shop;