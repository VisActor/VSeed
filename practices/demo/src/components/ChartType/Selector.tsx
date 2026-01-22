import { Select } from 'antd';
import { useVBIStore } from 'src/model';

export const ChartTypeSelector = (props: { style?: React.CSSProperties }) => {
  const builder = useVBIStore((state) => state.builder);
  const chartType = useVBIStore((state) => state.dsl.chartType);

  const { style } = props;
  const changeChartType = (chartType: string) => {
    builder.chartType.changeChartType(chartType);
  };

  // const [chartType, setChartType] = useState(builder.chartType.getChartType());

  // useEffect(() => {
  //   const updateChartType: ObserveCallback = (event, transaction) => {
  //     console.info('[observe] chartType', event, transaction);
  //     setChartType(builder.chartType.getChartType());
  //   };

  //   builder.chartType.observe(updateChartType);
  //   return () => {
  //     builder.chartType.unobserve(updateChartType);
  //   };
  // }, [builder]);

  const availableChartTypes = builder.chartType.getAvailableChartTypes();
  return (
    <div style={style}>
      <Select
        defaultValue={builder.chartType.getChartType()}
        value={chartType}
        onChange={changeChartType}
        style={{ width: '100%', color: '#e0e0e0' }}
        variant="filled"
        popupMatchSelectWidth={false}
      >
        {availableChartTypes.map((type) => (
          <Select.Option key={type} value={type} style={{ color: '#e0e0e0' }}>
            {type}
          </Select.Option>
        ))}
      </Select>
    </div>
  );
};
