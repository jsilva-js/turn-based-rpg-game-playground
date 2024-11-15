import Image from "next/image";
import Main from "@/components/Main/Main";
import { ConfigProvider } from "antd";

export default function Home() {
  return (
    <ConfigProvider theme={{ cssVar: true, hashed: false }}>
      <Main />
    </ConfigProvider>
  );
}
