import { EditOutlined, SettingOutlined } from "@ant-design/icons";
import { Avatar, Card, Col, Row, Statistic } from "antd";
import React from "react";
const { Meta } = Card;
interface ProjectManageProps {}

const ProjectManage: React.FC<ProjectManageProps> = () => {
  return (
    <>
      <Card className="mb-16">项目管理</Card>
      <Card
        style={{ width: 300 }}
        actions={[
          <EditOutlined key="edit" />,
          <SettingOutlined key="setting" />,
        ]}
      >
        <Meta
          avatar={
            <Avatar src="https://cdn.thisjs.com/images/5-skills-project-management-degree-elmhurst-college-infographic-thumb.jpg?imageView2/1/w/200/h/200/q/75" />
          }
          title="CDN调度平台"
          description={
            <Row gutter={16}>
              <Col span={12}>
                <Statistic title="字段数" value={32} />
              </Col>
              <Col span={12}>
                <Statistic title="调用量" value={192} />
              </Col>
            </Row>
          }
        />
      </Card>
    </>
  );
};

export default ProjectManage;
