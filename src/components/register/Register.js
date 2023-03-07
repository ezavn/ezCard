import React, { useContext, useState } from "react";
import { Form, Input, Button, message } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { RealmContext } from "../../context/realmProvider";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { app } = useContext(RealmContext);
  const onFinish = async (values) => {
    setIsLoading(true);
    try {
      await app.emailPasswordAuth
        .registerUser({
          email: values.email.toLowerCase(),
          password: values.password,
        })
        .then((value) => console.log(value));
      message.success("Tạo tài khoản thành công");
      setIsLoading(false);
      navigate("/login");
    } catch (error) {
      message.error("Đã có lỗi xảy ra! Vui lòng thử lại");
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-500 to-blue-300">
      <div className="flex flex-col md:flex-row w-full md:max-w-[980px] p-6 m-[15px] md:mx-auto bg-white rounded-lg shadow-lg">
        <div>
          <img
            src="https://images.unsplash.com/photo-1569229569803-69384f5efa83?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=435&q=80"
            alt=""
            className="object-cover w-full h-[210px] md:h-full"
          />
        </div>
        <Form
          name="register"
          onFinish={onFinish}
          scrollToFirstError
          className="py-[40px] md:py-[80px] px-[20px] md:px-[30px] flex-1 w-full"
          layout="vertical"
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                type: "email",
                message: "The input is not a valid email address",
              },
              {
                required: true,
                message: "Please input your email address",
              },
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Địa chỉ Email"
              className="px-3 py-2 border-gray-300 rounded-lg shadow-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:ring-opacity-50"
            />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password",
              },
              {
                min: 8,
                message: "Password must be at least 8 characters",
              },
            ]}
            hasFeedback
          >
            <Input.Password
              prefix={<LockOutlined className="site-form-item-icon" />}
              placeholder="Mật khẩu"
              className="w-full px-3 py-2 border-gray-300 rounded-lg shadow-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:ring-opacity-50"
            />
          </Form.Item>

          <Form.Item
            name="confirm"
            label="Confirm Password"
            dependencies={["password"]}
            hasFeedback
            rules={[
              {
                required: true,
                message: "Please confirm your password!",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error(
                      "The two passwords that you entered do not match!"
                    )
                  );
                },
              }),
            ]}
          >
            <Input.Password
              prefix={<LockOutlined className="site-form-item-icon" />}
              placeholder="Xác nhận mậy khẩu"
              className="w-full px-3 py-2 border-gray-300 rounded-lg shadow-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:ring-opacity-50"
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="rounded-lg shadow-sm"
              loading={isLoading}
              disabled={isLoading}
            >
              Register
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Register;
