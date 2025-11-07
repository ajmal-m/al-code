import { memo, useCallback, useState } from "react";


const Products = memo(() => {

    const [products, setProducts] = useState([
        { name: "Laptop", category: "Electronics", quantity: 12 },
        { name: "Smartphone", category: "Electronics", quantity: 0 },
        { name: "Bluetooth Speaker", category: "Electronics", quantity: 7 },
        { name: "Wireless Mouse", category: "Electronics", quantity: 15 },
        { name: "Keyboard", category: "Electronics", quantity: 0 },

        { name: "T-shirt", category: "Clothing", quantity: 30 },
        { name: "Jeans", category: "Clothing", quantity: 0 },
        { name: "Jacket", category: "Clothing", quantity: 9 },
        { name: "Socks", category: "Clothing", quantity: 40 },
        { name: "Sneakers", category: "Footwear", quantity: 0 },

        { name: "Coffee Mug", category: "Home & Kitchen", quantity: 18 },
        { name: "Blender", category: "Home & Kitchen", quantity: 0 },
        { name: "Water Bottle", category: "Home & Kitchen", quantity: 22 },
        { name: "Table Lamp", category: "Home & Kitchen", quantity: 3 },
        { name: "Wall Clock", category: "Home & Kitchen", quantity: 0 },

        { name: "Backpack", category: "Accessories", quantity: 11 },
        { name: "Watch", category: "Accessories", quantity: 0 },
        { name: "Sunglasses", category: "Accessories", quantity: 6 },
        { name: "Wallet", category: "Accessories", quantity: 10 },
        { name: "Belt", category: "Accessories", quantity: 0 },

    ]);

    // Move out of stock into array end
    const moveToOutStockEnd = useCallback(() => {
        try {
            let start = 0;
            let end =1;
            let len = products.length;
            let newProducts = [ ...products];

            while( start < len && end < len){

                if( newProducts[start].quantity === 0 && newProducts[end].quantity !== 0){
                    [  newProducts[start], newProducts[end] ] = [ newProducts[end] , newProducts[start]];
                    start++;
                    end++;
                    continue;
                }

                if( newProducts[start].quantity === 0 && newProducts[end].quantity === 0 ){
                    end++;
                }else{
                    start++;
                    end++;
                }

            }
            setProducts(newProducts);
        } catch (error) {
            console.log(error);
        }
    },[products]);



    // Move array end By splitting array
    const moveToOutStockMethod2 = useCallback(() => {
        try {
             const startTime = performance.now();
            let quantityProducts = [];
            let outofStockProducts = [];

            for(let product of products){
                if(product.quantity === 0){
                    outofStockProducts.push(product);
                }else{
                    quantityProducts.push(product);
                }
            }
            quantityProducts = quantityProducts.concat(outofStockProducts);
            setProducts(quantityProducts);
            const endTime = performance.now();
            const timeTaken = endTime- startTime;
            setTime( timeTaken);
        } catch (error) {
            console.log(error);
            
        }
    },[products])

    return(
        <div className="h-screen flex flex-col bg-black overflow-y-scroll">
            <div className="flex items-center justify-center my-2 gap-2">
                <button 
                    onClick={moveToOutStockEnd}
                    className="bg-green-900 text-sm font-medium text-white p-2 rounded cursor-pointer"
                >
                    Move Out of stock to End
                </button>
            </div>
            <div className="flex items-center gap-2 flex-wrap justify-center">
                {
                    products.map((product , index) => (
                        <div key={index} className="p-2 bg-blue-900 text-[white]">
                            <h1>{product.name}</h1>
                            <p className="text-sm">{product.category}</p>
                            {
                                product.quantity === 0 ? (
                                     <p className="text-red-700 font-bold italic">Out of stock</p>
                                ):(
                                     <p> <span className="italic font-bold">{product.quantity}</span> Items available</p>
                                )
                            }
                        </div>
                    ))
                }
            </div>
        </div>
    )
});

export default Products;