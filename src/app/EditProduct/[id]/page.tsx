"use client";
import React, { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import axios from "axios";
import { useForm, SubmitHandler } from "react-hook-form";

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

interface EditFormPageProps {
  product: Product | null;
  error: string | null;
}

const EditFormPage: React.FC<EditFormPageProps> = ({ product, error }) => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id"); // Get the product ID from the query params
  const router = useRouter(); // Initialize the router

  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Product>();

  // Populate form with fetched data
  React.useEffect(() => {
    if (product) {
      reset(product);
    }
  }, [product, reset]);

  const onSubmit: SubmitHandler<Product> = async (data) => {
    setLoading(true);
    try {
      if (id) {
        // Update product
        await axios.put(`http://localhost:8080/api/products/${id}`, data);
        alert("Product updated successfully!");
      } else {
        // Create product
        await axios.post(`http://localhost:8080/api/products`, data);
        alert("Product created successfully!");
      }
      router.push("/"); // Redirect to the products page
    } catch (err) {
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

// Fetch product data using getServerSideProps
export async function getServerSideProps(context: any) {
  const { id } = context.query;
  let product = null;
  let error = null;

  try {
    if (id) {
      const response = await axios.get(
        `http://localhost:8080/api/getProductById/${id}`
      );
      product = response.data;
    }
  } catch (err) {
    error = "Failed to fetch product data.";
  }

  return {
    props: {
      product,
      error,
    },
  };
}

export default EditFormPage;