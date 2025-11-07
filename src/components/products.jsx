import { memo, useCallback, useMemo, useState } from "react";


const Products = memo(() => {

    const [products, setProducts] = useState( [
  { name: "Laptop", category: "Electronics", quantity: 12, price: 75000 },
  { name: "Headphones", category: "Electronics", quantity: 0, price: 1500 },
  { name: "Smartphone", category: "Electronics", quantity: 8, price: 45000 },
  { name: "Smartwatch", category: "Electronics", quantity: 5, price: 12000 },
  { name: "Bluetooth Speaker", category: "Electronics", quantity: 15, price: 3500 },
  { name: "Coffee Mug", category: "Kitchen", quantity: 20, price: 299 },
  { name: "Notebook", category: "Stationery", quantity: 50, price: 50 },
  { name: "Pen Set", category: "Stationery", quantity: 100, price: 120 },
  { name: "Desk Lamp", category: "Home Decor", quantity: 10, price: 999 },
  { name: "Water Bottle", category: "Kitchen", quantity: 0, price: 499 },
  { name: "Backpack", category: "Accessories", quantity: 25, price: 2200 },
  { name: "Sunglasses", category: "Accessories", quantity: 12, price: 1500 },
  { name: "Gaming Mouse", category: "Electronics", quantity: 30, price: 2500 },
  { name: "Office Chair", category: "Furniture", quantity: 7, price: 8500 },
  { name: "Yoga Mat", category: "Fitness", quantity: 0, price: 799 },
  { name: "Dumbbell Set", category: "Fitness", quantity: 18, price: 3200 },
  { name: "Electric Kettle", category: "Kitchen", quantity: 6, price: 1499 },
  { name: "Bookshelf", category: "Furniture", quantity: 4, price: 10500 },
  { name: "T-shirt", category: "Clothing", quantity: 40, price: 399 },
  { name: "Jeans", category: "Clothing", quantity: 0, price: 899 },
]
);

    const [priceRange, setPriceRange] = useState({ min:0 , max:0})


    // Update the price ranges
    const updatePriceRange = useCallback((e) => {
        try {
           const { name, value} = e.target;
           setPriceRange(_ => ({ ...priceRange , [name] : Number(value)}));
        } catch (error) {
            console.log(error);
        }
    },[ priceRange]);


    const filterProductsByPrice = useCallback(() => {
        try {
            const newProducts = products.filter((p) => (p.price >= (priceRange.min ?? 0) && p.price <= (priceRange.max ?? Infinity)));
            setProducts(newProducts)
        } catch (error) {
            console.log(error);
        }
    }, [priceRange, products])

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
    },[products]);


    const totalProductPrice = useMemo(() => {
        return  products.reduce((acc, product) => (acc  + product.price), 0);
    },[products])


    const totalProductQuantity = useMemo(() => {
        return products.reduce((acc, product) => (acc  + product.quantity), 0);
    },[products])



    return(
        <div className="h-screen flex flex-col bg-black overflow-y-scroll">
            <div className="flex items-center justify-center my-2 gap-2">
                <p className="text-white font-medium font-bold"> Total Price : $ {totalProductPrice}</p>
                <p className="text-white font-medium font-bold ml-3"> Total Quantity : {totalProductQuantity}</p>

                <button 
                    onClick={moveToOutStockEnd}
                    className="bg-green-900 text-sm font-medium text-white p-2 rounded cursor-pointer"
                >
                    Move Out of stock to End
                </button>

               <div>
                    <label className="text-white" htmlFor="min-price">Min price</label>
                    <input 
                        type="number" name="min" 
                        id="min-price" value={priceRange.min} 
                        className="w-10 h-10 bg-blue-900 font-bold font-medium text-white ml-1"
                        onChange={updatePriceRange}
                    />
               </div>
               <div>
                    <label className="text-white" htmlFor="max-price">Max Price</label>
                    <input 
                        type="number" name="max" 
                        id="max-price" value={priceRange.max} 
                        className="w-10 h-10 bg-blue-900 font-bold font-medium text-white ml-1"
                        onChange={updatePriceRange}
                    />
               </div>

               <button
                className="h-10 bg-blue-900 font-bold font-medium text-white ml-1 px-1 cursor-pointer"
                onClick={filterProductsByPrice}
               >Filter</button>
            </div>
            <div className="flex items-center gap-2 flex-wrap justify-center">
                {
                    products.map((product , index) => (
                        <div key={index} className="p-2 bg-blue-900 text-[white]">
                            <h1>{product.name}</h1>
                            <p className="text-sm">{product.category}</p>
                            <p>$ {product.price}</p>
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