/* eslint-disable @typescript-eslint/no-unsafe-call */
import firebase from 'firebase/app'
import 'firebase/firestore'
import { UserDataInterface } from '../models/userdata'

export default () => {
  const getUserData = (userId: string) => {
    const db = firebase.firestore()
    const userCollection = db.collection('users')

    return new Promise<UserDataInterface>((resolve, reject) => {
      userCollection.doc(userId).get().then((doc) => {
        if (doc.exists) {
          console.log(doc.data())
          const returnData: UserDataInterface = {
            displayName: '',
            userId: userId,
            thumbnailUrl: '',
            message: '',
            created: ''
          }
          const resultData = doc.data() as UserDataInterface
          if (resultData.displayName) {
            returnData.displayName = String(resultData.displayName)
          }
          if (resultData.message) {
            returnData.message = String(resultData.message)
          }
          if (resultData.thumbnailUrl) {
            returnData.thumbnailUrl = String(resultData.thumbnailUrl)
          }
          if (resultData.created) {
            returnData.created = String(resultData.created)
          }
          resolve(returnData)
        } else {
          console.log('documentがありません。')
          reject('NODOC')
        }
      })
        .catch((err) => {
          console.log(err)
          reject(err)
        })
    })
  }
  const createNewUser = (userId: string) => {
    const today = new Date()
    const db = firebase.firestore()
    db.collection('users').doc(userId).set({
      userId: userId,
      created: today.toString(),
      displayName: 'Unknown',
      thumbnailUrl: 'https://event.samurai-incubate.asia/watson-hack/images/ibm_watson.png',
      message: 'I love Teleworks!'
    }).then(() => {
      console.log('successfully created a new user.')
    }).catch((err) => {
      console.log('failed to create a new user.')
      console.log(err)
    })
  }

  const checkAndCreateNewUser = (userId: string) => {
    getUserData(userId).then((data) => {
      console.log('the user already exist')
    }).catch((err) => {
      if (err === 'NODOC') {
        createNewUser(userId)
      }
      console.log(err)
    })
  }

  const updateUserData = (userId: string, userData: UserDataInterface) => {
    const db = firebase.firestore()
    const userCollection = db.collection('users')
    userCollection.doc(userId).update(userData).then(() => {
      console.log('successfully updated')
    }).catch((err) => {
      console.log('failed to update')
      console.log(err)
    })
  }
  return { checkAndCreateNewUser, updateUserData, getUserData }
}
