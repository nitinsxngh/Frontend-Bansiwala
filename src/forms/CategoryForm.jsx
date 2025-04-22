import React from "react";
import { Form, Input } from "antd";

export default function CategoryForm({ isUpdateForm = false }) {
  return (
    <>
      <Form.Item
        label="Category Name"
        name="name"
        rules={[
          {
            required: true,
            message: "Please input the category name!",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Description"
        name="description"
      >
        <Input.TextArea />
      </Form.Item>
    </>
  );
}