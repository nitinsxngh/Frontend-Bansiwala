import React from "react";
import { Form, Input } from "antd";

export default function BankForm({ isUpdateForm = false }) {
  return (
    <>
      <Form.Item
        label="Bank Name"
        name="bankName"
        rules={[{ required: true, message: "Please input bank name!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Account Number"
        name="accountNumber"
        rules={[{ required: true, message: "Please input account number!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="IFSC Code"
        name="ifscCode"
        rules={[{ required: true, message: "Please input IFSC code!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="QR Code Link"
        name="qrCodeUrl"
        rules={[{ type: "url", message: "Please enter a valid URL" }]}
      >
        <Input placeholder="https://example.com/qr.png" />
      </Form.Item>
    </>
  );
}
