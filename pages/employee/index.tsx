/* eslint-disable jsx-a11y/alt-text */
import { Input, Select, Button, Table, Tag, Image } from "antd";
const { Search } = Input;
import { PlusOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";
import type { ColumnsType } from "antd/es/table";
import useModalStore from "@/commons/store/modal";
import ModalDeleteEmployee from "./ModalDeleteEmployee";

interface DataType {
  key: string;
  idEmployee: string;
  employeeName: string;
  division: string;
  email: string;
  status: string;
}

const dataSource = [
  {
    key: "1",
    idEmployee: "001",
    employeeName: "Barou",
    division: "Support IT",
    email: "barou@gmail.com",
    status: "active",
  },
  {
    key: "2",
    idEmployee: "002",
    employeeName: "Ishekai",
    division: "Support IT",
    email: "ishekai@gmail.com",
    status: "active",
  },
  {
    key: "3",
    idEmployee: "003",
    employeeName: "Monogatari",
    division: "Support IT",
    email: "monogatari@gmail.com",
    status: "active",
  },
  {
    key: "4",
    idEmployee: "004",
    employeeName: "Amaterasu",
    division: "Support IT",
    email: "amaterasu@gmail.com",
    status: "active",
  },
  {
    key: "5",
    idEmployee: "005",
    employeeName: "Knife",
    division: "Support IT",
    email: "Knife@gmail.com",
    status: "deactive",
  },
];

const Index = () => {
  const modalStore = useModalStore((state) => state);
  const router = useRouter();
  const onSearch = (value: string) => console.log(value);
  const onSelect = (value: string) => console.log(value);
  const onAddNew = () => router.push("/employee/add");
  const columns: ColumnsType<DataType> = [
    {
      title: "ID Employee",
      dataIndex: "idEmployee",
      key: "idEmployee",
    },
    {
      title: "Employee Name",
      dataIndex: "employeeName",
      key: "employeeName",
      render: (_, record) => (
        <div className="flex gap-2">
          <Image
            width={22}
            src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png?x-oss-process=image/blur,r_50,s_50/quality,q_1/resize,m_mfit,h_200,w_200"
            preview={{
              src: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
            }}
          />
          {record?.employeeName}
        </div>
      ),
    },
    {
      title: "Division",
      dataIndex: "division",
      key: "division",
    },
    {
      title: "Email",
      key: "email",
      dataIndex: "email",
    },
    {
      title: "Status",
      key: "status",
      dataIndex: "status",
      render: (_, { status }) => {
        if (status === "active") {
          return <Tag color="blue">{status.toUpperCase()}</Tag>;
        }

        return status.toUpperCase();
      },
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
              router.push("/employee/edit/1");
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
      <ModalDeleteEmployee />
    </>
  );
};

export default Index;
