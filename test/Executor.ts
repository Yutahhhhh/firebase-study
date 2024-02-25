import { type KeyPair } from '@/types/KeyPair'
import { FirebaseFirestore } from '@firebase/firestore-types'
import {
  QuerySnapshot,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc
} from 'firebase/firestore'

export default class Executor {
  db: FirebaseFirestore
  collectionName: string

  constructor(
    db: FirebaseFirestore,
    collectionName: string
  ) {
    this.db = db
    this.collectionName = collectionName
  }

  collectionRef() {
    return this.db.collection(this.collectionName)
  }

  documentRef(id: string) {
    return doc(this.collectionRef(), id)
  }

  async get(id: string) {
    return getDoc(this.documentRef(id))
  }

  async all(): Promise<QuerySnapshot> {
    return getDocs(this.collectionRef())
  }

  async create(id: string, data: KeyPair): Promise<void> {
    return setDoc(this.documentRef(id), data)
  }

  async update(id: string, data: KeyPair): Promise<void> {
    return updateDoc(this.documentRef(id), data)
  }

  async delete(id: string): Promise<void> {
    return deleteDoc(this.documentRef(id))
  }
}
