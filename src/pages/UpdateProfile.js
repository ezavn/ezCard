import { Affix, Button, Card, Col, Form, Input, Row, Upload } from "antd";
import React, { useContext, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { selectCardById } from "../redux/cardsSlice";
import storage from "../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { PlusOutlined, LoadingOutlined } from "@ant-design/icons";
import { updateCard } from "../redux/cardsSlice";
import { RealmContext } from "../context/realmProvider";
import { useNavigate } from "react-router-dom";
import CardProfile from "../components/CardProfile/CardProfile";
import { useEffect } from "react";
import ImgCrop from "antd-img-crop";
import Editor from "../components/Editor";

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

export default function UpdateProfile() {
  const { mongo } = useContext(RealmContext);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  let { id } = useParams();
  const card = useSelector(selectCardById(id));
  //console.log(card);
  const [imageUrl, setImageUrl] = useState(card?.avatar);
  const navigate = useNavigate();

  const beforeUpload = (file) => {
    handleUpload(file);
    return false;
  };

  const handleUpload = (file) => {
    uploadBytes(ref(storage, `/images/${card.short}/avatar.png`), file).then(
      (snapshot) => {
        return getDownloadURL(snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
          form.setFieldValue("avatar", downloadURL);
          setImageUrl(downloadURL);
        });
      }
    );
  };

  const handleFinish = (update) => {
    setLoading(true);
    console.log("values:", update);
    dispatch(
      updateCard({
        mongo,
        id: card._id,
        update,
      })
    );
    setLoading(false);
  };
  useEffect(() => {
    setImageUrl(card?.avatar);
  }, [card]);

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
    card && (
      <div className="flex flex-col lg:flex-row w-full h-full py-[50px] relative">
        <Button type="primary" className="absolute top-0">
          <Link to="/">Quay Lại</Link>
        </Button>
        <div className="flex-1 w-full md:max-w-full mx-auto p-[30px] rounded-md bg-white shadow-lg mb-[30px]">
          <h2 className="mb-[30px]">Cập Nhật Hồ Sơ</h2>
          <Form
            form={form}
            layout="vertical"
            name="updateProfile"
            onFinish={handleFinish}
            initialValues={card}
          >
            <Form.Item className="hidden" name="avatar">
              <Input hidden />
            </Form.Item>
            <Form.Item label="Upload Avatar">
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
            </Form.Item>

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

            {/* <Form.Item
              name="description"
              label="Description"
              rules={[
                {
                  required: true,
                  message: "Please input your description!",
                },
              ]}
            >
              <Input.TextArea rows={4} placeholder="Enter your description" />
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
        <div className="flex-shrink-0 lg:ml-[30px] mx-auto">
          <Affix offsetTop={10}>
            <div className="flex items-center justify-center flex-col relative mobile-block w-[340px] md:w-[375px] h-[720px] border-solid border-[8px] border-[#021d48] rounded-[40px] overflow-y-auto">
              <div className="mobile-block-top"></div>
              <CardProfile card={card} />
            </div>
          </Affix>
        </div>
      </div>
    )
  );
}
