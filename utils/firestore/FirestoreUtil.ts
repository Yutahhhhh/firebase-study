import {
  Firestore,
  QueryDocumentSnapshot,
  DocumentData,
  getDocs,
  Query,
  CollectionReference,
  collection,
} from 'firebase/firestore'

export namespace FirestoreUtil {
  export abstract class Model<T> {
    abstract get modelName(): string
    abstract docToModel(doc: QueryDocumentSnapshot | DocumentData): T

    get db(): Firestore {
      return useNuxtApp().$db
    }

    getCollectionRef(): CollectionReference {
      return collection(this.db, this.modelName)
    }

    protected async selectByQuery(q: Query): Promise<T[]> {
      const querySnapshot = await getDocs(q)
      const list: T[] = []
      querySnapshot.forEach((doc) => {
        list.push(this.docToModel(doc))
      })
      return list
    }
  }

  export function toD<T>(doc: QueryDocumentSnapshot | DocumentData): T {
    return Object.assign({}, doc.data(), { id: doc.id }) as T
  }
}
