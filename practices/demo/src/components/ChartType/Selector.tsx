import type { ObserveCallback, VBIBuilder } from '@visactor/vbi';
import { Select } from 'antd';
import { useEffect, useState } from 'react';

export const ChartTypeSelector = (props: {
  builder: VBIBuilder;
  style?: React.CSSProperties;
}) => {
  const { builder, style } = props;
  const changeChartType = (chartType: string) => {
    builder.chartType.changeChartType(chartType);
  };

  const [chartType, setChartType] = useState(builder.chartType.getChartType());

  useEffect(() => {
    const updateChartType: ObserveCallback = (event, transaction) => {
      console.info('[observe] chartType', event, transaction);
      setChartType(builder.chartType.getChartType());
    };

    builder.chartType.observe(updateChartType);
    return () => {
      builder.chartType.unobserve(updateChartType);
    };
  }, [builder]);

  const availableChartTypes = builder.chartType.getAvailableChartTypes();
  return (
    <div style={style}>
      <Select
        defaultValue={builder.chartType.getChartType()}
        value={chartType}
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
