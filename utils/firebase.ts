import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBBKfgEYr7BIzsoQAs7gybOIrrVIgtnJ58",
    authDomain: "webdesingpoll.firebaseapp.com",
    projectId: "webdesingpoll",
    storageBucket: "webdesingpoll.appspot.com",
    messagingSenderId: "407942215522",
    appId: "1:407942215522:web:9303178071ba9b61c21e3b"
};

const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

export default app;
export { firestore };