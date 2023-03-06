import {initializeApp} from 'firebase/app'
import {getAuth, GoogleAuthProvider } from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'
import {getStorage} from 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyCPnuhO2MRF_7cMVZyGANNGNzyad_f0RUI",
    authDomain: "project-iti-d4ddb.firebaseapp.com",
    projectId: "project-iti-d4ddb",
    storageBucket: "project-iti-d4ddb.appspot.com",
    messagingSenderId: "815491134052",
    appId: "1:815491134052:web:632231f4329d3a1d0ce571",
    measurementId: "G-BLX15KPQCE"
};

const app = initializeApp(firebaseConfig);

const storage = getStorage(app);

const auth = getAuth(app);

const db = getFirestore(app);

const provider = new GoogleAuthProvider();

export { auth, db, provider , storage};
