import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "./config/firebaseConfig";
import axios from "axios";

const Dashboard = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/products");
        setProducts(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error.message);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        alert("Successfully signed out!");
        navigate("/signin");
      })
      .catch((err) => {
        console.error("Error signing out:", err.message);
      });
  };

  const handleContactFarmer = (product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  const handleSendMessage = () => {
    if (message.trim() === "") {
      alert("Please enter a message.");
      return;
    }

    alert(`Message sent to ${selectedProduct.producer}: ${message}`);
    setShowModal(false);
    setMessage("");
  };

  return (
    <div
      className="dashboard-container"
      style={{
        maxWidth: "1200px",
        margin: "auto",
        padding: "20px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
        Welcome to the Dashboard!
      </h2>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "30px",
        }}
      >
        <button
          onClick={handleSignOut}
          style={{
            backgroundColor: "#d9534f",
            color: "white",
            border: "none",
            padding: "10px 20px",
            borderRadius: "5px",
            cursor: "pointer",
            fontWeight: "bold",
            transition: "background-color 0.3s",
          }}
        >
          Sign Out
        </button>
        <button
          onClick={() => navigate("/add-product")}
          style={{
            backgroundColor: "#0275d8",
            color: "white",
            border: "none",
            padding: "10px 20px",
            borderRadius: "5px",
            cursor: "pointer",
            fontWeight: "bold",
            transition: "background-color 0.3s",
          }}
        >
          Add New Product
        </button>
      </div>

      <h3 style={{ marginBottom: "20px", textAlign: "center" }}>
        Available Products
      </h3>
      {loading ? (
        <p style={{ textAlign: "center" }}>Loading products...</p>
      ) : products.length > 0 ? (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "20px",
          }}
        >
          {products.map((product) => (
            <div
              key={product._id}
              style={{
                border: "1px solid #e0e0e0",
                borderRadius: "10px",
                padding: "30px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                transition: "transform 0.2s",
              }}
              onMouseEnter={(e) => (e.target.style.transform = "scale(1.02)")}
              onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
            >
              <h4 style={{ marginBottom: "10px", color: "#333" }}>
                {product.name}
              </h4>
              <p>
                <strong>Description:</strong> {product.description}
              </p>
              <p>
                <strong>Price:</strong> Rs {product.price} per kilo
              </p>
              <p>
                <strong>Quantity:</strong> {product.quantity}
              </p>
              <p>
                <strong>Producer:</strong> {product.producer}
              </p>
              <p>
                <strong>Contact:</strong> {product.contact}
              </p>
              <button
                onClick={() =>
                  alert(`You bought ${product.name} for Rs${product.price} per kilo`)
                }
                style={{
                  backgroundColor: "#5cb85c",
                  color: "white",
                  border: "none",
                  padding: "10px 15px",
                  borderRadius: "5px",
                  cursor: "pointer",
                  marginTop: "10px",
                  fontWeight: "bold",
                  transition: "background-color 0.3s",
                  marginRight: "5px",
                }}
                onMouseEnter={(e) =>
                  (e.target.style.backgroundColor = "#449d44")
                }
                onMouseLeave={(e) =>
                  (e.target.style.backgroundColor = "#5cb85c")
                }
              >
                Buy Now
              </button>
              <button
                onClick={() => handleContactFarmer(product)}
                style={{
                  backgroundColor: "#f0ad4e",
                  color: "white",
                  border: "none",
                  padding: "10px 15px",
                  borderRadius: "5px",
                  cursor: "pointer",
                  marginTop: "10px",
                  fontWeight: "bold",
                  transition: "background-color 0.3s",
                }}
                onMouseEnter={(e) =>
                  (e.target.style.backgroundColor = "#ec971f")
                }
                onMouseLeave={(e) =>
                  (e.target.style.backgroundColor = "#f0ad4e")
                }
              >
                Contact Farmer
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p style={{ textAlign: "center" }}>No products available.</p>
      )}

      {showModal && (
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "white",
            padding: "20px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
            borderRadius: "10px",
            zIndex: 1000,
          }}
        >
          <h4>Contact {selectedProduct.producer}</h4>
          <p>
            <strong>Contact Info:</strong> {selectedProduct.contact}
          </p>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message here..."
            style={{
              width: "100%",
              height: "100px",
              marginTop: "10px",
              marginBottom: "10px",
              marginRight:"60px ",
              padding: "4px",
              borderRadius: "5px",
              border: "1px solid #e0e0e0",
            }}
          />
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <button
              onClick={() => setShowModal(false)}
              style={{
                backgroundColor: "#d9534f",
                color: "white",
                border: "none",
                padding: "10px 15px",
                borderRadius: "5px",
                cursor: "pointer",
                fontWeight: "bold",
                marginRight: "10px",
              }}
            >
              Cancel
            </button>
            <button
              onClick={handleSendMessage}
              style={{
                backgroundColor: "#0275d8",
                color: "white",
                border: "none",
                padding: "10px 15px",
                borderRadius: "5px",
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              Send Message
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
