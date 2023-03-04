import { Avatar, Button, Col, Dropdown, Layout, Row, Space, Spin } from "antd";
import { Header } from "antd/es/layout/layout";
import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { LogoutOutlined, UserOutlined } from "@ant-design/icons";
import Login from "../components/login/Login";
import { RealmContext } from "../context/realmProvider";

function MasterLayout(props) {
  const { logout, isLoggedIn, mongo, user } = useContext(RealmContext);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  useEffect(() => {}, [user]);
  if (isLoggedIn) {
    return (
      <Spin spinning={loading} size="large">
        <Header
          style={{
            background: "#222",
            color: "white",
            padding: "15px 20px 15px 20px",
          }}
        >
          <Row justify="space-between" align="middle">
            <Col lg={16} md={12} xs={10}>
              <img
                style={{ width: "100%", maxWidth: "200px" }}
                src="/images/a247logo.webp"
                alt=""
              />
            </Col>
            <Col lg={8} md={12} xs={14} style={{ textAlign: "right" }}>
              <Space>
                <div>
                  <h4 style={{ margin: 0 }}>user</h4>
                  <small></small>
                </div>
                <Dropdown
                  arrow
                  menu={{
                    items: [
                      {
                        label: (
                          <Button
                            type="primary"
                            danger
                            size="small"
                            icon={<LogoutOutlined />}
                            onClick={() => {
                              logout().then(() => {
                                window.location.reload();
                              });
                            }}
                          >
                            Đăng xuất
                          </Button>
                        ),
                        key: "logout",
                      },
                    ],
                  }}
                >
                  <Avatar
                    style={{ backgroundColor: "#87d068", cursor: "pointer" }}
                    icon={<UserOutlined />}
                  />
                </Dropdown>
              </Space>
            </Col>
          </Row>
        </Header>
        <Layout style={{ padding: "20px" }}>
          <Outlet />
        </Layout>

        <p
          style={{
            padding: "20px",
            textAlign: "center",
            background: "#222",
            color: "white",
          }}
        >
          © 2022 <a href="https://www.ezapps.vn"></a>EZ Apps. version 1.0.3
        </p>
      </Spin>
    );
  } else {
    return <Login />;
  }
}

export default MasterLayout;
