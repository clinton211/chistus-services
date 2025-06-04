import { useState } from "react";

const App = () => {
  // State management
  const [currentPage, setCurrentPage] = useState("home");
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [vehicles, setVehicles] = useState([
    {
      id: 1,
      brand: "Toyota",
      model: "Corolla",
      year: 2018,
      price: "$5,500",
      condition: "Used - Excellent",
      image: "https://placehold.co/400x300?text=Toyota+Corolla",
      status: "Available"
    },
    {
      id: 2,
      brand: "Honda",
      model: "Civic",
      year: 2016,
      price: "$4,200",
      condition: "Used - Good",
      image: "https://placehold.co/400x300?text=Honda+Civic",
      status: "Sold"
    },
    {
      id: 3,
      brand: "Ford",
      model: "F-150",
      year: 2017,
      price: "$6,800",
      condition: "Used - Very Good",
      image: "https://placehold.co/400x300?text=Ford+F150",
      status: "Available"
    }
  ]);

  const [filters, setFilters] = useState({
    brand: "",
    minPrice: "",
    maxPrice: "",
    year: ""
  });

  const [newVehicle, setNewVehicle] = useState({
    brand: "",
    model: "",
    year: "",
    price: "",
    condition: "",
    image: "",
    status: "Available"
  });

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  // Mock admin login
  const handleLogin = (e) => {
    e.preventDefault();
    const password = prompt("Enter admin password:");
    if (password === "chistus123") {
      setIsAdminLoggedIn(true);
      alert("Logged in as Admin");
    } else {
      alert("Incorrect password!");
    }
  };

  // Add new vehicle
  const handleAddVehicle = (e) => {
    e.preventDefault();
    const vehicleToAdd = {
      ...newVehicle,
      id: vehicles.length ? Math.max(...vehicles.map(v => v.id)) + 1 : 1
    };
    setVehicles([...vehicles, vehicleToAdd]);
    setNewVehicle({
      brand: "",
      model: "",
      year: "",
      price: "",
      condition: "",
      image: "",
      status: "Available"
    });
    alert("Vehicle added successfully!");
  };

  // Update vehicle status
  const handleUpdateStatus = (id) => {
    const updatedVehicles = vehicles.map(vehicle =>
      vehicle.id === id ? { ...vehicle, status: vehicle.status === "Available" ? "Sold" : "Available" } : vehicle
    );
    setVehicles(updatedVehicles);
    alert(`Vehicle ${id} status updated`);
  };

  // Delete vehicle
  const handleDeleteVehicle = (id) => {
    if (window.confirm("Are you sure you want to delete this listing?")) {
      setVehicles(vehicles.filter(vehicle => vehicle.id !== id));
    }
  };

  // Filter vehicles
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const filteredVehicles = vehicles.filter(vehicle => {
    return (
      (filters.brand === "" || vehicle.brand.toLowerCase().includes(filters.brand.toLowerCase())) &&
      (filters.minPrice === "" || parseFloat(vehicle.price.replace("$", "")) >= parseFloat(filters.minPrice)) &&
      (filters.maxPrice === "" || parseFloat(vehicle.price.replace("$", "")) <= parseFloat(filters.maxPrice)) &&
      (filters.year === "" || vehicle.year.toString().includes(filters.year))
    );
  });

  // Form handling
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Message sent successfully!");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-white text-gray-800">
      {/* Header */}
      <header className="bg-blue-700 text-white shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Chistus Services</h1>
          <nav className="space-x-6 hidden md:flex">
            <button onClick={() => setCurrentPage("home")} className="hover:text-yellow-300 transition">Home</button>
            <button onClick={() => setCurrentPage("inventory")} className="hover:text-yellow-300 transition">Inventory</button>
            <button onClick={() => setCurrentPage("services")} className="hover:text-yellow-300 transition">Services</button>
            <button onClick={() => setCurrentPage("about")} className="hover:text-yellow-300 transition">About</button>
            <button onClick={() => setCurrentPage("contact")} className="hover:text-yellow-300 transition">Contact</button>
            <button onClick={() => setCurrentPage("admin")} className="hover:text-yellow-300 transition">Admin</button>
          </nav>
          <button className="md:hidden focus:outline-none">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </header>

      {/* Hero Section */}
      {currentPage === "home" && (
        <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Trusted Quality in Every Ride</h2>
            <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto">Providing quality used vehicles, parts, and documentation services with integrity since day one.</p>
            <a href="#inventory" className="inline-block bg-yellow-400 hover:bg-yellow-500 text-blue-900 font-semibold px-6 py-3 rounded-full shadow-lg transition transform hover:scale-105">Browse Inventory</a> 
          </div>
        </section>
      )}

      {/* Main Content */}
      <main className="container mx-auto px-4 py-10">
        {/* Home Page */}
        {currentPage === "home" && (
          <>
            <section className="mb-16">
              <h3 className="text-3xl font-bold text-center mb-8">Why Choose Chistus?</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-gray-100 p-6 rounded-lg shadow hover:shadow-xl transition">
                  <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mb-4 mx-auto">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h4 className="text-xl font-semibold mb-2">Quality Assured</h4>
                  <p>All our vehicles are thoroughly inspected to ensure they meet our high standards for performance and safety.</p>
                </div>
                <div className="bg-gray-100 p-6 rounded-lg shadow hover:shadow-xl transition">
                  <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mb-4 mx-auto">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h4 className="text-xl font-semibold mb-2">Competitive Pricing</h4>
                  <p>We offer the best deals on pre-owned vehicles without compromising on quality or reliability.</p>
                </div>
                <div className="bg-gray-100 p-6 rounded-lg shadow hover:shadow-xl transition">
                  <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mb-4 mx-auto">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <h4 className="text-xl font-semibold mb-2">Customer Support</h4>
                  <p>Our team is dedicated to helping you find the right vehicle and assisting with all your service needs.</p>
                </div>
              </div>
            </section>

            <section className="mb-16">
              <h3 className="text-3xl font-bold text-center mb-8">Featured Vehicles</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {vehicles.slice(0, 3).map((vehicle) => (
                  <div key={vehicle.id} className="bg-white rounded-lg shadow overflow-hidden hover:shadow-xl transition">
                    <img src={vehicle.image} alt={vehicle.model} className="w-full h-48 object-cover" />
                    <div className="p-4">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="text-xl font-semibold">{vehicle.brand} {vehicle.model}</h4>
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          vehicle.status === "Available" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                        }`}>
                          {vehicle.status}
                        </span>
                      </div>
                      <p className="text-gray-600 mb-2">Year: {vehicle.year}</p>
                      <p className="text-blue-600 font-bold text-lg">{vehicle.price}</p>
                      <button className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded transition">View Details</button>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </>
        )}

        {/* Vehicle Inventory */}
        {currentPage === "inventory" && (
          <section>
            <h3 className="text-3xl font-bold text-center mb-8">Vehicle Inventory</h3>
            <div className="mb-6 space-y-4 md:space-y-0 md:flex md:justify-between md:items-end">
              <div className="md:w-1/4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Brand</label>
                <input
                  type="text"
                  name="brand"
                  value={filters.brand}
                  onChange={handleFilterChange}
                  placeholder="Search by brand"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="md:flex md:space-x-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Min Price</label>
                  <input
                    type="number"
                    name="minPrice"
                    value={filters.minPrice}
                    onChange={handleFilterChange}
                    placeholder="Min"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Max Price</label>
                  <input
                    type="number"
                    name="maxPrice"
                    value={filters.maxPrice}
                    onChange={handleFilterChange}
                    placeholder="Max"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Year</label>
                  <input
                    type="text"
                    name="year"
                    value={filters.year}
                    onChange={handleFilterChange}
                    placeholder="Year"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredVehicles.length > 0 ? (
                filteredVehicles.map((vehicle) => (
                  <div key={vehicle.id} className="bg-white rounded-lg shadow overflow-hidden hover:shadow-xl transition">
                    <img src={vehicle.image} alt={vehicle.model} className="w-full h-48 object-cover" />
                    <div className="p-4">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="text-xl font-semibold">{vehicle.brand} {vehicle.model}</h4>
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          vehicle.status === "Available" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                        }`}>
                          {vehicle.status}
                        </span>
                      </div>
                      <p className="text-gray-600 mb-2">Year: {vehicle.year}</p>
                      <p className="text-blue-600 font-bold text-lg">{vehicle.price}</p>
                      <button className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded transition">View Details</button>
                      {isAdminLoggedIn && (
                        <div className="mt-2 flex justify-between">
                          <button onClick={() => handleUpdateStatus(vehicle.id)} className="text-xs text-blue-600 underline">
                            {vehicle.status === "Available" ? "Mark Sold" : "Mark Available"}
                          </button>
                          <button onClick={() => handleDeleteVehicle(vehicle.id)} className="text-xs text-red-600 underline">
                            Delete
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <p className="col-span-full text-center text-gray-500">No vehicles match your filters.</p>
              )}
            </div>
          </section>
        )}

        {/* Services Page */}
        {currentPage === "services" && (
          <section>
            <h3 className="text-3xl font-bold text-center mb-8">Our Services</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-gray-100 p-6 rounded-lg shadow hover:shadow-xl transition">
                <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mb-4 mx-auto">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0H5m14 0a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2z" />
                  </svg>
                </div>
                <h4 className="text-xl font-semibold mb-2">Used Vehicles</h4>
                <p>Explore a wide selection of well-maintained used cars, vans, and SUVs at unbeatable prices.</p>
              </div>
              <div className="bg-gray-100 p-6 rounded-lg shadow hover:shadow-xl transition">
                <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mb-4 mx-auto">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h4 className="text-xl font-semibold mb-2">Pumps & Spare Parts</h4>
                <p>We provide genuine and reliable vehicle pumps and spare parts to keep your car running smoothly.</p>
              </div>
              <div className="bg-gray-100 p-6 rounded-lg shadow hover:shadow-xl transition">
                <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mb-4 mx-auto">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m-6-8h6M3 12h18a2 2 0 012 2v6a2 2 0 01-2 2H3a2 2 0 01-2-2v-6a2 2 0 012-2z" />
                  </svg>
                </div>
                <h4 className="text-xl font-semibold mb-2">Documentation Services</h4>
                <p>Get professional assistance with vehicle registration, ownership transfer, plate numbers, and more.</p>
              </div>
            </div>
          </section>
        )}

        {/* About Page */}
        {currentPage === "about" && (
          <section>
            <h3 className