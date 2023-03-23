import { Button, Tag, Image, Table, Input, Select } from "antd";
import { PlusOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";
import { getHeader } from "@/commons/utils/fetchOptions";
import { useMemo } from "react";
import type { ColumnsType } from "antd/es/table";

const { Search } = Input;

interface DataType {
  _id: string;
  title: string;
  type: string;
  division: {
    _id: string;
    title: string;
    id: string;
  };
  dateFrom: string;
  dateTo: string;
  status: string;
}

const Index = ({ data }: any) => {
  const router = useRouter();
  const onAddKpi = () => router.push("/kpi/add");

  const columns: ColumnsType<DataType> = [
    {
      title: "KPI Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "KPI Type",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Start Date",
      key: "dateFrom",
      dataIndex: "dateFrom",
    },
    {
      title: "End Date",
      key: "dateTo",
      dataIndex: "dateTo",
    },
    {
      title: "Status",
      key: "status",
      dataIndex: "status",
      render: (_, { status }) => {
        if (status === "open") {
          return <Tag color="blue">{status.toUpperCase()}</Tag>;
        }

        return <Tag color="red">{status.toUpperCase()}</Tag>;
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
            onClick={() => {}}
          />
          <Button
            danger
            type="default"
            shape="circle"
            icon={<DeleteOutlined />}
            onClick={() => {}}
          />
        </div>
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
            onClick={onAddKpi}
            type="primary"
            className="bg-blue"
          >
            Create New KPI
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
    </>
  );
};

export default Index;

export async function getServerSideProps({ req }: any) {
  const fetching = await fetch("http://127.0.0.1:3000/api/kpi", {
    method: "GET",
    headers: getHeader(req.headers.cookie),
  });
  const data = await fetching.json();

  return { props: { data } };
}
