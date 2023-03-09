import React, { useContext, useState } from "react";
import { Form, Input, Button, message } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { RealmContext } from "../../context/realmProvider";
import { useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";

const Register = () => {
  let [searchParams, setSearchParams] = useSearchParams();
  const params = searchParams.get("email");
  console.log(params);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { app } = useContext(RealmContext);
  const [form] = Form.useForm();
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
  useEffect(() => {
    form.setFieldValue("email", params);
  });

  return (
    <div className="flex items-center justify-center min-h-screen register">
      <div className="flex flex-col md:flex-row w-full md:max-w-[980px] p-6 m-[15px] md:mx-auto bg-white rounded-lg shadow-lg">
        <div>
          <img
            src="/images/register-banner.png"
            alt=""
            className="object-cover w-full h-full md:h-[580px] md:w-[435px]"
          />
        </div>
        <Form
          form={form}
          name="register"
          onFinish={onFinish}
          scrollToFirstError
          className="py-[40px] md:py-[80px] px-[10px] md:px-[30px] flex-1 w-full"
          layout="vertical"
        >
          <h3 className="text-[20px] font-bold text-center">
            TẠO TÀI KHOẢN ĐỂ SỞ HỮU THẺ{" "}
            <span className="text-[#FF4D4F]">ez</span>CARD MIỄN PHÍ
          </h3>
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
              placeholder="Xác nhận mật khẩu"
              className="w-full px-3 py-2 border-gray-300 rounded-lg shadow-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:ring-opacity-50"
            />
          </Form.Item>

          <Form.Item>
            <Button
              htmlType="submit"
              className="rounded-lg shadow-sm !bg-[#FF4D4F] text-white border-none"
              loading={isLoading}
              disabled={isLoading}
            >
              Đăng Ký
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Register;
