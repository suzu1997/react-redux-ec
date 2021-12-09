import { initializeApp } from 'firebase/app';
import { getFirestore, Timestamp } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { getFunctions } from 'firebase/functions';
import { firebaseConfig } from './config'; //上記でexportした設定値

//firebaseの初期化
const firebaseApp = initializeApp(firebaseConfig); //プロジェクトの設定値で初期化
//export
export const db = getFirestore(firebaseApp);
export const auth = getAuth(firebaseApp);
export const storage = getStorage();
export const functions = getFunctions();
export const FirebaseTimestamp = Timestamp;
