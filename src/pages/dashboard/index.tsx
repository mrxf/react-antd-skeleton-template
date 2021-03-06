import { Card, Col, Progress, Row, Statistic } from "antd";
import styles from "./index.module.less";
import React from "react";
import ApiCallCard from "./components/apiCallCard";
import CurrentVist from "./components/currentVisit";

interface DashboardProps {}

const Dashboard: React.FC<DashboardProps> = () => {
  return (
    <Row gutter={24}>
      <Col span={8}>
        <CurrentVist />
      </Col>
      <Col span={8}>
        <Card className={styles.equalHeightCard}>
          <Statistic title="当前项目开发进度" value={66} suffix="%" />
          <Progress percent={66} status="active" />
          <Row gutter={16}>
            <Col span={12}>
              <Statistic
                title="已知BUG数"
                value={3}
                className={`${styles.statisticMinText} ${styles.statisticInline}`}
              />
            </Col>
            <Col span={12}>
              <Statistic
                title="新增功能数"
                value={10}
                className={`${styles.statisticMinText} ${styles.statisticInline}`}
              />
            </Col>
          </Row>
        </Card>
      </Col>
      <Col span={8}>
        <ApiCallCard />
      </Col>
    </Row>
  );
};

export default Dashboard;
