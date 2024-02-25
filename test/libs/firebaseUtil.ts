import {
  initializeTestEnvironment as _initializeTestEnvironment,
  RulesTestEnvironment,
} from '@firebase/rules-unit-testing'
import { readFileSync } from 'fs'

let testEnv: RulesTestEnvironment

export const initializeTestEnvironment = async (projectId: string) => {
  testEnv = await _initializeTestEnvironment({
    projectId,
    firestore: {
      host: '127.0.0.1',
      port: 8080,
      rules: readFileSync('firestore.rules', 'utf8'),
    },
  })
}

export const getTestEnv = () => testEnv
