import { Card, Col, Row, Statistic } from "antd";
import React, { useRef } from "react";
import styles from "../index.module.less";
import useECharts from "../hooks/useEcharts";
import "echarts/lib/component/tooltip";
import "echarts/lib/chart/line";
import "echarts/lib/coord/cartesian/Grid"; // 目前lineChart中存在问题需要引入这俩解决
import "echarts/lib/coord/cartesian/Axis2D";

import { EChartsFullOption } from "echarts/lib/option";

interface ApiCallCardProps {}

const options: EChartsFullOption = {
  tooltip: {
    trigger: "axis",
  },
  xAxis: {
    type: "category",
    data: [
      "星期一",
      "星期二",
      "星期三",
      "星期四",
      "星期五",
      "星期六",
      "星期日",
    ],
    show: false,
  },
  yAxis: {
    type: "value",
    min: 800,
    show: false,
    max: 1200,
  },
  series: [
    {
      data: [920, 932, 901, 934, 980, 916, 1087],
      type: "line",
    },
  ],
};

const ApiCallCard: React.FC<ApiCallCardProps> = () => {
  const lineChartRef = useRef<HTMLDivElement | null>(null);

  useECharts(lineChartRef, options);

  return (
    <Card>
      <span className="ant-statistic-title">接口调用次数</span>
      <div
        style={{ width: "100%", height: 50, marginTop: 16 }}
        ref={lineChartRef}
      />
      <Row gutter={16}>
        <Col span={12}>
          <Statistic
            title="今日调用"
            value={1087}
            className={`${styles.statisticMinText} ${styles.statisticInline}`}
          />
        </Col>
        <Col span={12}>
          <Statistic
            title="较昨日新增"
            value={171}
            className={`${styles.statisticMinText} ${styles.statisticInline}`}
          />
        </Col>
      </Row>
    </Card>
  );
};

export default ApiCallCard;
