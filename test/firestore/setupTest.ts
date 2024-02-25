import { getTestEnv, initializeTestEnvironment } from '@/test/libs/firebaseUtil'
import {
  beforeAll,
  afterAll,
  afterEach,
  jest
} from '@jest/globals'
import * as http from 'http'
import * as fs from 'fs'

export const setupTest = (testCaseName: string) => {
  const projectId = `demo-${testCaseName}`

  beforeAll(async () => {
    jest.spyOn(console, 'warn').mockImplementation(() => {})
    jest.spyOn(console, 'info').mockImplementation(() => {})
    jest.spyOn(console, 'debug').mockImplementation(() => {})

    await initializeTestEnvironment(projectId)
  })

  afterAll(async () => {
    await getTestEnv().cleanup()

    // カバレッジ
    const firestoreEnv = getTestEnv().emulators.firestore
    if (firestoreEnv) {
      const coverageUrl = `http://${firestoreEnv.host}:${firestoreEnv.port}/emulator/v1/projects/${projectId}:ruleCoverage.html`
      const coverageDir = 'coverage/firestore_rules'
      const coveragePath = `${coverageDir}/${testCaseName}.html`

      if (!fs.existsSync(coverageDir)) {
        fs.mkdirSync(coverageDir, { recursive: true })
      }

      const stream = fs.createWriteStream(coveragePath)
      await new Promise((resolve, reject) => {
        http.get(coverageUrl, (res) => {
          res.pipe(stream, { end: true })
          res.on('end', resolve)
          res.on('error', reject)
        })
      })
    }
  })

  afterEach(async () => {
    await getTestEnv().clearFirestore()
  })
}
