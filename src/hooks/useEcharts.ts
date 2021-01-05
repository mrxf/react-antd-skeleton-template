import { useEffect, useRef } from "react";
import echarts from "echarts/lib/echarts";
import { EChartsFullOption } from "echarts/lib/option";
import { useDebounce, useSize } from "ahooks";

/**
 * @param chartRef Echarts挂载元素
 * @param config 配置信息
 */
function useECharts(
  chartRef: React.RefObject<HTMLDivElement>,
  config: EChartsFullOption
) {
  const chartInstance = useRef<echarts.EChartsType | null>(null);

  // 容器尺寸变化时，刷新Echarts尺寸
  const size = useSize(chartRef);

  // FIXME: 修复由于debounce导致图表初始化时重复创建的问题
  const debouncedSize = useDebounce(size, { wait: 500 });

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

    return () => {
      // unmount阶段销毁Echarts实例
      chartInstance.current?.dispose();
    };
  }, [chartRef, config, debouncedSize]);

  return { chartInstance };
}

export default useECharts;
