import { useState } from 'react'

function App() {

  const [itemCount, setItemCount] = useState(0);

  const [stores, setStores] = useState( new Array(5).fill({
      items:[],
      totalQuantity:0
    }));


  const addItems = () => {
    let lesssQuantityStoreIndex = 0;
    let lessQuantity = stores[0].totalQuantity || 0;

    for(let storeIndex = 0; storeIndex < stores.length; storeIndex++) {
      if(stores[storeIndex]?.totalQuantity < lessQuantity){
        lessQuantity = stores[storeIndex]?.totalQuantity;
        lesssQuantityStoreIndex = storeIndex;
      }
    }


      const newStores = [...stores];

      const targetStore = newStores[lesssQuantityStoreIndex];

      targetStore.items.push({ quantity: itemCount, itemId: targetStore.items.length + 1 });

      targetStore.totalQuantity += itemCount;

      newStores[lesssQuantityStoreIndex] = targetStore;

      setStores(newStores);

  };

  return (
    <>
      <div style={{ display: "flex", justifyContent:"center"}}>
        <input
          type="number"
          placeholder="Type something..."
          onChange={(e) => setItemCount(Number(e.target.value))}
          value={itemCount}
        />
        <button onClick={() => addItems()}>Add</button>
      </div>

      {/* Stores */}
      <div style={{ display:"flex", justifyContent:"center", gap:"12px"}}>
        {
          stores.map((store) => (
            <div  style={{ width:"200px", border:"1px solid black", borderRadius:"8px", padding:"8px"}} key={store.id}>
              <h2>Store {store.id}</h2>
              <div>
                {store.items.map((item) => (
                  <div key={item.itemId}  style={{  border:"1px solid black",backgroundColor:"#f0f0f0", borderRadius:"4px", padding:"4px", marginBottom:"4px", display:"flex", justifyContent:"space-between"}}>
                    <span>Item {item.itemId} : </span>
                    <p>{item.quantity}</p>
                  </div>
                ))}
              </div>
            </div>
          ))
           
        }
      </div>
    </>
  )
}

export default App
