import React from "react";
import CrudModule from "@/modules/CrudModule";
import BankForm from "@/forms/BankForm";
import { Tag } from "antd";

function Bank() {
  const entity = "bank";
  const searchConfig = {
    displayLabels: ["bankName"],
    searchFields: "bankName,accountNumber",
    outputValue: "_id",
  };

  const panelTitle = "Bank Panel";
  const dataTableTitle = "Bank Accounts: Latest Bank Will Reflected on Website";
  const entityDisplayLabels = ["bankName"];

  const columns = [
    {
      title: "Bank Name",
      dataIndex: "bankName",
    },
    {
      title: "Account Number",
      dataIndex: "accountNumber",
    },
    {
      title: "IFSC Code",
      dataIndex: "ifscCode",
    },
    {
      title: "QR Code",
      dataIndex: "qrCodeUrl",
      render: (url) =>
        url ? <a href={url} target="_blank" rel="noopener noreferrer">View</a> : "-",
    },
    {
      title: "Status",
      dataIndex: "enabled",
      render: (enabled) => (
        <Tag color={enabled ? "green" : "red"}>
          {enabled ? "Active" : "Inactive"}
        </Tag>
      ),
    },
  ];

  const config = {
    entity,
    panelTitle,
    dataTableTitle,
    ENTITY_NAME: "bank",
    CREATE_ENTITY: "Create Bank",
    ADD_NEW_ENTITY: "Add New Bank",
    UPDATE_ENTITY: "Update Bank",
    DATATABLE_TITLE: "Bank Accounts",
    readColumns: columns,
    dataTableColumns: columns,
    searchConfig,
    entityDisplayLabels,
  };

  return (
    <CrudModule
      createForm={<BankForm />}
      updateForm={<BankForm isUpdateForm={true} />}
      config={config}
    />
  );
}

export default Bank;
