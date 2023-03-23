import {
  Image,
  Row,
  Col,
  Breadcrumb,
  Button,
  Upload,
  message,
  Form,
  Input,
  Select,
  DatePicker,
} from "antd";
import Link from "next/link";
import { getHeader } from "@/commons/utils/fetchOptions";
import { useMemo, useState } from "react";
import type { UploadProps } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";

const { Option } = Select;
const { TextArea } = Input;
const { Dragger } = Upload;

interface IDivision {
  _id: string;
  divisionID: string;
  title: string;
  slug: string;
  employeeCount: number;
}

interface IUploadPostData {
  file: any;
  kpiDocumentType: string;
  kpiDivisionId: string;
}

interface IBiWeeklyItem {
  goal: number;
  actual: number;
  percentage: number;
}

interface IKpiItem {
  supportCoordinator: string;
  biWeekly: IBiWeeklyItem[];
  isEmployeeExists: boolean;
}

interface IPostData {
  title: string;
  dateFrom: string;
  dateTo: string;
  type: string;
  division: string;
  document: string;
  kpiData: IKpiItem[];
}

const Add = ({ division }: any) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const listDivision: IDivision[] = useMemo(() => {
    if (division?.data) {
      return division?.data?.list;
    }

    return [];
  }, [division]);

  const props: UploadProps = {
    name: "file",
    multiple: true,
    async onChange(info) {
      const { status } = info.file;
      try {
        if (status === "done") {
          const dataWillBeSend: IUploadPostData = {
            file: info.file,
            kpiDocumentType: "ticket-reviewed",
            kpiDivisionId: "63dbf92eac2126691c6da1fc",
          };
          const fetching = await fetch("/api/media/create", {
            method: "POST",
            body: JSON.stringify(dataWillBeSend),
          });

          if (fetching?.status !== 200) {
            throw Error;
          }
          message.success(`${info.file.name} file uploaded successfully.`);
        } else if (status === "error") {
          message.error(`${info.file.name} file upload failed.`);
          throw Error;
        }
      } catch (err) {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
  };

  const onFinish = async (values: any) => {
    try {
      setIsLoading(true);
      //STILL DUMMY
      const dataWillBeSend: IPostData = {
        title: "KPI Finance November 2021",
        dateFrom: "2021-11-01",
        dateTo: "2021-11-30",
        type: "division",
        division: "6412643011fabac52ba8a17b",
        document: "63ee378d0e05b296d8b96f95",
        kpiData: [
          {
            supportCoordinator: "Sun Invictus",
            biWeekly: [
              {
                goal: 4,
                actual: 2,
                percentage: 50,
              },
              {
                goal: 0,
                actual: 0,
                percentage: 0,
              },
            ],
            isEmployeeExists: true,
          },
          {
            supportCoordinator: "Mars",
            biWeekly: [
              {
                goal: 3,
                actual: 1,
                percentage: 33,
              },
              {
                goal: 0,
                actual: 0,
                percentage: 0,
              },
            ],
            isEmployeeExists: true,
          },
          {
            supportCoordinator: "Feri Setyawan",
            biWeekly: [
              {
                goal: 0,
                actual: 0,
                percentage: 0,
              },
              {
                goal: 5,
                actual: 2,
                percentage: 40,
              },
            ],
            isEmployeeExists: true,
          },
          {
            supportCoordinator: "Erry Pradana Darajati",
            biWeekly: [
              {
                goal: 0,
                actual: 0,
                percentage: 0,
              },
              {
                goal: 2,
                actual: 1,
                percentage: 50,
              },
            ],
            isEmployeeExists: true,
          },
        ],
      };

      const fetching = await fetch("/api/kpi/create", {
        method: "POST",
        body: JSON.stringify(dataWillBeSend),
      });

      if (fetching?.status !== 200) {
        throw Error;
      }

      message.success("Success insert KPI");
      router.push("/kpi");
    } catch (err: any) {
      message.error("Failed insert KPI");
    }
    setIsLoading(false);
  };

  const onCancel = () => router.push("/kpi");

  return (
    <>
      <Breadcrumb>
        <Breadcrumb.Item>
          <Link href="/kpi">KPI List</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Add KPI</Breadcrumb.Item>
      </Breadcrumb>

      <Row gutter={[16, 8]} className="mt-4">
        <Col span={24}>
          <div className="bg-white px-4 pb-4 pt-2">
            <Form
              name="customized_form_controls"
              className="mt-4"
              layout="vertical"
              onFinish={onFinish}
            >
              <Form.Item name="title" label="KPI from name">
                <Input placeholder="Input Name" />
              </Form.Item>
              <div className="flex gap-2 justify-between">
                <Form.Item name="dateFrom" label="Start date" className="grow">
                  <DatePicker className="w-full" />
                </Form.Item>
                <Form.Item name="dateTo" label="Due Date" className="grow">
                  <DatePicker className="w-full" />
                </Form.Item>
                <Form.Item name="type" label="KPI form type" className="grow">
                  <Select placeholder="Input KPI form type">
                    <Option value="division">Division</Option>
                    <Option value="individuals">Individuals</Option>
                  </Select>
                </Form.Item>
              </div>
              <Form.Item>
                <TextArea rows={4} placeholder="maxLength is 6" maxLength={6} />
              </Form.Item>
              <Form.Item name="division" label="Level" className="grow">
                <Select placeholder="Input level">
                  {listDivision?.map((division: IDivision) => (
                    <Option key={division?._id} value={division?._id}>
                      {division?.title}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
              <Dragger {...props}>
                <p className="ant-upload-drag-icon">
                  <InboxOutlined />
                </p>
                <p className="ant-upload-text">
                  Click or drag file to this area to upload
                </p>
                <p className="ant-upload-hint">
                  Support for a single or bulk upload. Strictly prohibited from
                  uploading company data or other banned files.
                </p>
              </Dragger>
              <div className="flex gap-2 justify-end mt-4">
                <Form.Item>
                  <Button onClick={onCancel} type="default">
                    Cancel
                  </Button>
                </Form.Item>
                <Form.Item>
                  <Button type="primary" htmlType="submit" loading={isLoading}>
                    Submit
                  </Button>
                </Form.Item>
              </div>
            </Form>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default Add;

export async function getServerSideProps({ req }: any) {
  const fetchingDivision = await fetch("http://127.0.0.1:3000/api/division", {
    method: "GET",
    headers: getHeader(req.headers.cookie),
  });
  const division = await fetchingDivision.json();

  return { props: { division } };
}
