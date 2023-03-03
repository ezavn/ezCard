import { Avatar, Button, Col, Dropdown, Layout, Row, Space, Spin } from "antd";
import { Header } from "antd/es/layout/layout";
import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { LogoutOutlined, UserOutlined } from "@ant-design/icons";
import Login from "../components/login/Login";
import { RealmContext } from "../context/realmProvider";
import {
  updateOneAssessment,
  fetchAssessments,
  getUser,
  selectUser,
  deleteOneAssessment,
  updateUser,
} from "../redux/assessmentsSlice";
import { objectIdToString } from "../utils";

function MasterLayout(props) {
  const { logout, isLoggedIn, mongo, user } = useContext(RealmContext);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const currentUser = useSelector(selectUser);

  useEffect(() => {
    if (isLoggedIn) {
      setLoading(true);
      dispatch(getUser({ mongo, user }));
      dispatch(fetchAssessments({ mongo, user })).then(() => {
        setLoading(false);
      });
      // const changeStream = async () => {
      //   for await (const change of mongo
      //     .db("a247")
      //     .collection("assessments")
      //     .watch()) {
      //     const { documentKey, fullDocument } = change;
      //     switch (change.operationType) {
      //       case "update":
      //       case "replace": {
      //         dispatch(
      //           updateOneAssessment(
      //             objectIdToString({
      //               id: fullDocument._id,
      //               changes: fullDocument,
      //             })
      //           )
      //         );
      //         break;
      //       }
      //       case "delete": {
      //         dispatch(deleteOneAssessment(objectIdToString(documentKey._id)));
      //         break;
      //       }
      //     }
      //   }
      // };

      // const userStream = async () => {
      //   for await (const change of mongo
      //     .db("a247")
      //     .collection("user")
      //     .watch()) {
      //     const { documentKey, fullDocument } = change;
      //     dispatch(getUser({ mongo, user }));
      //     switch (change.operationType) {
      //       case "update":
      //       case "replace": {
      //         dispatch(updateUser(objectIdToString(fullDocument)));
      //         break;
      //       }
      //     }
      //   }
      // };
      // changeStream();
      // userStream();
    }
  }, [user]);
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
                  <h4 style={{ margin: 0 }}>{currentUser.email}</h4>
                  <small>
                    <strong>
                      {Intl.NumberFormat("en-US").format(currentUser.credit)}
                    </strong>{" "}
                    Credit{" "}
                  </small>
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
