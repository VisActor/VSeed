import { YMapEvent, Transaction } from 'yjs'

export type ObserveCallback = (e: YMapEvent<any>, trans: Transaction) => void
