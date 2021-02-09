import { CaretUpOutlined, CaretDownOutlined } from "@ant-design/icons";
import { Card, Col, Row, Statistic } from "antd";
import React, { useEffect } from "react";
import styles from "../index.module.less";
import { useSpring, animated } from "react-spring";

interface CurrentVistProps {}

const CurrentVist: React.FC<CurrentVistProps> = () => {
  const [props, set] = useSpring(() => ({
    from: { number: 189000 },
    number: 198777,
  }));

  // 动态改变访问总数
  useEffect(() => {
    const timer = setInterval(() => {
      set({ number: props.number.get() + Math.floor(Math.random() * 1000) });
    }, 3000);
    return () => {
      clearInterval(timer);
    }
  }, [set, props.number]);

  return (
    <Card className={styles.equalHeightCard}>
      <span className="ant-statistic-title">今日访问总数</span>
      <animated.div className="ant-statistic-content">
        {props.number.to((v) => Math.floor(v as number))}
      </animated.div>

      <Row gutter={16}>
        <Col span={12}>
          <Statistic
            title="周同比"
            value={11.28}
            precision={2}
            className={`${styles.statisticMinText} ${styles.statisticInline}`}
            valueStyle={{ color: "#3f8600" }}
            prefix={<CaretUpOutlined />}
            suffix="%"
          />
        </Col>
        <Col span={12}>
          <Statistic
            title="日同比"
            value={10.28}
            precision={2}
            className={`${styles.statisticMinText} ${styles.statisticInline}`}
            valueStyle={{ color: "#cf1322" }}
            prefix={<CaretDownOutlined />}
            suffix="%"
          />
        </Col>
      </Row>
    </Card>
  );
};

export default CurrentVist;
