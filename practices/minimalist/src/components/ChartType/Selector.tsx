import { Select } from 'antd';
import { useVBIStore } from 'src/model';

export const ChartTypeSelector = (props: { style?: React.CSSProperties }) => {
  const builder = useVBIStore((state) => state.builder);
  const chartType = useVBIStore((state) => state.dsl.chartType);

  const { style } = props;
  const changeChartType = (chartType: string) => {
    builder.chartType.changeChartType(chartType);
  };

  const availableChartTypes = builder.chartType.getAvailableChartTypes();

  return (
    <div style={style}>
      <Select
        // Ant Design 5.x 支持 'filled' 模式，更贴合 DataWind 风格
        // 如果是 4.x 版本，可以删除 variant 属性
        variant="filled"
        defaultValue={builder.chartType.getChartType()}
        value={chartType}
        onChange={changeChartType}
        style={{ width: '100%' }}
        placeholder="Select chart type"
      >
        {availableChartTypes.map((type) => (
          <Select.Option key={type} value={type}>
            {type}
          </Select.Option>
        ))}
      </Select>
    </div>
  );
};
