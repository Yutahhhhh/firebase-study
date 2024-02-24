import { FirestoreUtil } from './FirestoreUtil';
import {
  DocumentData,
  QueryDocumentSnapshot,
  query,
  where
} from 'firebase/firestore';
import {
  Vegetable,
  type IVegetable
} from '@/models/Vegetable';

export class VegetableUtil extends FirestoreUtil.Model<Vegetable> {
  get modelName(): string {
    return Vegetable.MODEL_NAME
  }

  docToModel(doc: QueryDocumentSnapshot | DocumentData): Vegetable {
    const docD = FirestoreUtil.toD<IVegetable>(doc)
    return new Vegetable(docD)
  }

  async getByName(name: string): Promise<Vegetable | null> {
    const q = query(super.getCollectionRef(), where('name', '==', name))

    const list = await super.selectByQuery(q)
    return list[0] || null
  }
}
