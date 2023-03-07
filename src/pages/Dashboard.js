import { Card, Checkbox, Col, Form, Input, Row } from "antd";
import React from "react";

function Dashboard(props) {
  console.log(props);
  return (
    <>
      <Card>{/* <QuickAddAssessment /> */}</Card>
      {/* <Card>
        <MultipleAddAssessment />
      </Card> */}
      <Row style={{ marginTop: "20px" }}>
        <Col span={24}>{/* <Assessments /> */}</Col>
      </Row>
    </>
  );
}

export default Dashboard;
