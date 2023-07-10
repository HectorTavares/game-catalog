import firebase from 'firebase/compat/app'
import 'firebase/auth'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import { firebaseGame } from '../types'
import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore'

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

    const userID = getUserId()

    await setDoc(doc(db, 'users', userID!), {
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
    try {
      const user = auth.currentUser!

      const userID = user.uid

      return userID
    } catch (error) {
      console.error(error)
      return null
    }
  }

  const getUserInfo = async () => {
    const userID = getUserId()

    const docRef = doc(db, 'users', userID!)

    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
      return docSnap.data()
    }
    return null
  }

  const updateUserInfo = async (games: firebaseGame[]) => {
    const userID = getUserId()

    console.log(userID)

    await setDoc(doc(db, 'users', userID!), {
      games: games,
    })
  }

  const logout = async () => {
    await auth.signOut()
  }

  return {
    createUser,
    login,
    app,
    getUserId,
    getUserInfo,
    updateUserInfo,
    logout,
  }
}
