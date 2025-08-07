import type { PivotChartConstructorOptions } from '@visactor/vtable'
import type { SpecPipe } from 'src/types'

export const pivotGridStyle: SpecPipe = (spec) => {
  const result = { ...spec } as PivotChartConstructorOptions
  const transparent = 'rgba(0,0,0,0)'
  return {
    ...result,
    theme: {
      underlayBackgroundColor: transparent,
      bodyStyle: {
        borderColor: 'rgba(0,4,20,0.2)',
        borderLineWidth: [0, 0, 2, 0],
        bgColor: transparent,
        padding: [0, 0, 1, 0],
      },
      headerStyle: {
        borderColor: 'rgba(0,4,20,0.2)',
        fontSize: 12,
        color: '#333333',
        textAlign: 'center',
        borderLineWidth: 0,
        bgColor: transparent,
        hover: {
          cellBgColor: 'rgba(178,186,207, 0.2)',
        },
      },
      rowHeaderStyle: {
        borderColor: 'rgba(0,4,20,0.2)',
        fontSize: 12,
        color: '#333333',
        borderLineWidth: 0,
        bgColor: transparent,
        hover: {
          cellBgColor: 'rgba(178,186,207, 0.2)',
        },
      },
      cornerHeaderStyle: {
        borderColor: 'rgba(0,4,20,0.2)',
        textAlign: 'center',
        fontSize: 12,
        color: '#333333',
        fontWeight: 'bold',
        borderLineWidth: [0, 0, 0, 0],
        bgColor: transparent,
        hover: {
          cellBgColor: '',
        },
      },
      cornerRightTopCellStyle: {
        borderColor: 'rgba(0,4,20,0.2)',
        borderLineWidth: 0,
        bgColor: transparent,
        hover: {
          cellBgColor: '',
        },
      },
      cornerLeftBottomCellStyle: {
        borderColor: 'rgba(0,4,20,0.2)',
        borderLineWidth: 0,
        bgColor: transparent,
        hover: {
          cellBgColor: '',
        },
      },
      cornerRightBottomCellStyle: {
        borderColor: 'rgba(0,4,20,0.2)',
        borderLineWidth: 0,
        bgColor: transparent,
        hover: {
          cellBgColor: '',
        },
      },
      rightFrozenStyle: {
        borderColor: 'rgba(0,4,20,0.2)',
        borderLineWidth: 0,
        bgColor: transparent,
        hover: {
          cellBgColor: 'rgba(178,186,207, 0.2)',
        },
      },
      bottomFrozenStyle: {
        borderColor: 'rgba(0,4,20,0.2)',
        borderLineWidth: 0,
        bgColor: transparent,
        hover: {
          cellBgColor: 'rgba(178,186,207, 0.2)',
        },
      },
      selectionStyle: {
        cellBgColor: '',
        cellBorderColor: '',
      },
      frameStyle: {
        borderLineWidth: 0,
        bgColor: transparent,
      },
    },
  }
}
