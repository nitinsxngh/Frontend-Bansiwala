import React from 'react';
import CrudModule from '@/modules/CrudModule';
import OrderForm from '@/forms/OrderForm';
import { Tag } from 'antd';

const statusColors = {
  pending: 'orange',
  completed: 'green',
  failed: 'red',
  refunded: 'blue',
  processing: 'orange',
  shipped: 'blue',
  delivered: 'green',
  cancelled: 'red'
};

export default function Order() {
  const entity = 'order';
  const searchConfig = {
    displayLabels: ['_id'],
    searchFields: '_id',
    outputValue: '_id',
  };

  const panelTitle = 'Order Panel';
  const dataTableTitle = 'Orders List';
  const entityDisplayLabels = ['_id'];

  const readColumns = [
    {
      title: 'Order ID',
      dataIndex: '_id',
    },
    {
      title: 'Customer',
      dataIndex: ['userId', 'name'],
    },
    {
      title: 'Products',
      dataIndex: 'products',
      render: products => `${products.length} items`,
    },
    {
      title: 'Total Amount',
      dataIndex: 'totalAmount',
      render: amount => `$${amount.toFixed(2)}`,
    },
    {
      title: 'Payment Status',
      dataIndex: 'paymentStatus',
      render: status => <Tag color={statusColors[status]}>{status}</Tag>,
    },
    {
      title: 'Shipping Status',
      dataIndex: 'shippingStatus',
      render: status => <Tag color={statusColors[status]}>{status}</Tag>,
    },
  ];

  const dataTableColumns = [
    {
      title: 'Order ID',
      dataIndex: '_id',
    },
    {
      title: 'Customer',
      dataIndex: ['userId', 'name'],
    },
    {
      title: 'Total Amount',
      dataIndex: 'totalAmount',
      render: amount => `$${amount.toFixed(2)}`,
    },
    {
      title: 'Payment Status',
      dataIndex: 'paymentStatus',
      render: status => <Tag color={statusColors[status]}>{status}</Tag>,
    },
    {
      title: 'Shipping Status',
      dataIndex: 'shippingStatus',
      render: status => <Tag color={statusColors[status]}>{status}</Tag>,
    },
  ];

  const config = {
    entity,
    panelTitle,
    dataTableTitle,
    ENTITY_NAME: 'order',
    CREATE_ENTITY: 'Create order',
    ADD_NEW_ENTITY: 'Add new order',
    UPDATE_ENTITY: 'Update order',
    DATATABLE_TITLE: 'Orders List',
    readColumns,
    dataTableColumns,
    searchConfig,
    entityDisplayLabels,
  };

  return (
    <CrudModule
      createForm={<OrderForm />}
      updateForm={<OrderForm isUpdateForm={true} />}
      config={config}
    />
  );
}
