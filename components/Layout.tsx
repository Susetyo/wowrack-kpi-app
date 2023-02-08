import React, { useState } from "react";
import { Layout as LayoutAntd, Menu, theme, Image } from "antd";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  TeamOutlined,
  PartitionOutlined,
  ContainerOutlined,
} from "@ant-design/icons";
import { useRouter } from "next/router";
const { Header, Sider, Content } = LayoutAntd;

interface Props {
  children: any;
}

const Layout = ({ children }: Props) => {
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(true);
  const [title, setTitle] = useState("");
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const onClickUrl = (param: string, t: string) => {
    router.push(param);
    setTitle(t);
  };

  return (
    <LayoutAntd>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        style={{ background: "#202844" }}
        className="sider-container relative"
      >
        <Image
          src="https://www.wowrack.co.id/images/logo.png"
          alt="wow-logo"
          className="p-4 w-full"
          preview={false}
        />
        <div
          className="cursor-pointer  text-lg absolute z-10 right-[-15px] top-[9%] bg-white rounded-full w-[30px] h-[30px] flex items-center justify-center shadow-lg"
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        </div>
        <Menu
          className="bg-[#202844]"
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={[
            {
              key: "1",
              icon: <TeamOutlined />,
              label: "Employee",
              onClick: () => onClickUrl("/employee", "Employee"),
            },
            {
              key: "2",
              icon: <PartitionOutlined />,
              label: "Division",
              onClick: () => onClickUrl("/division", "Division"),
            },
            {
              key: "3",
              icon: <ContainerOutlined />,
              label: "KPI Management",
              onClick: () => onClickUrl("/kpi", "KPI Management"),
            },
          ]}
        />
      </Sider>
      <LayoutAntd className="site-layout">
        <Header
          style={{
            padding: 0,
            background: "#ff8041",
            color: "white",
            paddingLeft: 45,
          }}
        >
          <h2>{title}</h2>
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            height: "100vh",
          }}
        >
          {children}
        </Content>
      </LayoutAntd>
    </LayoutAntd>
  );
};

export default Layout;
