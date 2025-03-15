import { initializeApp } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js";
import { getDatabase, ref as dbRef, get, update } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-database.js";
import { getStorage, ref as storageRef, listAll, getDownloadURL, uploadBytes } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-storage.js";

const firebaseConfig = {
    apiKey: "AIzaSyDJVQPBMvE8-g3veC-NahGEWDsQOAtd6Yc",
    authDomain: "dht11-training.firebaseapp.com",
    databaseURL: "https://dht11-training-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "dht11-training",
    storageBucket: "dht11-training.appspot.com",
    messagingSenderId: "325497977243",
    appId: "1:325497977243:web:0b46bf7207a7f5f855c93e"
};

// Initialize Firebase App
const app = initializeApp(firebaseConfig);

// Initialize Firebase Services
const db = getDatabase(app);
const storage = getStorage(app);

// Export Required Modules with Aliases
export { app, db, storage, dbRef, storageRef, get, update, listAll, getDownloadURL, uploadBytes };
