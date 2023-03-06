/* eslint-disable jsx-a11y/alt-text */
import { Input, Select, Button, Table, Tag, Image } from "antd";
const { Search } = Input;
import { PlusOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";
import type { ColumnsType } from "antd/es/table";
import useModalStore from "@/commons/store/modal";
import ModalDeleteDivision from "./ModalDeleteDivision";
import ModalInsertUpdateDivision from "./ModalInsertUpdateDivision";

interface DataType {
  key: string;
  idDivision: string;
  title: string;
}

const dataSource = [
  {
    key: "1",
    idDivision: "D001",
    title: "Support IT",
  },
  {
    key: "2",
    idDivision: "D002",
    title: "Support Coordinator",
  },
];

const Index = () => {
  const modalStore = useModalStore((state) => state);
  const onSearch = (value: string) => console.log(value);
  const onSelect = (value: string) => console.log(value);
  const onAddNew = () => {
    modalStore?.setModalData({
      ...modalStore?.modalData,
      title: "",
      modalTitle: "Add Division",
      okText: "Add",
    });
    modalStore?.openModal("modal-insert-update-division");
  };
  const columns: ColumnsType<DataType> = [
    {
      title: "Division ID",
      dataIndex: "idDivision",
      key: "idDivision",
    },
    {
      title: "Division",
      dataIndex: "title",
      key: "division",
    },
    {
      title: "Number of employee",
      dataIndex: "numberOfEmployee",
      key: "numberOfEmployee",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <div className="flex gap-2">
          <Button
            type="primary"
            shape="circle"
            icon={<EditOutlined />}
            onClick={() => {
              modalStore?.setModalData({
                ...modalStore?.modalData,
                title: "",
                modalTitle: "Edit Division",
                okText: "Edit",
              });
              modalStore?.openModal("modal-insert-update-division");
            }}
          />
          <Button
            danger
            type="default"
            shape="circle"
            icon={<DeleteOutlined />}
            onClick={() => modalStore.openModal("modal-delete-employee")}
          />
        </div>
      ),
    },
  ];

  return (
    <>
      <div className="flex justify-between mb-4">
        <Search
          placeholder="input search text"
          onSearch={onSearch}
          style={{ width: 200 }}
        />
        <div className="flex gap-2">
          <Select
            defaultValue="lucy"
            style={{ width: 120 }}
            onChange={onSelect}
            options={[
              { value: "jack", label: "Jack" },
              { value: "lucy", label: "Lucy" },
              { value: "Yiminghe", label: "yiminghe" },
              { value: "disabled", label: "Disabled", disabled: true },
            ]}
          />
          <Button>View Log</Button>
          <Button
            icon={<PlusOutlined />}
            onClick={onAddNew}
            type="primary"
            className="bg-blue"
          >
            Add New
          </Button>
        </div>
      </div>
      <Table
        columns={columns}
        dataSource={dataSource}
        pagination={{ pageSize: 50 }}
        scroll={{ y: 340 }}
      />
      <ModalDeleteDivision />
      <ModalInsertUpdateDivision />
    </>
  );
};

export default Index;
