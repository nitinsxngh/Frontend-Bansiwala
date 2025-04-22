import React, { useState, useEffect } from "react";
import { Form, Input, Select } from "antd";
import request from "@/request/request"; // Adjust path if different in your structure

export default function ProductForm({ isUpdateForm = false }) {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await request.list("category");
        console.log("Fetched categories:", data);
        setCategories(data.result); // <- Use the 'result' array from your response
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <>
      <Form.Item
        label="Title"
        name="title"
        rules={[
          {
            required: true,
            message: "Please input the product title!",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Price"
        name="price"
        rules={[
          {
            required: true,
            message: "Please input the product price!",
          },
          {
            type: "number",
            message: "Price must be a number!",
            transform: (value) => Number(value),
          },
        ]}
      >
        <Input type="number" step="0.01" />
      </Form.Item>

      <Form.Item
        label="Description"
        name="description"
        rules={[
          {
            required: true,
            message: "Please input the product description!",
          },
        ]}
      >
        <Input.TextArea />
      </Form.Item>

      <Form.Item
        label="Category"
        name="category"
        rules={[
          {
            required: true,
            message: "Please select the product category!",
          },
        ]}
      >
        <Select placeholder="Select a category" loading={!categories.length}>
          {categories.map((category) => (
            <Select.Option key={category._id} value={category.name}>
              {category.name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item
        label="Image URL"
        name="image"
        rules={[
          {
            required: true,
            message: "Please input the product image URL!",
          },
          {
            type: "url",
            message: "Please enter a valid URL!",
          },
        ]}
      >
        <Input />
      </Form.Item>
    </>
  );
}
