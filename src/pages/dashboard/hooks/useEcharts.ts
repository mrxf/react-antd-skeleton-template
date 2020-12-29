import { useEffect, useRef } from "react";
import echarts from "echarts/lib/echarts";
import { EChartsFullOption } from "echarts/lib/option";

/**
 * @param chartRef Echarts挂载元素
 * @param config 配置信息
 */
function useECharts(
  chartRef: React.RefObject<HTMLDivElement>,
  config: EChartsFullOption
) {
  const chartInstance = useRef<echarts.EChartsType | null>(null);

  useEffect(() => {
    function renderChart() {
      if (!chartRef.current) {
        return;
      }
      const renderedInstance = echarts.getInstanceByDom(chartRef.current);
      if (renderedInstance) {
        chartInstance.current = renderedInstance;
      } else {
        chartInstance.current = echarts.init(chartRef.current);
      }
      chartInstance.current.setOption(config);
    }
    renderChart();
  }, [chartRef, config]);

  useEffect(() => {
    return () => {
      // 页面/实例 unmount阶段销毁Echarts实例
      chartInstance.current?.dispose();
    };
  }, [chartInstance]);

  return { chartInstance };
}

export default useECharts;
