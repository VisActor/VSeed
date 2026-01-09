import { VBIBuilder } from '@visactor/vbi';
import { Select } from 'antd';

export const ChartTypeSelector = (props: {
  builder: VBIBuilder;
  style?: React.CSSProperties;
}) => {
  const { builder, style } = props;
  const changeChartType = (chartType: string) => {
    builder.chartType.changeChartType(chartType);
  };

  const availableChartTypes = builder.chartType.getAvailableChartTypes();
  return (
    <div style={style}>
      <Select
        defaultValue={builder.chartType.getChartType()}
        onChange={changeChartType}
        style={{ width: '100%' }}
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
