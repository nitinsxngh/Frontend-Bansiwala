import React from "react";
import CrudModule from "@/modules/CrudModule";
import ProductForm from "@/forms/ProductForm";
import { Image, Tag } from "antd";

function Product() {
  const entity = "product";
  const searchConfig = {
    displayLabels: ["title"],
    searchFields: "title",
    outputValue: "_id",
  };

  const panelTitle = "Product Panel";
  const dataTableTitle = "Products List";
  const entityDisplayLabels = ["title"];

  const readColumns = [
    {
      title: "Title",
      dataIndex: "title",
    },
    {
      title: "Price",
      dataIndex: "price",
      render: price => price ? `₹${Number(price).toFixed(2)}` : '-'
    },
    {
      title: "Description",
      dataIndex: "description",
      render: desc => desc || '-'
    },
    {
      title: "Category",
      dataIndex: "category",
      render: category => category || '-'
    },
    {
      title: "Image",
      dataIndex: "image",
      render: image => image ? (
        <div style={{ margin: '10px 0' }}>
          <Image
            width={200}
            src={image}
            alt="Product preview"
            style={{
              borderRadius: '4px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              objectFit: 'cover'
            }}
          />
          <div style={{ marginTop: '5px', fontSize: '12px' }}>
            <a href={image} target="_blank" rel="noopener noreferrer">
              View original
            </a>
          </div>
        </div>
      ) : '-'
    },
    {
      title: "Status",
      dataIndex: "enabled",
      render: enabled => (
        <Tag color={enabled ? "green" : "red"}>
          {enabled ? "Active" : "Inactive"}
        </Tag>
      )
    }
  ];
  
  const dataTableColumns = [
    {
      title: "Title",
      dataIndex: "title",
    },
    {
      title: "Price",
      dataIndex: "price",
      render: price => price ? `₹${Number(price).toFixed(2)}` : '-'
    },
    {
      title: "Category",
      dataIndex: "category",
    },
    {
      title: "Image Preview",
      dataIndex: "image",
      render: image => image ? (
        <Image
          width={50}
          height={50}
          src={image}
          alt="Product thumbnail"
          style={{
            borderRadius: '4px',
            objectFit: 'cover'
          }}
        />
      ) : '-'
    },
    {
      title: "Status",
      dataIndex: "enabled",
      render: enabled => enabled ? "Active" : "Inactive"
    },
  ];

  const config = {
    entity,
    panelTitle,
    dataTableTitle,
    ENTITY_NAME: "product",
    CREATE_ENTITY: "Create product",
    ADD_NEW_ENTITY: "Add new product",
    UPDATE_ENTITY: "Update product",
    DATATABLE_TITLE: "Products List",
    readColumns,
    dataTableColumns,
    searchConfig,
    entityDisplayLabels,
  };
  
  return (
    <CrudModule
      createForm={<ProductForm />}
      updateForm={<ProductForm isUpdateForm={true} />}
      config={config}
    />
  );
}

export default Product;