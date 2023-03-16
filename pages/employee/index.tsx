import { Input, Select, Button, Table, Tag, Image } from "antd";
const { Search } = Input;
import { PlusOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";
import type { ColumnsType } from "antd/es/table";
import useModalStore from "@/commons/store/modal";
import ModalDeleteEmployee from "./ModalDeleteEmployee";
import { getHeader } from "@/commons/utils/fetchOptions";

interface DataType {
  _id: string;
  employeeID: string;
  avatar: any;
  fullname: string;
  slug: string;
  division: {
    _id: string;
    title: string;
    id: string;
  };
  email: string;
  status: string;
  kpiScore: number;
}

const Index = ({ data }: any) => {
  console.log(data, "@@data");
  const modalStore = useModalStore((state) => state);
  const router = useRouter();
  const onSearch = (value: string) => console.log(value);
  const onSelect = (value: string) => console.log(value);
  const onAddNew = () => router.push("/employee/add");
  const columns: ColumnsType<DataType> = [
    {
      title: "ID Employee",
      dataIndex: "employeeID",
      key: "employeeID",
    },
    {
      title: "Employee Name",
      dataIndex: "fullname",
      key: "fullname",
      render: (_, { fullname }) => (
        <div className="flex gap-2">
          <Image
            width={22}
            src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png?x-oss-process=image/blur,r_50,s_50/quality,q_1/resize,m_mfit,h_200,w_200"
            preview={{
              src: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
            }}
          />
          {fullname}
        </div>
      ),
    },
    {
      title: "Division",
      dataIndex: "division",
      key: "division",
      render: (_, { division: { title } }) => <div>{title}</div>,
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
              console.log(record, "@@record");
              // router.push("/employee/edit/1");
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
      {data?.data && (
        <Table
          columns={columns}
          dataSource={data?.data?.list}
          pagination={{ pageSize: 50 }}
          scroll={{ y: 340 }}
        />
      )}
      <ModalDeleteEmployee />
    </>
  );
};

export default Index;

export async function getServerSideProps({ req }: any) {
  const fetching = await fetch("http://127.0.0.1:3000/api/user", {
    method: "GET",
    headers: getHeader(req.headers.cookie),
  });
  const data = await fetching.json();

  return { props: { data } };
}
