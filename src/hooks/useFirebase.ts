import firebase from 'firebase/compat/app'
import 'firebase/auth'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'

import { getFirestore, doc, setDoc } from 'firebase/firestore'

export const useFirebase = () => {
  const firebaseConfig = {
    apiKey: 'AIzaSyBgi1qg1LCeGVZISJ-7V48b9iad6S6OBGU',
    authDomain: 'app-masters---game-catalog.firebaseapp.com',
    projectId: 'app-masters---game-catalog',
    storageBucket: 'app-masters---game-catalog.appspot.com',
    messagingSenderId: '639166332874',
    appId: '1:639166332874:web:e25c92df8940e75f76d933',
  }

  const app = firebase.initializeApp(firebaseConfig)
  const auth = getAuth(app)
  const db = getFirestore(app)

  const createUser = async (email: string, password: string) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password)

    const userID = auth.currentUser!.uid

    console.log(userID)

    await setDoc(doc(db, 'users', userID), {
      games: [],
    })

    return userCredential
  }

  const login = async (email: string, password: string) => {
    const userCredential = await signInWithEmailAndPassword(auth, email, password)
    console.log(auth.currentUser)
    return userCredential
  }

  const getUserId = () => {
    return auth.currentUser!.uid || null
  }

  return {
    createUser,
    login,
    app,
    getUserId,
  }
}
