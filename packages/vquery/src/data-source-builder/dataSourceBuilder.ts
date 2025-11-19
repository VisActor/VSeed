import { isUrl } from 'src/utils'
import { DatasetSourceType, DatasetSourceValue, TidyDatum } from '../types'

export class DataSourceBuilder {
  private type: DatasetSourceType
  private value: DatasetSourceValue

  constructor(type: DatasetSourceType, value: DatasetSourceValue) {
    this.type = type
    this.value = value
  }

  public static from(type: DatasetSourceType, value: DatasetSourceValue) {
    return new DataSourceBuilder(type, value)
  }

  public async build() {
    const blob = await DataSourceBuilder.convertToBlob(this.type, this.value)

    return {
      type: this.type,
      blob: blob,
    }
  }

  /**
   * 将不同类型的数据转换为Blob
   */
  private static async convertToBlob(type: DatasetSourceType, value: DatasetSourceValue): Promise<Blob> {
    if (value instanceof Blob) {
      return value
    }

    const convertCsvToBlob = (csvSource: string | ArrayBuffer | TidyDatum[]) => {
      if (csvSource instanceof ArrayBuffer) {
        return new Blob([csvSource], { type: 'text/csv' })
      }
      if (typeof csvSource === 'string' && isUrl(csvSource)) {
        return DataSourceBuilder.fetchBlob(csvSource)
      }
      return new Blob([JSON.stringify(csvSource)], { type: 'text/csv' })
    }
    const convertJsonToBlob = (jsonSource: string | ArrayBuffer | TidyDatum[]) => {
      if (jsonSource instanceof ArrayBuffer) {
        return new Blob([jsonSource], { type: 'application/json' })
      }
      if (typeof jsonSource === 'string' && isUrl(jsonSource)) {
        return DataSourceBuilder.fetchBlob(jsonSource)
      }
      return new Blob([JSON.stringify(jsonSource)], { type: 'application/json' })
    }
    const convertParquetToBlob = (parquetSource: string | ArrayBuffer) => {
      if (parquetSource instanceof ArrayBuffer) {
        return new Blob([parquetSource], { type: 'application/parquet' })
      }
      if (typeof parquetSource === 'string' && isUrl(parquetSource)) {
        return DataSourceBuilder.fetchBlob(parquetSource)
      }
      return new Blob([parquetSource], { type: 'application/parquet' })
    }
    const convertXlsxToBlob = (xlsxSource: string | ArrayBuffer) => {
      if (xlsxSource instanceof ArrayBuffer) {
        return new Blob([xlsxSource], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })
      }
      if (typeof xlsxSource === 'string' && isUrl(xlsxSource)) {
        return DataSourceBuilder.fetchBlob(xlsxSource)
      }
      return new Blob([xlsxSource], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })
    }

    switch (type) {
      case 'csv': {
        return convertCsvToBlob(value as string)
      }
      case 'json': {
        return convertJsonToBlob(value as string)
      }
      case 'xlsx': {
        return convertXlsxToBlob(value as string)
      }
      case 'parquet': {
        return convertParquetToBlob(value as string)
      }
      default: {
        return new Blob([value as unknown as string])
      }
    }
  }

  private static async fetchBlob(url: string) {
    const response = await fetch(url)
    return await response.blob()
  }
}
