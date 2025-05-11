import { ShoppingCart, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";

const Cyberexpert = () => {
  const [experts, setexperts] = useState([]);
  const [cart, setCart] = useState([]);
  const [error, setError] = useState("");
  useEffect(() => {
    fetch("/experts.json")
      .then((res) => res.json())
      .then((data) => setexperts(data))
      .catch((error) => setError(error.message));
    console.log(error);
  },[]);


  // Add expert to cart
  const AddToCart = (expert) => {
    // Check if the expert is already in the cart
    const isAlreadyAdded = cart.find( (item) => item.id === expert.id);
    if (!isAlreadyAdded) {
      setCart([...cart, expert]);
    }
  }


    // Remove expert from cart
    const RemoveFromCart = (id) => {
      setCart(cart.filter( (item) => item.id !==id));
    }

    // CAlculate the total cost of the cart
    const TotalCost = cart.reduce( (total, item) => total + item.salary, 0).toFixed(2)
  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="bg-orange-100 p-6 rounded-lg mb-8 max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-center mt-2">
          Make a Cyber Security Team
        </h1>
        <p className="text-center mt-2">
          Our Server is under attack so we need to hire a special cyber security
          team
        </p>
        <h2 className="text-2xl font-semibold text-center mt-4">
          Total Budget: 10 Million
        </h2>
      </div>

      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row gap-8">
        <div className="md:w-3/4 grid md:grid-cols-3 gap-6">
          {experts.map((expert) => (
            <div
              key={expert.id}
              className="bg-gray-50 rounded-lg p-4 shadow-md flex flex-col items-center"
            >
              <img src={expert.img} className="w-30 h-30 rounded-full mb-2" />
              <h3 className="text-2xl font-semibold text-center">
                {expert.name}
              </h3>
              <p className="text-sm text-center">Age: {expert.age}</p>

              <div className="mt-2 mb-2 text-md text-center flex flex-col gap-2">
                <p className="font-semibold">
                  Designation:{" "}
                  <span className="font-normal">{expert.designation}</span>
                </p>
                <p className="font-semibold">
                  Address: <span className="font-normal">{expert.address}</span>
                </p>
                <p className="font-semibold">
                  Salary: <span className="font-normal">${expert.salary}</span>
                </p>
              </div>
              {cart.find( (item) => item.id === expert.id) ? (
                <button disabled className="mt-5 bg-gray-500 text-white px-4 py-2 rounded-md flex gap-2 items-center cursor-not-allowed">
                    <ShoppingCart /> Added to List
                </button>


              ) : (
                <button onClick={() => AddToCart(expert)} className="mt-5 bg-blue-500 text-white px-4 py-2 rounded-md flex gap-2 items-center cursor-pointer">
                <ShoppingCart /> Add to List
              </button>
              )}
              
            </div>
          ))}
        </div>
        <div className="md:w-1/4">
          <div className="bg-gray-50  roulded-lg p-4 shadow-md rounded-md min-h-100 md:sticky md:top-4">
            <h1 className="text-2xl">Expart added : {cart.length}</h1>
            <p className="text-xl pt-2">Totat Cost : ${TotalCost}</p>
            {cart.length > 0 ? (
              <div className="mt-5 flex flex-col gap-2">
                {cart.map((expert) => (
                  <div
                    key={expert.id}
                    className=" flex items-center justify-between border-b border-gray-300 py-2"
                  >
                    <div className="flex items-center">
                      <img
                        src={expert.img}
                        className="w-12 h-12 rounded-full mr-2"
                      />
                      <div>
                        <h3 className="text-lg font-semibold">{expert.name}</h3>
                        <p className="text-sm text-gray-600">
                          Salary: ${expert.salary}
                        </p>
                      </div>
                      
                    </div>

                    <button
                    onClick={() => RemoveFromCart(expert.id)}
                      className="text-red-500 cursor-pointer hover:text-red-400"
                    >
                      <Trash2 />
                    </button>
                  </div>
                ))}

                <button className="bg-blue-500 text-white rounded-md w-full px-3 py-2 mt-2 cursor-pointer hover:bg-blue-400">Confirm</button>
              </div>
            ) : (
              <div className="mt-2 text-red-500">No experts in the team!</div>
            )}
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cyberexpert;
