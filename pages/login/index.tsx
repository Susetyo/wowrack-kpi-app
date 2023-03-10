import React from "react";
import { Button, Form, Input, message } from "antd";
import { fetchPostLogin } from "@/commons/utils/fetchOptions";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import Image from "next/image";
import { useRouter } from "next/router";
import { setCookie } from "@/commons/utils/cookie_tools";

const Login: React.FC = () => {
  const router = useRouter();
  const onFinish = async (values: any) => {
    try {
      const { email, password } = values;
      const res = await fetchPostLogin("/api/auth/login", {
        email,
        password,
      });
      setCookie("jwtToken", res?.data, 1);
      message.success("Login Success !!!");
      router.push("/employee");
    } catch (err) {
      console.log(err);
      message.error("Something went wrong !!!");
    }

    console.log(fetch, "@@fetch");
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="h-[100vh] w-full flex items-center justify-center bg-[#ff8041]">
      <div className="flex w-full h-full mx-28 ">
        <div className="w-[500px] p-5 my-40 shadow-lg bg-[#202844]">
          <div className="flex items-center justify-center mb-4">
            <Image
              src="https://cdn.techinasia.com/data/images/poFrQfcAPQJ6DqwbqVJX1YQs6J4bUYdMpGexFvFZ.png"
              alt="Picture of the author"
              width={100}
              height={100}
            />
          </div>
          <Form
            name="basic"
            style={{ maxWidth: 600 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              name="email"
              rules={[{ required: true, message: "Please input your email!" }]}
              className="mb-9"
            >
              <Input
                prefix={<UserOutlined />}
                placeholder="Email"
                size="large"
                className="h-[50px]"
              />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="Password"
                size="large"
                className="h-[50px]"
              />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" block size="large">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>
        <div className="relative flex-grow my-40 shadow-lg">
          <Image
            src="https://careers.wowrack.co.id/img/gallery/IMG_6427-min.jpeg"
            alt="Picture of the author"
            fill
            style={{
              objectFit: "cover",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
