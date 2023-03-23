import { Button, Tag, Image, Table, Input, Select } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";
import { getHeader } from "@/commons/utils/fetchOptions";
import { useMemo } from "react";
import type { ColumnsType } from "antd/es/table";
import Link from "next/link";

const { Search } = Input;

interface DataType {
  _id: string;
  employeeID: string;
  avatar: any;
  fullname: string;
  slug: string;
  email: string;
  position: {
    _id: string;
    name: string;
    id: string;
  };
  division: {
    _id: string;
    title: string;
    id: string;
  };
  averageScore: number;
  performance: string;
  createdAt: string;
}

const Index = ({ data }: any) => {
  const router = useRouter();
  const onAddKpi = () => router.push("/kpi/add");

  const columns: ColumnsType<DataType> = [
    {
      title: "ID Employee",
      dataIndex: "employeeID",
      key: "title",
    },
    {
      title: "Employee Name",
      dataIndex: "fullname",
      key: "fullname",
    },
    {
      title: "Email",
      key: "email",
      dataIndex: "email",
    },
    {
      title: "KPI Score",
      key: "averageScore",
      dataIndex: "averageScore",
    },

    {
      title: "Status",
      key: "status",
      dataIndex: "status",
      render: (_, { performance }) => {
        if (performance === "open") {
          return <Tag color="blue">{performance.toUpperCase()}</Tag>;
        }

        return <Tag color="red">{performance.toUpperCase()}</Tag>;
      },
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Link href={`/review/${record?.slug}`}>Detail</Link>
      ),
    },
  ];

  const onSearch = () => {};
  const onSelect = () => {};

  return (
    <>
      <div className="flex justify-between mb-4">
        <Search
          placeholder="input search text"
          onSearch={onSearch}
          style={{ width: 200 }}
        />
      </div>

      {data?.data && (
        <Table
          columns={columns}
          dataSource={data?.data?.list}
          pagination={{ pageSize: 50 }}
          scroll={{ y: 340 }}
        />
      )}
    </>
  );
};

export default Index;

export async function getServerSideProps({ req }: any) {
  const fetching = await fetch("http://127.0.0.1:3000/api/performance-review", {
    method: "GET",
    headers: getHeader(req.headers.cookie),
  });
  const data = await fetching.json();

  return { props: { data } };
}
