"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import api from "../../utils/api";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  seller: number;
  stock: number;
  numbfReviews: number;
}

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Delete product
  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this product?")) {
      api
        .delete(`/products/${id}`)
        .then(() => {
          alert("Product deleted successfully!");
          fetchData(); // Call the renamed function
        })
        .catch((error) => {
          console.error("Error deleting product:", error);
          alert("Failed to delete product. Please try again.");
        });
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      // Renamed to avoid conflict
      try {
        const response = await api.get("/getProducts");
        setProducts(response.data);
        setLoading(false); // Add this line to set loading to false
      } catch (error) {
        console.error("Error fetching products:", error);
        setError("Failed to fetch products. Please try again later.");
        setLoading(false); // Add this line to set loading to false on error
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p style={{ color: "red" }}>{error}</p>;
  }

  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        margin: "0",
        padding: "0",
        boxSizing: "border-box",
        backgroundColor: "#f4f4f4",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
      }}
    >
      <header
        style={{
          width: "100%",
          backgroundColor: "#4CAF50",
          color: "white",
          padding: "20px 0",
          textAlign: "center",
          fontSize: "2em",
          fontWeight: "bold",
          letterSpacing: "2px",
        }}
      >
        Product List
      </header>

      <main
        style={{
          width: "80%",
          maxWidth: "1200px",
          marginTop: "20px",
          padding: "20px",
          backgroundColor: "white",
          borderRadius: "8px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginBottom: "10px",
          }}
        >
          <Link
            href={`/EditProduct`}
            style={{
              backgroundColor: "#4CAF50",
              color: "white",
              padding: "10px 20px",
              borderRadius: "5px",
              textDecoration: "none",
              fontWeight: "bold",
              fontSize: "1em",
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
              transition: "background-color 0.3s ease",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = "#45a049")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = "#4CAF50")
            }
          >
            Add Product
          </Link>
        </div>

        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            fontFamily: "Arial, sans-serif",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            border: "1px solid #ddd",
            borderRadius: "8px",
            overflow: "hidden",
          }}
        >
          <thead
            style={{
              backgroundColor: "#4CAF50",
              color: "white",
              textAlign: "left",
              fontWeight: "bold",
              padding: "12px 15px",
            }}
          >
            <tr>
              <th style={{ padding: "12px 15px" }}>Product Name</th>
              <th style={{ padding: "12px 15px" }}>Description</th>
              <th style={{ padding: "12px 15px" }}>Price</th>
              <th style={{ padding: "12px 15px" }}>Seller</th>
              <th style={{ padding: "12px 15px" }}>Stock</th>
              <th style={{ padding: "12px 15px" }}>Number Of Reviews</th>
              <th style={{ padding: "12px 15px" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr
                key={product.id}
                style={{
                  backgroundColor: index % 2 === 0 ? "#f9f9f9" : "#ffffff",
                  transition: "background-color 0.3s ease",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor = "#f1f1f1")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor =
                    index % 2 === 0 ? "#f9f9f9" : "#ffffff")
                }
              >
                <td style={{ padding: "12px 15px" }}>{product.name}</td>
                <td style={{ padding: "12px 15px" }}>{product.description}</td>
                <td style={{ padding: "12px 15px" }}>${product.price}</td>
                <td style={{ padding: "12px 15px" }}>{product.seller}</td>
                <td style={{ padding: "12px 15px" }}>{product.stock}</td>
                <td style={{ padding: "12px 15px" }}>{product.numbfReviews}</td>
                <td style={{ padding: "12px 15px", textAlign: "center" }}>
                  <Link
                    href={`/EditProduct?id=${product.id}`}
                    style={{
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      color: "#4CAF50",
                      fontSize: "1.2em",
                      textDecoration: "none",
                      marginRight: "10px",
                    }}
                  >
                    ✏️
                  </Link>
                  <button
                    onClick={() => handleDelete(product.id)}
                    style={{
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      color: "#FF5733",
                      fontSize: "1.2em",
                    }}
                  >
                    🗑️
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>

      <footer
        style={{
          width: "100%",
          backgroundColor: "#333",
          color: "white",
          padding: "10px 0",
          textAlign: "center",
          fontSize: "0.9em",
          marginTop: "30px",
        }}
      >
        &copy; 2024 NearTekPod. All Rights Reserved.
      </footer>
    </div>
  );
};

export default ProductList;
