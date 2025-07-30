---
title: 标题
playgroundDirection: horizontal
pageType: custom
---

```tsx
import React, { useRef, useEffect } from 'react';
import VChart from '@visactor/vchart'

function Demo() {
  const spec = {
    type: 'line',
    padding: 0,
    data: {
      values: [
        {
          time: '2:00',
          value: 8
        },
        {
          time: '4:00',
          value: 9
        },
        {
          time: '6:00',
          value: 11
        },
        {
          time: '8:00',
          value: 14
        },
        {
          time: '10:00',
          value: 16
        },
        {
          time: '12:00',
          value: 17
        },
        {
          time: '14:00',
          value: 17
        },
        {
          time: '16:00',
          value: 16
        },
        {
          time: '18:00',
          value: 15
        }
      ]
    },
    xField: 'time',
    yField: 'value'
  }
  const ref = useRef()
  useEffect(() => {
    const vchart = new VChart(spec, { dom: ref.current });
    vchart.renderSync()
    return () => vchart.release()
  })
  return <div ref={ ref } style = {{ height: 300, width: '100%' }}></div>;
}

export default Demo;
```