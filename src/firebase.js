import * as firebase from 'firebase'
import settings from './settings.json'

const { apiKey, authDomain, databaseURL, projectId, storageBucket, messagingSenderId, appId } = settings.firebaseConfig

const firebaseConfig = {
  apiKey,
  authDomain,
  databaseURL,
  projectId,
  storageBucket,
  messagingSenderId,
  appId
}

firebase.initializeApp(firebaseConfig)
const databaseRef = firebase.database().ref()
export const todosRef = databaseRef.child('todo')
