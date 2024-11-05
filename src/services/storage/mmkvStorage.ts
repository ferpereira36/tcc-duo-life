import { MMKV } from 'react-native-mmkv'
import { StorageService } from './storageService'

export const storage = new MMKV({ id: 'duolife@storage' })

export const mmkvStorage: StorageService = {
  getItem: (key) => {
    const item = storage.getString(key)
    if (item) {
      return JSON.parse(item)
    }
    return null
  },
  setItem: (key, value) => {
    storage.set(key, JSON.stringify(value))
  },
  removeItem: (key) => {
    storage.delete(key)
  },
}
