import dayjs from 'dayjs'
import { KeyPair } from '@/types/KeyPair'
import { Timestamp, serverTimestamp } from 'firebase/firestore'

export interface IModelBase {
  id: string
  created_at?: Date
  updated_at?: Date
}

export abstract class ModelBase {
  id: string
  created_at?: Date
  updated_at?: Date

  protected constructor(values: Partial<IModelBase>) {
    this.id = values.id || ''
    this.created_at = this.timestampToDate(values?.created_at)
    this.updated_at = this.timestampToDate(values?.updated_at)
  }

  timestampToDate(value?: Date | Timestamp | string | null): Date | undefined {
    if (!value) {
      return undefined
    } else if (value instanceof Timestamp) {
      return value?.toDate()
    } else if (value instanceof Date) {
      return value
    } else if (typeof value === 'string') {
      return new Date(value)
    }
    return undefined
  }

  toParams(): KeyPair {
    const now = serverTimestamp()
    return {
      id: this.id,
      created_at: this.created_at || now,
      updated_at: now
    }
  }

  get createdAtString(): string {
    return this.created_at ? dayjs(this.created_at).format('YYYY/MM/DD HH:mm:ss') : ''
  }
}
