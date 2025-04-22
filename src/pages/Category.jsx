import React from "react";
import CrudModule from "@/modules/CrudModule";
import CategoryForm from "@/forms/CategoryForm";
import { Tag } from "antd";

function Category() {
  const entity = "category";
  const searchConfig = {
    displayLabels: ["name"],
    searchFields: "name",
    outputValue: "_id",
  };

  const panelTitle = "Category Panel";
  const dataTableTitle = "Categories List";
  const entityDisplayLabels = ["name"];

  const readColumns = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Description",
      dataIndex: "description",
      render: description => description || '-'
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
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Description",
      dataIndex: "description",
      render: description => description || '-'
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

  const config = {
    entity,
    panelTitle,
    dataTableTitle,
    ENTITY_NAME: "category",
    CREATE_ENTITY: "Create category",
    ADD_NEW_ENTITY: "Add new category",
    UPDATE_ENTITY: "Update category",
    DATATABLE_TITLE: "Categories List",
    readColumns,
    dataTableColumns,
    searchConfig,
    entityDisplayLabels,
  };
  
  return (
    <CrudModule
      createForm={<CategoryForm />}
      updateForm={<CategoryForm isUpdateForm={true} />}
      config={config}
    />
  );
}

export default Category;