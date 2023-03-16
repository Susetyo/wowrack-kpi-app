/* eslint-disable jsx-a11y/alt-text */
import { Input, Select, Button, Table, Tag, Image } from "antd";
const { Search } = Input;
import { PlusOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";
import type { ColumnsType } from "antd/es/table";
import useModalStore from "@/commons/store/modal";
import ModalDeleteDivision from "./ModalDeleteDivision";
import ModalInsertUpdateDivision from "./ModalInsertUpdateDivision";
import { getHeader } from "@/commons/utils/fetchOptions";

interface DataType {
  key: string;
  divisionID: string;
  title: string;
  _id: string;
}

const Index = ({ data }: any) => {
  const modalStore = useModalStore((state) => state);
  const onSearch = (value: string) => console.log(value);
  const onSelect = (value: string) => console.log(value);
  const onAddNew = () => {
    modalStore?.setModalData({
      ...modalStore?.modalData,
      title: "",
      modalTitle: "Add Division",
      okText: "Add",
      isEdit: false,
      id: "",
    });
    modalStore?.openModal("modal-insert-update-division");
  };
  const columns: ColumnsType<DataType> = [
    {
      title: "Division ID",
      dataIndex: "divisionID",
      key: "divisionID",
    },
    {
      title: "Division",
      dataIndex: "title",
      key: "division",
    },
    {
      title: "Number of employee",
      dataIndex: "employeeCount",
      key: "employeeCount",
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
                title: record?.title,
                modalTitle: "Edit Division",
                okText: "Edit",
                isEdit: true,
                id: record?._id,
              });
              modalStore?.openModal("modal-insert-update-division");
            }}
          />
          <Button
            danger
            type="default"
            shape="circle"
            icon={<DeleteOutlined />}
            onClick={() => {
              modalStore?.setModalData({
                ...modalStore?.modalData,
                isEdit: false,
                id: record?._id,
              });
              modalStore?.openModal("modal-delete-employee");
            }}
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
        dataSource={data?.data?.list}
        pagination={{ pageSize: 50 }}
        scroll={{ y: 340 }}
      />
      {modalStore?.name === "modal-delete-employee" && <ModalDeleteDivision />}
      {modalStore?.name === "modal-insert-update-division" && (
        <ModalInsertUpdateDivision />
      )}
    </>
  );
};

export default Index;

export async function getServerSideProps({ req }: any) {
  const fetching = await fetch("http://127.0.0.1:3000/api/division", {
    method: "GET",
    headers: getHeader(req.headers.cookie),
  });
  const data = await fetching.json();

  return {
    props: {
      data,
    },
  };
}
