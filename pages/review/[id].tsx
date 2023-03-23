import { Row, Col, Breadcrumb, Image, Divider } from "antd";
import Link from "next/link";
import { useRouter } from "next/router";
import { getHeader } from "@/commons/utils/fetchOptions";
import {
  ClockCircleOutlined,
  EnvironmentOutlined,
  BankOutlined,
  PhoneOutlined,
  MailOutlined,
  ApartmentOutlined,
} from "@ant-design/icons";

const Detail = ({ data }: any) => {
  console.log(data, "@@data");
  return (
    <>
      <Breadcrumb>
        <Breadcrumb.Item>
          <Link href="/review">Performance Review</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Detail Performance</Breadcrumb.Item>
      </Breadcrumb>

      <Row gutter={[16, 8]} className="mt-4">
        <Col span={12}>
          <div className="bg-white px-4 pb-4 pt-2">
            <div className="my-4">
              <Image
                width={81}
                src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
              />
            </div>
            <div className="text-blue-700 mb-2">
              Karyawan{" "}
              {data?.data?.status === "active" ? "Aktif" : "Tidak Aktif"}
            </div>
            <div className="text-2xl bold">{data?.data?.fullname}</div>
            <Divider />
            <div className="flex gap-2 items-center mb-2">
              <ClockCircleOutlined />
              <div>Joinined company since</div>
            </div>
            <div className="text-lg bold">12 oct 2012</div>
          </div>
        </Col>
        <Col span={12}>
          <div className="bg-white px-4 pb-4 pt-2">
            <div className="text-2xl">Biodata Diri</div>
            <div className="flex justify-between">
              <div className="mt-4">
                <div className="flex gap-2 items-center">
                  <EnvironmentOutlined sizes="lg" />
                  <div className="text-base">Place of Birth</div>
                </div>
                <div className="text-base font-bold">
                  {data?.data?.birthplace} {data?.data?.birthdate}
                </div>
              </div>
              <div className="mt-4">
                <div className="flex gap-2 items-center">
                  <ApartmentOutlined sizes="lg" />
                  <div className="text-base">Division</div>
                </div>
                <div className="text-base font-bold">
                  {data?.data?.division?.title}
                </div>
              </div>
            </div>
            <div className="flex justify-between">
              <div className="mt-4">
                <div className="flex gap-2 items-center">
                  <BankOutlined sizes="lg" />
                  <div className="text-base">Position</div>
                </div>
                <div className="text-base font-bold">
                  {data?.data?.position?.name}
                </div>
              </div>
              <div className="mt-4">
                <div className="flex gap-2 items-center">
                  <MailOutlined sizes="lg" />
                  <div className="text-base">Email</div>
                </div>
                <div className="text-base font-bold">{data?.data?.email}</div>
              </div>
            </div>
            <div className="mt-4">
              <div className="flex gap-2 items-center">
                <PhoneOutlined sizes="lg" />
                <div className="text-base">Phone Number</div>
              </div>
              <div className="text-base font-bold">+6281234444</div>
            </div>
          </div>
          <div className="bg-white px-4 pb-4 pt-2"></div>
        </Col>
      </Row>
    </>
  );
};

export default Detail;

export async function getServerSideProps({ req, query }: any) {
  const fetching = await fetch(
    `http://127.0.0.1:3000/api/performance-review/${query.id}`,
    {
      method: "GET",
      headers: getHeader(req.headers.cookie),
    }
  );
  const data = await fetching.json();

  return { props: { data } };
}
