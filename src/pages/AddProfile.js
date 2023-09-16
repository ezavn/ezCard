import React, { useContext, useState } from "react";
import { Form, Input, Button, Upload, message, Row, Col } from "antd";
import { PlusOutlined, LoadingOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { RealmContext } from "../context/realmProvider";
import ShortUniqueId from "short-unique-id";
import { insertCard } from "../redux/cardsSlice";
import storage from "../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { Link, useNavigate } from "react-router-dom";
import ImgCrop from "antd-img-crop";
import Editor from "../components/Editor";

const uid = new ShortUniqueId({
  dictionary: "alphanum_lower",
  length: 5,
});
const FormItem = Form.Item;

const handleCropImg = async (file) => {
  let src = file.url;
  if (!src) {
    src = await new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(file.originFileObj);
      reader.onload = () => resolve(reader.result);
    });
  }
  const image = new Image();
  image.src = src;
  const imgWindow = window.open(src);
  imgWindow?.document.write(image.outerHTML);
};

const AddProfile = () => {
  const { mongo, user } = useContext(RealmContext);
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);
  const [short] = useState(uid());
  const navigate = useNavigate();

  const beforeUpload = (file) => {
    handleUpload(file);
    return false;
  };

  const handleUpload = (file) => {
    uploadBytes(ref(storage, `/images/${short}/avatar.png`), file).then(
      (snapshot) => {
        return getDownloadURL(snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
          form.setFieldValue("avatar", downloadURL);
          setImageUrl(downloadURL);
        });
      }
    );
  };

  const handleFinish = (values) => {
    setLoading(true);
    console.log("values:", values);
    dispatch(
      insertCard({
        mongo,
        user,
        entity: {
          short,
          ...values,
        },
      })
    );
    setLoading(false);
    navigate("/");
  };

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </div>
  );

  return (
    <div className="w-full h-full bg-[#f5f5f5] py-[50px] relative">
      <Button type="primary" className="absolute top-0">
        <Link to="/">Quay Lại</Link>
      </Button>
      <div className="max-w-[700px] mx-auto p-[30px] rounded-md bg-white shadow-lg">
        <h2 className="mb-[30px]">Tạo Hồ Sơ Mới</h2>
        <Form
          layout="vertical"
          form={form}
          name="my-form"
          onFinish={handleFinish}
        >
          <Form.Item className="hidden" name="avatar">
            <Input hidden />
          </Form.Item>
          <FormItem label="Upload Avatar">
            <ImgCrop rotate>
              <Upload
                name="avatar"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                beforeUpload={beforeUpload}
                onPreview={handleCropImg}
              >
                {imageUrl ? (
                  <img
                    src={imageUrl}
                    alt="avatar"
                    style={{
                      width: "100%",
                    }}
                  />
                ) : (
                  uploadButton
                )}
              </Upload>
            </ImgCrop>
          </FormItem>

          <Row gutter={20}>
            <Col xl={12} xs={24}>
              <Form.Item
                name="name"
                label="Họ và tên"
                rules={[
                  {
                    required: true,
                    message: "Làm ơn nhập họ và tên!",
                  },
                ]}
              >
                <Input placeholder="Nhập Họ và Tên" />
              </Form.Item>
            </Col>
            <Col xl={12} xs={24}>
              <Form.Item
                name="phone"
                label="Phone"
                rules={[
                  {
                    required: true,
                    message: "Làm ơn nhập SĐT!",
                  },
                ]}
              >
                <Input placeholder="Nhập SĐT" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={20}>
            <Col xl={12} xs={24}>
              <Form.Item
                name="company"
                label="Công ty"
                rules={[
                  {
                    required: true,
                    message: "Làm ơn nhập tên công ty!",
                  },
                ]}
              >
                <Input placeholder="Nhập tên công ty" />
              </Form.Item>
            </Col>
            <Col xl={12} xs={24}>
              <Form.Item
                name="position"
                label="Chức vụ"
                rules={[
                  {
                    required: true,
                    message: "Làm ơn nhập chức vụ!",
                  },
                ]}
              >
                <Input placeholder="Nhập chức vụ" />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            name="address"
            label="Địa chỉ"
            rules={[
              {
                required: true,
                message: "Làm ơn nhập địa chỉ!",
              },
            ]}
          >
            <Input placeholder="Nhập địa chỉ" />
          </Form.Item>

          {/* <Form.Item
              name="title"
              label="Title"
              rules={[
                {
                  required: true,
                  message: "Please input your title!",
                },
              ]}
            >
              <Input placeholder="Enter your title" />
            </Form.Item> */}

          <Row gutter={20}>
            <Col xl={12} xs={24}>
              <Form.Item name="gmail" label="Email">
                <Input placeholder="Nhập địa chỉ Email" />
              </Form.Item>
            </Col>

            <Col xl={12} xs={24}>
              <Form.Item name="facebook" label="Facebook">
                <Input placeholder="Nhập link Facebook" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={20}>
            <Col xl={12} xs={24}>
              <Form.Item name="zalo" label="Zalo">
                <Input placeholder="Nhập số Zalo" />
              </Form.Item>
            </Col>

            <Col xl={12} xs={24}>
              <Form.Item name="viber" label="Viber">
                <Input placeholder="Nhập số Viber" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={20}>
            <Col xl={12} xs={24}>
              <Form.Item name="whatsapp" label="Whatsapp">
                <Input placeholder="Nhập số Whatsapp" />
              </Form.Item>
            </Col>
            <Col xl={12} xs={24}>
              <Form.Item name="line" label="Line">
                <Input placeholder="Nhập số Line" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={20}>
            <Col xl={12} xs={24}>
              <Form.Item name="wechat" label="WeChat">
                <Input placeholder="Nhập số WeChat" />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item name="desctitle" label="Tiêu đề mô tả">
            <Input placeholder="Nhập tiêu đề" />
          </Form.Item>

          <Form.Item label="Mô tả" name="content">
            <Editor />
          </Form.Item>

          <Row gutter={20}>
            <Col xl={12} xs={24}>
              <Form.Item name="website" label="Website">
                <Input placeholder="Nhập link của bạn" />
              </Form.Item>
            </Col>

            <Col xl={12} xs={24}>
              <Form.Item name="profile" label="Hồ sơ năng lực">
                <Input placeholder="Nhập link của bạn" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={20}>
            <Col xl={12} xs={24}>
              <Form.Item name="profileVN" label="Profile VN">
                <Input placeholder="Nhập link của bạn" />
              </Form.Item>
            </Col>

            <Col xl={12} xs={24}>
              <Form.Item name="profileEN" label="Profile EN">
                <Input placeholder="Nhập link của bạn" />
              </Form.Item>
            </Col>
          </Row>

          {/* <Row gutter={20}>
            <Col xl={12} xs={24}>
              <Form.Item name="brochure" label="Brochure Link">
                <Input placeholder="Nhập link của bạn" />
              </Form.Item>
            </Col>
          </Row> */}

          <Button type="primary" htmlType="submit" loading={loading}>
            Save Profile
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default AddProfile;
