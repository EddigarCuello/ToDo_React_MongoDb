import { initializeApp } from "firebase/app";
import { getStorage, uploadBytes,ref , getDownloadURL} from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDhcWVpQTc-mtLpZQ0Fc68Crql9-DzikC4",
  authDomain: "pending-notes-c1115.firebaseapp.com",
  projectId: "pending-notes-c1115",
  storageBucket: "pending-notes-c1115.appspot.com",
  messagingSenderId: "160433490938",
  appId: "1:160433490938:web:1f5d8993940ce8b5bcf243"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app); // Obtiene una instancia de Firestore


export  async function SubirArchivo(file,taskid) {
  const storageRef = ref(storage, `${taskid}/doc${taskid}`);
   await uploadBytes(storageRef, file)
   const url = await getDownloadURL(storageRef)
  return url;
}

export async function bajarArchivo(taskid) {
  const storageRef = ref(storage, `${taskid}/doc${taskid}`);
  const url = await getDownloadURL(storageRef);
  return url;
}