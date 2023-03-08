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
const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
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
    // getBase64(file, (url) => {
    //   const photo = url.replace("data:image/png;base64,", "");
    //   console.log(photo);
    //   form.setFieldValue("photo", url);
    // });
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
            <Form.Item className="hidden" name="photo">
              <Input hidden />
            </Form.Item>
            <Form.Item label="Upload Image">
              <Upload
                name="avatar"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                beforeUpload={beforeUpload}
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
            </Form.Item>
            <Row gutter={20}>
              <Col xl={12} xs={24}>
                <Form.Item
                  name="name"
                  label="Name"
                  rules={[
                    {
                      required: true,
                      message: "Please input your name!",
                    },
                  ]}
                >
                  <Input placeholder="Enter your name" />
                </Form.Item>
              </Col>
              <Col xl={12} xs={24}>
                <Form.Item
                  name="phone"
                  label="Phone"
                  rules={[
                    {
                      required: true,
                      message: "Please input your phone!",
                    },
                  ]}
                >
                  <Input placeholder="Enter your phone" />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={20}>
              <Col xl={12} xs={24}>
                <Form.Item
                  name="company"
                  label="Company"
                  rules={[
                    {
                      required: true,
                      message: "Please input your company!",
                    },
                  ]}
                >
                  <Input placeholder="Enter your company" />
                </Form.Item>
              </Col>
              <Col xl={12} xs={24}>
                <Form.Item
                  name="position"
                  label="Position"
                  rules={[
                    {
                      required: true,
                      message: "Please input your position!",
                    },
                  ]}
                >
                  <Input placeholder="Enter your position" />
                </Form.Item>
              </Col>
            </Row>

            <Form.Item
              name="address"
              label="Address"
              rules={[
                {
                  required: true,
                  message: "Please input your address!",
                },
              ]}
            >
              <Input placeholder="Enter your address" />
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
                  <Input placeholder="Enter your Email address" />
                </Form.Item>
              </Col>

              <Col xl={12} xs={24}>
                <Form.Item name="facebook" label="Facebook">
                  <Input placeholder="Enter your Facebook link" />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={20}>
              <Col xl={12} xs={24}>
                <Form.Item name="zalo" label="Zalo">
                  <Input placeholder="Enter your Zalo number" />
                </Form.Item>
              </Col>

              <Col xl={12} xs={24}>
                <Form.Item name="viber" label="Viber">
                  <Input placeholder="Enter your Viber number" />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={20}>
              <Col xl={12} xs={24}>
                <Form.Item name="services" label="Services Link">
                  <Input placeholder="Enter your link" />
                </Form.Item>
              </Col>

              <Col xl={12} xs={24}>
                <Form.Item name="caseStudy" label="Case Study Link">
                  <Input placeholder="Enter your link" />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={20}>
              <Col xl={12} xs={24}>
                <Form.Item name="brochure" label="Brochure Link">
                  <Input placeholder="Enter your link" />
                </Form.Item>
              </Col>
            </Row>

            <Button type="primary" htmlType="submit" loading={loading}>
              Save Profile
            </Button>
          </Form>
        </div>
        <div className="flex-shrink-0 lg:ml-[30px] mx-auto">
          <Affix offsetTop={10}>
            <div className="flex items-center justify-center flex-col relative mobile-block w-[340px] md:w-[375px] h-[640px] border-solid border-[8px] border-[#021d48] rounded-[40px] overflow-y-auto">
              <div className="mobile-block-top"></div>
              <CardProfile card={card} />
            </div>
          </Affix>
        </div>
      </div>
    )
  );
}
