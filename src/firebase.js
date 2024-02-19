// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { 
  doc, 
  setDoc, 
  addDoc,
  updateDoc, 
  onSnapshot,
  query,
  where,
  collection } from "firebase/firestore"; 
import { ref, onUnmounted } from "vue";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyByQR-QTOXW-M7mngB6QwThPRXbdGQYOLQ",
  authDomain: "done-88590.firebaseapp.com",
  projectId: "done-88590",
  storageBucket: "done-88590.appspot.com",
  messagingSenderId: "1050532236423",
  appId: "1:1050532236423:web:8521e173e122b3c14bfc22",
  measurementId: "G-WXCBHC3X8L"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export async function addTask(task) {
  try {
    const docRef = await addDoc(collection(db, "users", "syafiq", "tasks"), 
      task
    );
    const id = docRef.id;
    console.log("Document written with ID: ", id);
    return id;
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

export function getTasks() {
  const q = query(collection(db, "users", "syafiq", "tasks"));
  const tasks = ref([]);
  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    const docs = []
    querySnapshot.forEach((doc) => {
        const dat = doc.data()
        dat.id = doc.id
        docs.push(dat)
      });
    tasks.value = docs
    // console.log(tasks.value)
  });

  onUnmounted(unsubscribe)
  return tasks
}

export async function toggleDone(id, done) {
  done = !done
  const taskRef = doc(db, "users", "syafiq", "tasks", id)
  await setDoc(taskRef, {
    done: done,
    dateCompleted: done ? new Date() : null
  }, {merge: true}); 
}