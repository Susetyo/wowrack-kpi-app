import "@/styles/globals.css";
import "@/styles/layout.css";
import type { AppProps } from "next/app";
import "antd/dist/reset.css";
import Layout from "@/components/Layout";
import { useRouter } from "next/router";
import { getCookie } from "@/commons/utils/cookie_tools";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  if (typeof window !== "undefined") {
    const jwt = getCookie("jwtToken");
    if (!jwt && router?.pathname !== "/login") {
      router.push("/login");
    }
  }

  if (router?.pathname === "/login") {
    return <Component {...pageProps} />;
  }

  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
