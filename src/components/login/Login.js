import React, { useContext, useEffect } from "react";
import { RealmContext } from "../../context/realmProvider";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Field from "./Field";
import Label from "./Label";
import InputPasswordToggle from "./InputPasswordToggle";
import Input from "./Input";
import Button from "./Button";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

const schema = yup.object({
  email: yup
    .string()
    .email("Vui lòng nhập địa chỉ email hợp lệ")
    .required("Vui lòng nhập địa chỉ email"),
  password: yup
    .string()
    .required("Vui lòng nhập mật khẩu")
    .min(6, "Mật khẩu tối thiểu 6 ký tự"),
});

function Login(props) {
  const navigate = useNavigate();
  const { login } = useContext(RealmContext);
  const {
    handleSubmit,
    control,
    formState: { isValid, isSubmitting, errors },
  } = useForm({
    // mode: "onChange",
    resolver: yupResolver(schema),
  });
  useEffect(() => {
    const arrError = Object.values(errors);
    if (arrError.length > 0) {
      toast.error(arrError[0]?.message, {
        pauseOnHover: false,
        delay: 0,
      });
    }
    //console.log("errors: ", errors);
  }, [errors]);
  const handleSignIn = async (values) => {
    if (!isValid) return;
    try {
      await login("emailPassword", values.email.toLowerCase(), values.password);
      toast.success("Đăng nhập thành công");
      navigate("/");
    } catch (error) {
      toast.error("Tài khoản của bạn không chính xác! Vui lòng thử lại");
    }
  };
  return (
    <div className="flex w-full md:h-[100vh] md:flex-row flex-col-reverse">
      <div className="flex items-center justify-center flex-1 mx-[15px] md:mx-0 pt-[30px] pb-[80px] md:pt-0 md:pb-0">
        <form
          className="form w-full md:w-[550px]"
          onSubmit={handleSubmit(handleSignIn)}
          autoComplete="off"
        >
          <div className="mb-[20px] md:mb-[40px]">
            <h2 className="text-center md:text-left text-[34px] font-semibold text-[#2E2E2E]">
              Chào mừng bạn đến với ezCARD
            </h2>
            <p className="md:text-left text-center text-[16px] text-[#979797]">
              Vui lòng nhập thông tin đăng nhập của bạn.
            </p>
          </div>
          <Field>
            <Label htmlFor="email">Email</Label>
            <Input
              type="text"
              name="email"
              placeholder="Nhập địa chỉ email"
              control={control}
              disabled={isSubmitting}
            ></Input>
          </Field>
          <Field>
            <Label htmlFor="password">Password</Label>
            <InputPasswordToggle
              control={control}
              disabled={isSubmitting}
            ></InputPasswordToggle>
          </Field>
          <div className="flex flex-col justify-between md:flex-row">
            <div>
              Bạn chưa có tài khoản? <Link to="/register">Đăng ký</Link>
            </div>
            <div>
              <Link to="/reset">Quên mật khẩu?</Link>
            </div>
          </div>
          <Button
            type="submit"
            className="w-full mt-[40px]"
            isLoading={isSubmitting}
            disabled={isSubmitting}
          >
            Đăng Nhập
          </Button>
        </form>
      </div>
      <div className="flex items-center justify-center flex-shrink-0 w-full md:w-[50%] bg-[#f3f5f9]">
        <img
          className="md:w-full md:h-full h-[200px] w-full object-cover object-top"
          src="https://images.unsplash.com/photo-1605098293544-25f4c32344c8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=435&q=80"
          alt=""
        />
      </div>
    </div>
  );
}

export default Login;
