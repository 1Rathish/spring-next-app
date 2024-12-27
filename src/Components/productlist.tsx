"use client";

import React, { useEffect, useState } from "react";
// import { useRouter } from "next/router";
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
  // const router = useRouter();

  useEffect(() => {
    api
      .get("/getProducts")
      .then((response) => {
        setProducts(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Loading...</p>;
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
                onMouseEnter={(e: React.MouseEvent<HTMLTableRowElement>) =>
                  (e.currentTarget.style.backgroundColor = "#f1f1f1")
                }
                onMouseLeave={(e: React.MouseEvent<HTMLTableRowElement>) =>
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
                    }}
                  >
                    ✏️
                  </Link>
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
        &copy; 2024 Your Company. All Rights Reserved.
      </footer>
    </div>
  );
};

export default ProductList;
