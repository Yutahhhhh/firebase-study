import Executor from '@/test/Executor'
import { FirebaseFirestore } from '@firebase/firestore-types'
import {
  assertSucceeds,
  assertFails,
} from '@firebase/rules-unit-testing'
import { getTestEnv } from '@/test/libs/firebaseUtil'
import { setupTest } from '@/test/firestore/setupTest'
import { Vegetable } from '@/models/Vegetable'

import {
  beforeEach,
  describe,
  it,
} from '@jest/globals'

setupTest('vegetable')

describe('Firestore Vegetable rules', () => {
  let db: FirebaseFirestore
  let executor: Executor

  beforeEach(async () => {
    await getTestEnv().withSecurityRulesDisabled(async context => {
      const adminDB = context.firestore()
      executor = new Executor(adminDB, Vegetable.MODEL_NAME)
      const vegetables = [
        { id: 'vege_1_id', name: 'carrot' },
        { id: 'vege_2_id', name: 'pumpkin' },
        { id: 'vege_3_id', name: 'potato' },
      ]
      for (const vege of vegetables) {
        await executor.create(vege.id, { name: vege.name })
      }
    })
  })

  describe('認証済み', () => {
    beforeEach(async () => {
      db = getTestEnv().authenticatedContext('user_01').firestore()
      executor = new Executor(db, Vegetable.MODEL_NAME)
    })

    it('取得：全てできること', async () => {
      await assertSucceeds(executor.get('vege_1_id'))
      await assertSucceeds(executor.get('vege_2_id'))
      await assertSucceeds(executor.get('vege_3_id'))
    })

    it('一覧：全てできること', async () => {
      await assertSucceeds(executor.all())
    })

    it('登録：全てできること', async () => {
      await assertSucceeds(executor.create('new_id', { name: 'new_name' }))
    })

    it('更新：全てできること', async () => {
      await assertSucceeds(executor.update('vege_1_id', { name: 'update_name' }))
      await assertSucceeds(executor.update('vege_2_id', { name: 'update_name' }))
      await assertSucceeds(executor.update('vege_3_id', { name: 'update_name' }))
    })

    it('削除：全てできること', async () => {
      await assertSucceeds(executor.delete('vege_1_id'))
      await assertSucceeds(executor.delete('vege_2_id'))
      await assertSucceeds(executor.delete('vege_3_id'))
    })
  })

  describe('未認証', () => {
    beforeEach(async () => {
      db = getTestEnv().unauthenticatedContext().firestore()
      executor = new Executor(db, Vegetable.MODEL_NAME)
    })
    it('取得：全てできること', async () => {
      await assertSucceeds(executor.get('vege_1_id'))
      await assertSucceeds(executor.get('vege_2_id'))
      await assertSucceeds(executor.get('vege_3_id'))
    })

    it('一覧：全てできること', async () => {
      await assertSucceeds(executor.all())
    })

    it('登録：全てできないこと', async () => {
      await assertFails(executor.create('new_id', { name: 'new_name' }))
    })

    it('更新：全てできないこと', async () => {
      await assertFails(executor.update('vege_1_id', { name: 'update_name' }))
      await assertFails(executor.update('vege_2_id', { name: 'update_name' }))
      await assertFails(executor.update('vege_3_id', { name: 'update_name' }))
    })

    it('削除：全てできないここと', async () => {
      await assertFails(executor.delete('vege_1_id'))
      await assertFails(executor.delete('vege_2_id'))
      await assertFails(executor.delete('vege_3_id'))
    })
  })
})
