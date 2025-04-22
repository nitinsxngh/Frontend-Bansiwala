import React, { useState, useEffect } from 'react';
import { Form, Input, Select, Button, Table, Tag, Card, Spin, message } from 'antd';
import { UserOutlined, ShoppingCartOutlined, HomeOutlined } from '@ant-design/icons';
import request from '@/request/request';

const { Option } = Select;

export default function OrderForm({ isUpdateForm = false, initialValues = {} }) {
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form] = Form.useForm();

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        setLoading(true);
        const [productsRes, usersRes] = await Promise.all([
          request.list('product'),
          request.list('user/list')
        ]);

        if (isMounted) {
          if (productsRes.success && usersRes.success) {
            setProducts(productsRes.data || []);
            setUsers(usersRes.data || []);
          } else {
            message.error('Failed to load required data');
          }
        }
      } catch (error) {
        console.error('Error:', error);
        message.error('Error loading data');
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleAddProduct = (productId) => {
    const product = products.find(p => p._id === productId);
    if (product && !selectedProducts.some(p => p.id === productId)) {
      setSelectedProducts([...selectedProducts, {
        id: product._id,
        title: product.title,
        price: product.price,
        quantity: 1
      }]);
    }
  };

  const handleQuantityChange = (productId, quantity) => {
    setSelectedProducts(selectedProducts.map(item =>
      item.id === productId ? { ...item, quantity: parseInt(quantity) || 1 } : item
    ));
  };

  const handleRemoveProduct = (productId) => {
    setSelectedProducts(selectedProducts.filter(item => item.id !== productId));
  };

  const calculateTotal = () => {
    return selectedProducts.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const onFinish = async (values) => {
    const orderData = {
      ...values,
      products: selectedProducts.map(({ id, quantity }) => ({
        productId: id,
        quantity
      })),
      total: calculateTotal(),
    };

    try {
      const res = isUpdateForm
        ? await request.update('order', orderData)
        : await request.create('order', orderData);

      if (res.success) {
        message.success(`Order ${isUpdateForm ? 'updated' : 'created'} successfully`);
        form.resetFields();
        setSelectedProducts([]);
      } else {
        throw new Error(res.message || 'Failed to save order');
      }
    } catch (err) {
      console.error(err);
      message.error('Failed to submit order');
    }
  };

  const columns = [
    {
      title: 'Product',
      dataIndex: 'title',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      render: price => `$${price}`
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      render: (_, record) => (
        <Input
          type="number"
          min={1}
          value={record.quantity}
          onChange={(e) => handleQuantityChange(record.id, e.target.value)}
        />
      )
    },
    {
      title: 'Action',
      render: (_, record) => (
        <Button danger onClick={() => handleRemoveProduct(record.id)}>
          Remove
        </Button>
      )
    }
  ];

  if (loading) {
    return <div style={{ textAlign: 'center', marginTop: '20%' }}><Spin size="large" /></div>;
  }

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
      initialValues={{
        paymentStatus: 'pending',
        shippingStatus: 'processing',
        ...initialValues
      }}
    >
      <Card title="Customer Details" style={{ marginBottom: 16 }}>
        <Form.Item
          name="userId"
          label="Customer"
          rules={[{ required: true, message: 'Please select a customer' }]}
        >
          <Select
            showSearch
            placeholder="Select customer"
            optionFilterProp="children"
            suffixIcon={<UserOutlined />}
            loading={!users}
          >
            {users.map(user => (
              <Option key={user._id} value={user._id}>
                {user.name} ({user.email})
              </Option>
            ))}
          </Select>
        </Form.Item>
      </Card>

      <Card title="Shipping Address" style={{ marginBottom: 16 }}>
        <Form.Item
          name={['shippingAddress', 'street']}
          label="Street"
          rules={[{ required: true, message: 'Street is required' }]}
        >
          <Input prefix={<HomeOutlined />} />
        </Form.Item>
        <Form.Item name={['shippingAddress', 'city']} label="City" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name={['shippingAddress', 'state']} label="State" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name={['shippingAddress', 'country']} label="Country" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name={['shippingAddress', 'zipCode']} label="Zip Code" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
      </Card>

      <Card title="Products" style={{ marginBottom: 16 }}>
        <Form.Item>
          <Select
            placeholder="Add products"
            style={{ width: '100%' }}
            onChange={handleAddProduct}
            suffixIcon={<ShoppingCartOutlined />}
          >
            {products
              .filter(product => !selectedProducts.find(p => p.id === product._id))
              .map(product => (
                <Option key={product._id} value={product._id}>
                  {product.title} (${product.price})
                </Option>
              ))}
          </Select>
        </Form.Item>

        <Table
          columns={columns}
          dataSource={selectedProducts}
          rowKey="id"
          pagination={false}
          locale={{ emptyText: 'No products added yet' }}
        />

        <div style={{ marginTop: 16, textAlign: 'right', fontWeight: 'bold' }}>
          Total: ${calculateTotal().toFixed(2)}
        </div>
      </Card>

      <Card title="Order Status">
        <Form.Item name="paymentStatus" label="Payment Status">
          <Select>
            <Option value="pending">Pending</Option>
            <Option value="completed">Completed</Option>
            <Option value="failed">Failed</Option>
            <Option value="refunded">Refunded</Option>
          </Select>
        </Form.Item>

        <Form.Item name="shippingStatus" label="Shipping Status">
          <Select>
            <Option value="processing">Processing</Option>
            <Option value="shipped">Shipped</Option>
            <Option value="delivered">Delivered</Option>
            <Option value="cancelled">Cancelled</Option>
          </Select>
        </Form.Item>
      </Card>

      <Form.Item style={{ textAlign: 'right', marginTop: 24 }}>
        <Button type="primary" htmlType="submit">
          {isUpdateForm ? 'Update Order' : 'Create Order'}
        </Button>
      </Form.Item>
    </Form>
  );
}
