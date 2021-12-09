import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';
import 'firebase/functions';
import { firebaseConfig } from './config'; //上記でexportした設定値

//firebaseの初期化
firebase.initializeApp(firebaseConfig); //プロジェクトの設定値で初期化
//export
export const db = firebase.firestore();
export const auth = firebase.auth();
export const storage = firebase.storage();
export const functions = firebase.functions();
export const FirebaseTimestamp = firebase.firestore.Timestamp;
