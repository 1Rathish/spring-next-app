"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { useForm, SubmitHandler } from "react-hook-form";
import api from "../../../../utils/api";

// Interface for product
interface Product {
  name: string;
  price: number;
  description: string;
  ratings: number;
  category: string;
  seller: string;
  stock: number;
  numbfReviews?: number; // Optional for create
}

const EditFormPage = () => {
  const router = useRouter();
  const { id } = router.query; // Get the product ID from the query params
  const [product, setProduct] = useState<Product | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Product>();

  // Fetch product data on component mount
  useEffect(() => {
    if (id) {
      const fetchProduct = async () => {
        try {
          const response = await api.get(`/getProductById/${id}`);
          setProduct(response.data);
        } catch {
          setError("Failed to fetch product data.");
        }
      };
      fetchProduct();
    }
  }, [id]);

  // Populate form with fetched data
  useEffect(() => {
    if (product) {
      reset(product);
    }
  }, [product, reset]);

  const onSubmit: SubmitHandler<Product> = async (data) => {
    setLoading(true);
    try {
      if (id) {
        // Update product
        await api.put(`/products/${id}`, data);
        alert("Product updated successfully!");
      } else {
        // Create product
        await api.post(`/products`, data);
        alert("Product created successfully!");
      }
      router.push("/"); // Redirect to the products page
    } catch {
      alert("Failed to save the product.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div
      style={{
        maxWidth: "600px",
        margin: "0 auto",
        padding: "20px",
        border: "1px solid #ddd",
        borderRadius: "8px",
        boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
      }}
    >
      <h2>{id ? "Edit Product" : "Add Product"}</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Form Fields */}
        <div style={{ marginBottom: "15px" }}>
          <label
            htmlFor="name"
            style={{ display: "block", marginBottom: "5px" }}
          >
            Name
          </label>
          <input
            id="name"
            {...register("name", { required: "Name is required" })}
            style={inputStyle}
          />
          {errors.name && <p style={errorStyle}>{errors.name.message}</p>}
        </div>

        {/* Other form fields here... */}

        <button type="submit" style={buttonStyle}>
          {id ? "Save Changes" : "Save Product"}
        </button>
      </form>
    </div>
  );
};

const inputStyle = {
  width: "100%",
  padding: "8px",
  borderRadius: "4px",
  border: "1px solid #ccc",
};

const buttonStyle = {
  backgroundColor: "#007BFF",
  color: "#fff",
  padding: "10px 15px",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
};

const errorStyle = {
  color: "red",
  fontSize: "12px",
  marginTop: "5px",
};

export default EditFormPage;
