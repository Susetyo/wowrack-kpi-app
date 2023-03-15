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
import { useState } from "react";
import Link from "next/link";
import type { UploadProps, DatePickerProps } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { useRouter } from "next/router";
import { getHeader, fetchPost } from "@/commons/utils/fetchOptions";
import { useMemo } from "react";
const { Option } = Select;

const borderStyle = "border-solid border-t-0 border-b-0 border-l-0 border-r-2";
const stepStyle = "bg-white cursor-pointer h-[38px] py-[8px] pl-2";

interface IDivision {
  _id: string;
  divisionID: string;
  title: string;
  slug: string;
  employeeCount: number;
}

interface IPosition {
  _id: string;
  name: string;
}

interface postData {
  fullname: string;
  avatar: any;
  position: string;
  division: string;
  birthplace: string;
  birthdate: string;
  bio: string;
  phone: string;
  email: string;
  password: string;
}

const Add = ({ division, position }: any) => {
  const router = useRouter();
  const [form] = Form.useForm();
  const [showSections, setShowSections] = useState({
    gi: true,
    p: false,
  });
  const [isLoading, setIsLoading] = useState(false);

  const onClickSection = (param: string) => {
    switch (param) {
      case "gi":
        setShowSections({ ...showSections, gi: true, p: false });
        break;
      default:
        setShowSections({ ...showSections, gi: false, p: true });
        break;
    }
  };

  const props: UploadProps = {
    name: "file",
    action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
    headers: {
      authorization: "authorization-text",
    },
    onChange(info) {
      if (info.file.status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === "done") {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  const listDivision: IDivision[] = useMemo(() => {
    if (division?.data) {
      return division?.data?.list;
    }

    return [];
  }, [division]);

  const listPosition: IPosition[] = useMemo(() => {
    if (position?.data) {
      return position?.data?.list;
    }

    return [];
  }, [position]);

  const onFinish = async (values: any) => {
    try {
      setIsLoading(true);
      const dataWillBeSend: postData = {
        ...values,
        birthdate: values?.birthdate.format("YYYY-MM-DD"),
        avatar: null,
        position: listPosition[0]?._id,
      };
      await fetch("/api/createEmployee", {
        method: "POST",
        body: JSON.stringify(dataWillBeSend),
      });
      message.success("Success insert new employee");
      router.push("/employee");
    } catch (err: any) {
      message.error("Failed insert new employee");
    }

    setIsLoading(false);
  };

  return (
    <>
      <Breadcrumb>
        <Breadcrumb.Item>
          <Link href="/employee">Employee List</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Add Employee</Breadcrumb.Item>
      </Breadcrumb>
      <Row gutter={[16, 8]} className="mt-4">
        <Col span={4}>
          <div
            className={`${stepStyle} ${
              showSections?.gi
                ? borderStyle + " border-[#1890FF]"
                : borderStyle + " border-gray-500"
            }`}
            onClick={() => onClickSection("gi")}
          >
            General Information
          </div>
          <div
            className={`${stepStyle} ${
              showSections?.p
                ? borderStyle + " border-[#1890FF]"
                : borderStyle + " border-gray-500"
            }`}
            onClick={() => onClickSection("p")}
          >
            Password
          </div>
        </Col>
        <Col span={20}>
          <div className="bg-white px-4 pb-4 pt-2">
            <Form
              name="customized_form_controls"
              className="mt-4"
              layout="vertical"
              onFinish={onFinish}
              initialValues={{
                price: {
                  number: 0,
                  currency: "rmb",
                },
              }}
            >
              <div className={showSections?.gi ? "" : "hidden"}>
                <div className="flex justify-between items-center mb-2">
                  <div className="flex gap-6">
                    <div>
                      <Image
                        width={81}
                        className="rounded-full"
                        src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                      />
                    </div>
                    <div>
                      <h2>Profile picture</h2>
                      Upload image file JPG or PNG (Max size 500kb)
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Upload {...props}>
                      <Button type="primary">Upload photo</Button>
                    </Upload>
                    <Button danger>Remove</Button>
                  </div>
                </div>
                <Form.Item name="fullname" label="Full Name">
                  <Input placeholder="Input Name" />
                </Form.Item>
                <div className="flex gap-2 justify-between">
                  <Form.Item name="division" label="Level" className="grow">
                    <Select placeholder="Input level">
                      {listDivision?.map((division: IDivision) => (
                        <Option key={division?._id} value={division?._id}>
                          {division?.title}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                  <Form.Item
                    name="birthplace"
                    label="Place Of Birth"
                    className="grow"
                  >
                    <Select placeholder="Input place of birth">
                      <Option value="jakarta">Jakarta</Option>
                      <Option value="surabaya">Surabaya</Option>
                    </Select>
                  </Form.Item>
                  <Form.Item
                    name="birthdate"
                    label="Date Of Birth"
                    className="grow"
                  >
                    <DatePicker className="w-full" />
                  </Form.Item>
                </div>
                <Form.Item name="bio" label="Short bio">
                  <Input placeholder="Input bio" />
                </Form.Item>
                <div className="flex gap-2 justify-between">
                  <Form.Item name="phone" className="grow" label="Phone Number">
                    <Input placeholder="Input phone number" />
                  </Form.Item>
                  <Form.Item name="email" className="grow" label="Email">
                    <Input placeholder="Input email" />
                  </Form.Item>
                </div>
                <div className="flex gap-2 justify-end">
                  <Form.Item>
                    <Button type="default">Cancel</Button>
                  </Form.Item>
                  <Form.Item>
                    <Button onClick={() => onClickSection("p")} type="primary">
                      Next
                    </Button>
                  </Form.Item>
                </div>
              </div>
              <div className={showSections?.gi ? "hidden" : ""}>
                <Form.Item name="password" label="Password">
                  <Input.Password
                    placeholder="Input password"
                    iconRender={(visible) =>
                      visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                    }
                  />
                </Form.Item>
                <div className="flex gap-2 justify-end">
                  <Form.Item>
                    <Button onClick={() => onClickSection("gi")} type="default">
                      Cancel
                    </Button>
                  </Form.Item>
                  <Form.Item>
                    <Button
                      type="primary"
                      htmlType="submit"
                      loading={isLoading}
                    >
                      Submit
                    </Button>
                  </Form.Item>
                </div>
              </div>
            </Form>
          </div>
        </Col>
      </Row>
    </>
  );
};

export async function getServerSideProps({ req }: any) {
  const fetchingDivision = await fetch("http://127.0.0.1:3000/api/division", {
    method: "GET",
    headers: getHeader(req.headers.cookie),
  });
  const division = await fetchingDivision.json();

  const fetchingPosition = await fetch("http://127.0.0.1:3000/api/position", {
    method: "GET",
    headers: getHeader(req.headers.cookie),
  });
  const position = await fetchingPosition.json();

  return { props: { division, position } };
}

export default Add;
