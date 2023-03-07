import { Avatar, Button, Col, Dropdown, Layout, Row, Space, Spin } from "antd";
import { Header } from "antd/es/layout/layout";
import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet } from "react-router-dom";
import { LogoutOutlined, UserOutlined } from "@ant-design/icons";
import Login from "../components/login/Login";
import { RealmContext } from "../context/realmProvider";
import { fetchCards } from "../redux/cardsSlice";

function MasterLayout(props) {
  const { logout, isLoggedIn, mongo, user } = useContext(RealmContext);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  console.log(user);
  useEffect(() => {
    dispatch(fetchCards({ mongo, user })); // dispatch thunk action creator
  }, [user]);

  if (isLoggedIn) {
    return (
      <Spin spinning={loading} size="large">
        <Header
          style={{
            background: "#222",
            color: "white",
            padding: "15px 20px 15px 20px",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Row justify="space-between" align="middle" className="flex-1">
            <Col lg={16} md={12} xs={10}>
              <img
                style={{ width: "100%", maxWidth: "200px" }}
                src="/images/ezcard-logo-white.png"
                alt=""
              />
            </Col>
            <Col lg={8} md={12} xs={14} style={{ textAlign: "right" }}>
              <Space>
                <div>
                  {/* <h4 style={{ margin: 0 }}>{user._profile.data.email}</h4> */}
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
          © 2023 <a href="https://www.ezapp.vn"></a>EZ Apps. version 1.0
        </p>
      </Spin>
    );
  } else {
    return (
      <div className="max-w-[100vw]">
        <div className="relative">
          <Link
            className="absolute top-[40px] right-[40px] z-10 text-white no-underline flex items-center justify-center bg-black py-[15px] px-[40px] font-medium rounded-lg"
            to="/login"
          >
            Đăng Nhập
          </Link>
          <img className="max-w-[100%]" src="/images/ez-1.png" alt="" />
        </div>
        <div>
          <img className="max-w-[100%]" src="/images/ez-2.png" alt="" />
        </div>
        <div>
          <img className="max-w-[100%]" src="/images/ez-3.png" alt="" />
        </div>
      </div>
    );
  }
}

export default MasterLayout;
