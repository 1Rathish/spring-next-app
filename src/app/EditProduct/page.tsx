"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import axios from "axios";
import { useForm, SubmitHandler } from "react-hook-form";

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

const EditFormPage: React.FC = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const id = searchParams.get("id");
  console.log("product id " + id);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Product>();

  useEffect(() => {
    const fetchProduct = async () => {
      if (id) {
        try {
          setLoading(true);
          const response = await axios.get(
            `http://localhost:8080/api/getProductById/${id}`
          );
          reset(response.data);
        } catch (_err) {
          setError("Failed to fetch product data.");
        } finally {
          setLoading(false);
        }
      }
    };

    fetchProduct();
  }, [id, reset]);

  const onSubmit: SubmitHandler<Product> = async (data) => {
    try {
      if (id) {
        await axios.put(`http://localhost:8080/api/products/${id}`, data);
        alert("Product updated successfully!");
      } else {
        await axios.post(`http://localhost:8080/api/products`, data);
        alert("Product created successfully!");
      }
      router.push("/");
    } catch (_err) {
      alert("Failed to save the product.");
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

        <div style={{ marginBottom: "15px" }}>
          <label
            htmlFor="price"
            style={{ display: "block", marginBottom: "5px" }}
          >
            Price
          </label>
          <input
            type="number"
            step="0.01"
            id="price"
            {...register("price", {
              required: "Price is required",
              valueAsNumber: true,
            })}
            style={inputStyle}
          />
          {errors.price && <p style={errorStyle}>{errors.price.message}</p>}
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label
            htmlFor="description"
            style={{ display: "block", marginBottom: "5px" }}
          >
            Description
          </label>
          <textarea
            id="description"
            {...register("description", {
              required: "Description is required",
            })}
            style={inputStyle}
          />
          {errors.description && (
            <p style={errorStyle}>{errors.description.message}</p>
          )}
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label
            htmlFor="ratings"
            style={{ display: "block", marginBottom: "5px" }}
          >
            Ratings
          </label>
          <input
            type="number"
            step="0.1"
            id="ratings"
            {...register("ratings", {
              required: "Ratings are required",
              valueAsNumber: true,
            })}
            style={inputStyle}
          />
          {errors.ratings && <p style={errorStyle}>{errors.ratings.message}</p>}
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label
            htmlFor="category"
            style={{ display: "block", marginBottom: "5px" }}
          >
            Category
          </label>
          <input
            id="category"
            {...register("category", { required: "Category is required" })}
            style={inputStyle}
          />
          {errors.category && (
            <p style={errorStyle}>{errors.category.message}</p>
          )}
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label
            htmlFor="seller"
            style={{ display: "block", marginBottom: "5px" }}
          >
            Seller
          </label>
          <input
            id="seller"
            {...register("seller", { required: "Seller is required" })}
            style={inputStyle}
          />
          {errors.seller && <p style={errorStyle}>{errors.seller.message}</p>}
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label
            htmlFor="stock"
            style={{ display: "block", marginBottom: "5px" }}
          >
            Stock
          </label>
          <input
            type="number"
            id="stock"
            {...register("stock", {
              required: "Stock is required",
              valueAsNumber: true,
            })}
            style={inputStyle}
          />
          {errors.stock && <p style={errorStyle}>{errors.stock.message}</p>}
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label
            htmlFor="numbfReviews"
            style={{ display: "block", marginBottom: "5px" }}
          >
            Number of Reviews
          </label>
          <input
            type="number"
            id="numbfReviews"
            {...register("numbfReviews", {
              required: "Number of reviews is required",
              valueAsNumber: true,
            })}
            style={inputStyle}
          />
          {errors.numbfReviews && (
            <p style={errorStyle}>{errors.numbfReviews.message}</p>
          )}
        </div>

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
