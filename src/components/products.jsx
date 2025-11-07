import { memo, useCallback, useMemo, useState } from "react";

const productCategories = [
    "Electronics",
    "Stationery",
    "Kitchen",
    "Home Decor",
    "Accessories",
    "Furniture",
    "Fitness",
    "Clothing"
]


// Product Item component
const ProductItem = memo(({ product , deleteConfirm , setDeleteConfirm ,deleteProduct , selectedProduct , setSelectedProduct , setUpdateName}) => {

    const toggleProduct = useCallback((e) => {
        const checked = e.target.checked;
        if(checked){
            setSelectedProduct(product.id);
            setUpdateName(product.name);
        }else{
            setSelectedProduct("");
        }
    },[product , setSelectedProduct, setUpdateName]);
    return(
        <div  className="p-2 bg-blue-900 text-[white] relative">
            <div className="absolute top-0 right-[2px] cursor-pointer">
                {
                    product.id === deleteConfirm ? (
                        <button 
                            className="bg-red-700 text-[9px] cursor-pointer"
                            onClick={deleteProduct}
                        >
                            confirm
                        </button>
                    ) : (
                        <button 
                            className="w-4 bg-red-700 text-[9px] cursor-pointer"
                            onClick={() => setDeleteConfirm(product.id)}
                        >
                            X
                        </button>
                    )
                }
            </div>
            <input
                type="checkbox" name="select-product" id="product-selection" 
                onChange={toggleProduct}
                checked={ selectedProduct === product.id }
            />
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
    )
})



const Products = memo(() => {

    const [products, setProducts] = useState( [
              { id: 1, name: "Laptop", category: "Electronics", quantity: 12, price: 75000 },
                { id: 2, name: "Headphones", category: "Electronics", quantity: 0, price: 1500 },
                { id: 3, name: "Smartphone", category: "Electronics", quantity: 8, price: 45000 },
                { id: 4, name: "Smartwatch", category: "Electronics", quantity: 5, price: 12000 },
                { id: 5, name: "Bluetooth Speaker", category: "Electronics", quantity: 15, price: 3500 },

                { id: 6, name: "Coffee Mug", category: "Kitchen", quantity: 20, price: 299 },
                { id: 7, name: "Notebook", category: "Stationery", quantity: 50, price: 50 },
                { id: 8, name: "Pen Set", category: "Stationery", quantity: 100, price: 120 },
                { id: 9, name: "Desk Lamp", category: "Home Decor", quantity: 10, price: 999 },
                { id: 10, name: "Water Bottle", category: "Kitchen", quantity: 0, price: 499 },

                { id: 11, name: "Backpack", category: "Accessories", quantity: 25, price: 2200 },
                { id: 12, name: "Sunglasses", category: "Accessories", quantity: 12, price: 1500 },
                { id: 13, name: "Gaming Mouse", category: "Electronics", quantity: 30, price: 2500 },
                { id: 14, name: "Office Chair", category: "Furniture", quantity: 7, price: 8500 },
                { id: 15, name: "Yoga Mat", category: "Fitness", quantity: 0, price: 799 },

                { id: 16, name: "Dumbbell Set", category: "Fitness", quantity: 18, price: 3200 },
                { id: 17, name: "Electric Kettle", category: "Kitchen", quantity: 6, price: 1499 },
                { id: 18, name: "Bookshelf", category: "Furniture", quantity: 4, price: 10500 },
                { id: 19, name: "T-shirt", category: "Clothing", quantity: 40, price: 399 },
                { id: 20, name: "Jeans", category: "Clothing", quantity: 0, price: 899 }
        ]
    );

    const [originalProducts] = useState(products);

    const [priceRange, setPriceRange] = useState({ min:0 , max:0});

    const [deleteConfirm, setDeleteConfirm] = useState("");

    const [ updatedName, setUpdatedName] = useState("");

    const [selectedProduct, setSelectedProduct] = useState("");


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

    // Total Product price
    const totalProductPrice = useMemo(() => {
        return  products.reduce((acc, product) => (acc  + product.price), 0);
    },[products])

    // Total product Quantity
    const totalProductQuantity = useMemo(() => {
        return products.reduce((acc, product) => (acc  + product.quantity), 0);
    },[products]);


    // Sort product Items By Price
    const sortProductsByPrice = useCallback(() => {
        setProducts( prevProduct=> [ ...prevProduct].sort((a,b) => (b.price-a.price)) );
    }, [products]);


    // Reset Product List
    const resetProducts = useCallback(() => {
        setProducts(originalProducts);
    },[products]);

    // Delete products
    const deleteProduct = useCallback(() => {
       try {
        const newProducts = [...products].filter((p) => p.id !== deleteConfirm);
        setProducts(newProducts);
       } catch (error) {
        console.log(error);
       } 
    },[deleteConfirm, products])

    const filterProductByCategory = useCallback((e) => {
        setProducts(() => [...products].filter((p) => p.category === e.target.value ));
    },[products]);

    // Update product name
    const updateProductName = useCallback((e) => {
        setProducts(() => (
            [...products].map((p) => {
                if(p.id === selectedProduct){
                    return { ...p, name: updatedName};
                }else{
                    return p;
                }
            })
        ))
    },[products , updatedName]);


    const setUpdateName = useCallback((val) => {
        setUpdatedName(val);
    },[updatedName])

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

                 <button 
                    onClick={sortProductsByPrice}
                    className="bg-green-900 text-sm font-medium text-white p-2 rounded cursor-pointer"
                >
                    Sort
                </button>

                 <button 
                    onClick={resetProducts}
                    className="bg-green-900 text-sm font-medium text-white p-2 rounded cursor-pointer"
                >
                    Reset
                </button>

                <select 
                    name="categories" id="category-select"
                    className="w-20 h-10 bg-blue-900 text-white"
                    onChange={filterProductByCategory}
                >
                    <option value="">All category</option>
                    {
                        productCategories.map((cat) => (
                             <option value={cat} key={cat}>{cat}</option>
                        ))
                    }
                </select>

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
                        <ProductItem 
                            key={index} product={product} deleteProduct={deleteProduct} 
                            deleteConfirm={deleteConfirm} setDeleteConfirm={setDeleteConfirm} 
                            selectedProduct={selectedProduct}
                            setSelectedProduct={setSelectedProduct}
                            setUpdateName={setUpdateName}
                        />
                    ))
                }
            </div>

           {
            selectedProduct && (
                <div>
                    <input 
                        type="text" name="product-name" id="product-name"   
                        className="h-10 bg-blue-900 font-bold font-medium text-white ml-1 rounded"
                        placeholder="new product name"
                        value={updatedName}
                        onChange={(e) => setUpdatedName(e.target.value)}
                    />
                    <button onClick={updateProductName}  className="w-30 h-10 bg-blue-900 font-bold font-medium text-white ml-1 rounded">Submit</button>
                </div>
            )
           }
        </div>
    )
});

export default Products;