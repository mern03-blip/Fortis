import { Layout } from "antd";
import { Outlet } from "react-router-dom";
// import Sidebar from "./sidebar/Sidebar";

const { Content, Sider } = Layout;

const AppLayout = () => {
  return (
    <Layout
      style={{
        minHeight: "100vh",

      }}
    >
      {/* <Sider
        width={270}
        className="sider-style"
        style={{ position: "fixed", height: "100vh", top: 0, left: 0 }}
      >
        <Sidebar />
      </Sider> */}
      <Layout>
        <Content className="bg-whiteColor ">
          <div id="detail">
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default AppLayout;
