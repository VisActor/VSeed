import type { PivotChartConstructorOptions } from '@visactor/vtable'
import type { SpecPipe } from 'src/types'

export const pivotGridStyle: SpecPipe = (spec) => {
  const result = { ...spec } as PivotChartConstructorOptions
  const transparent = 'rgba(0,0,0,0)'

  const hoverBackgroundColor = 'rgba(178,186,207, 0.2)'
  return {
    ...result,
    theme: {
      underlayBackgroundColor: transparent,
      bodyStyle: {
        borderColor: 'rgba(0,4,20,0.2)',
        borderLineWidth: [0, 0, 2, 0],
        bgColor: transparent,
        padding: [0, 0, 1, 0],
        hover: {
          cellBgColor: hoverBackgroundColor,
        },
      },
      headerStyle: {
        borderColor: 'rgba(0,4,20,0.2)',
        fontSize: 12,
        color: '#333333',
        textAlign: 'center',
        borderLineWidth: 0,
        bgColor: transparent,
        hover: {
          cellBgColor: hoverBackgroundColor,
        },
      },
      rowHeaderStyle: {
        borderColor: 'rgba(0,4,20,0.2)',
        fontSize: 12,
        color: '#333333',
        borderLineWidth: 0,
        bgColor: transparent,
        hover: {
          cellBgColor: hoverBackgroundColor,
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
          cellBgColor: hoverBackgroundColor,
        },
      },
      cornerRightTopCellStyle: {
        borderColor: 'rgba(0,4,20,0.2)',
        borderLineWidth: 0,
        bgColor: transparent,
        hover: {
          cellBgColor: hoverBackgroundColor,
        },
      },
      cornerLeftBottomCellStyle: {
        borderColor: 'rgba(0,4,20,0.2)',
        borderLineWidth: 0,
        bgColor: transparent,
        hover: {
          cellBgColor: hoverBackgroundColor,
        },
      },
      cornerRightBottomCellStyle: {
        borderColor: 'rgba(0,4,20,0.2)',
        borderLineWidth: 0,
        bgColor: transparent,
        hover: {
          cellBgColor: hoverBackgroundColor,
        },
      },
      rightFrozenStyle: {
        borderColor: 'rgba(0,4,20,0.2)',
        borderLineWidth: 0,
        bgColor: transparent,
        hover: {
          cellBgColor: hoverBackgroundColor,
        },
      },
      bottomFrozenStyle: {
        borderColor: 'rgba(0,4,20,0.2)',
        borderLineWidth: 0,
        bgColor: transparent,
        hover: {
          cellBgColor: hoverBackgroundColor,
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
