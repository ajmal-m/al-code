import { useState } from "react";

const App = () => {

  const [itemCount, setItemCount] = useState(0);

  const [counters, setCounters] = useState(new Array(5).fill( {
    customers:[
      // Array of item count of customers
    ],
    totalItems:0
  }));


  const addCustomerToCounter = () => {
    let lessItemCounterIndex = 0;
    for(let counterIndex=0; counterIndex< counters.length; counterIndex++){
      if(counters[counterIndex].totalItems < counters[lessItemCounterIndex].totalItems){
        lessItemCounterIndex = counterIndex;
      }
    }

    const newCounters = counters.map((counter, counterNumber) => {
      if(counterNumber === lessItemCounterIndex){
        return {
          ...counter,
          customers: [ ... counter.customers, Number(itemCount)],
          totalItems: counter.totalItems + Number(itemCount)
        }
      }
      return counter
    });

    setCounters(newCounters);
  }

  const serveCustomer = ({counterIndex}) => {
    const updatedCounters = counters.map((counter, index) => {
      if(counter.customers.length === 0) return counter;
      if(index === counterIndex){
       const firstItemCount = counter.customers[0] || 0;
       return {
        ...counter,
        totalItems : counter.totalItems - firstItemCount,
        customers : counter.customers.slice(1)
       }
      }
      return counter;
    })

    setCounters(updatedCounters);
  }


  return(
    <div className="h-screen flex items-center justify-center flex-col">
      <div className="flex items-center justify-center gap-2">
        <input 
          type="number" 
          name="itemCount" id="itemCount" 
          className="p-2 border border-green-700 rounded" 
          value={itemCount}
          onChange={(e) => setItemCount(e.target.value)}
        />
        <button type="button" className="p-2 bg-green-900 text-white font-medium cursor-pointer" onClick={addCustomerToCounter}>
          Add Customer
        </button>
      </div>

      <div className="flex items-center gap-2 mt-6">
        {
          counters.map((counter, index) => (
            <div className="w-50 min-h-15 border border-green-900 p-2" key={index}>
              <h2 className="text-center font-medium text-[24px]">Counter No : {index+1}</h2>
              <div className="flex flex-col gap-1">
                {
                  counter?.customers.length > 0 ? counter?.customers.map((ItemCount, customerIndex) => (
                    <div className="w-full p-1 bg-green-600 text-white font-medium" key={customerIndex}>
                      <p>ItemsCount : <span className="text-[24px]">{ItemCount}</span></p>
                    </div>
                  )):(
                    <div>
                      <p className="text-center">Empty Counter</p>
                    </div>
                  )
                }
              </div>
              <div className="text-center mt-4">
                <button 
                className="p-2 bg-green-900 text-white font-medium cursor-pointer" 
                onClick={() => serveCustomer({counterIndex: index})}>
                  Serve
                </button>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default App;