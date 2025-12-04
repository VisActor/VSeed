import { isUrl } from 'src/utils'
import { DatasetSourceType, DatasetSourceValue, RawDatasetSource, TidyDatum } from '../types'

export class DatasetSourceBuilder {
  private type: DatasetSourceType
  private value: DatasetSourceValue

  constructor(raw: RawDatasetSource) {
    this.type = raw.type
    this.value = raw.rawDataset
  }

  public static from(raw: RawDatasetSource): DatasetSourceBuilder {
    return new DatasetSourceBuilder(raw)
  }

  public async build() {
    const blob = await DatasetSourceBuilder.convertToBlob(this.type, this.value)

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
        return DatasetSourceBuilder.fetchBlob(csvSource)
      }
      return new Blob([JSON.stringify(csvSource)], { type: 'text/csv' })
    }
    const convertJsonToBlob = (jsonSource: string | ArrayBuffer | TidyDatum[]) => {
      if (jsonSource instanceof ArrayBuffer) {
        return new Blob([jsonSource], { type: 'application/json' })
      }
      if (typeof jsonSource === 'string' && isUrl(jsonSource)) {
        return DatasetSourceBuilder.fetchBlob(jsonSource)
      }
      return new Blob([JSON.stringify(jsonSource)], { type: 'application/json' })
    }
    const convertParquetToBlob = (parquetSource: string | ArrayBuffer) => {
      if (parquetSource instanceof ArrayBuffer) {
        return new Blob([parquetSource], { type: 'application/parquet' })
      }
      if (typeof parquetSource === 'string' && isUrl(parquetSource)) {
        return DatasetSourceBuilder.fetchBlob(parquetSource)
      }
      return new Blob([parquetSource], { type: 'application/parquet' })
    }
    const convertXlsxToBlob = (xlsxSource: string | ArrayBuffer) => {
      if (xlsxSource instanceof ArrayBuffer) {
        return new Blob([xlsxSource], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })
      }
      if (typeof xlsxSource === 'string' && isUrl(xlsxSource)) {
        return DatasetSourceBuilder.fetchBlob(xlsxSource)
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
