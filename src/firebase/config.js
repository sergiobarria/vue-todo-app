import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyD6xUVWZ-i9TYTyWcUi9ayfAO-2QkJrhGg',
  authDomain: 'vue-todo-app-6a1e3.firebaseapp.com',
  projectId: 'vue-todo-app-6a1e3',
  storageBucket: 'vue-todo-app-6a1e3.appspot.com',
  messagingSenderId: '1035804004939',
  appId: '1:1035804004939:web:fd555e41b7f5175dfa73ce',
};

// init firebase
firebase.initializeApp(firebaseConfig);

const projectAuth = firebase.auth();
const db = firebase.firestore();
const timestamp = firebase.firestore.FieldValue.serverTimestamp;

export { projectAuth, db, timestamp };
