import firebase from 'firebase/app'
import {
  getFirestore,
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
    $firebase: firebase.FirebaseApp

    constructor($firebase: firebase.FirebaseApp) {
      this.$firebase = $firebase
    }

    get db(): Firestore {
      return getFirestore()
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
