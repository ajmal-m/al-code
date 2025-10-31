const categories = [
  {
    id: 1,
    name: "Electronics",
    children: [
      {
        id: 2,
        name: "Mobile Phones",
        children: [
          { id: 3, name: "Smartphones", children: [] },
          { id: 4, name: "Feature Phones", children: [] },
          { id: 5, name: "Refurbished Phones", children: [] },
        ],
      },
      {
        id: 6,
        name: "Laptops",
        children: [
          { id: 7, name: "Gaming Laptops", children: [] },
          { id: 8, name: "Ultrabooks", children: [] },
          { id: 9, name: "2-in-1 Laptops", children: [] },
        ],
      },
      {
        id: 10,
        name: "Televisions",
        children: [
          { id: 11, name: "LED TVs", children: [] },
          { id: 12, name: "OLED TVs", children: [] },
          { id: 13, name: "Smart TVs", children: [] },
        ],
      },
    ],
  },
  {
    id: 14,
    name: "Clothing",
    children: [
      {
        id: 15,
        name: "Men",
        children: [
          { id: 16, name: "Shirts", children: [] },
          { id: 17, name: "T-Shirts", children: [] },
          { id: 18, name: "Jeans", children: [] },
        ],
      },
      {
        id: 19,
        name: "Women",
        children: [
          { id: 20, name: "Dresses", children: [] },
          { id: 21, name: "Tops", children: [] },
          { id: 22, name: "Skirts", children: [] },
        ],
      },
      {
        id: 23,
        name: "Kids",
        children: [
          { id: 24, name: "Boys Clothing", children: [] },
          { id: 25, name: "Girls Clothing", children: [] },
        ],
      },
    ],
  },
  {
    id: 26,
    name: "Home & Kitchen",
    children: [
      {
        id: 27,
        name: "Furniture",
        children: [
          { id: 28, name: "Living Room", children: [] },
          { id: 29, name: "Bedroom", children: [] },
          { id: 30, name: "Office", children: [] },
        ],
      },
      {
        id: 31,
        name: "Appliances",
        children: [
          { id: 32, name: "Refrigerators", children: [] },
          { id: 33, name: "Microwaves", children: [] },
          { id: 34, name: "Washing Machines", children: [] },
        ],
      },
      {
        id: 35,
        name: "Decor",
        children: [
          { id: 36, name: "Wall Art", children: [] },
          { id: 37, name: "Lighting", children: [] },
          { id: 38, name: "Rugs & Carpets", children: [] },
        ],
      },
    ],
  },
];


const Treeview = ({ categories})=>{
  return(
    <ul className="pl-7">
        {categories.map((category) => (
          <li>
            <span>{category.name}</span>
            {
              category.children.length > 0 && (<Treeview categories={category.children}/>)
            }
          </li>
        ))}
    </ul>
  )
}

const CategorySelection = () => {


    return(
        <div className="h-screen flex items-center justify-center flex-col">
            <div>
                <Treeview categories={categories}/>
            </div>
        </div>
    )
};


export default CategorySelection;