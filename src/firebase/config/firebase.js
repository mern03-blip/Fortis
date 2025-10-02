// import { initializeApp } from "firebase/app";
// import { getAuth } from "firebase/auth";
// import { getFirestore } from "firebase/firestore";
// import { getStorage } from "firebase/storage";

// const firebaseConfig = {
//   "type": "service_account",
//   "project_id": "fortis-power-a014a",
//   "private_key_id": "27ac6fe43c4b00cc0a316ff05a13cd749f1ca026",
//   "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCtUZHYncxp5cl3\nFn68ENPM+iYVkolfFbOnNLgbq8S2FQhyNtFD071Iku6NbqMfQfwGrYY89YcYwg+d\nwex0yLDqP9NiW6bpdZ5wQdHhaXSkC1SNJGrMd25FZIx4OrDO17jNPtppeBa1/ZqG\nzZcezcnAYiWXHJCSOe3zW2tf/Y9G21qh7eNlfLXcC6flSi2rDmea9xVEKC/HHOvY\nwhfplXdRaDRYNtHoOEp9F2e4VPLup82rOqhWgEHUtdDp/YgzoQKaHET8jqd2SdeL\nzx+x7OdB5nZwg7kCWpGCdFPti5kM6r4sShI0OVsX7oQxgoJo1tjHJG81qwSTzwAl\nsj2huN0pAgMBAAECgf9wg/YsZ3faX4Qu69qKYkbm+QM0ZGLGanQdGhrELeJsnYKb\nn5sYs0ozfBDjeIQsb53MKKc7+WnzFDGGlpaM/LkeOtZMnAphvwyBEVGlLvuBaEAC\ncfV5dZRBKdqx7lb/g6Wf1kC27HPtQRBuFsjMFiwYfQHZLhNeL8yrSUJ+hD3WcNAz\nl2j0jCmtEyOKNkE56plMtpV29KgOJJC8ZPAJn2a/VRLi9ho+KudxTobt2SEdXH/U\nB0///Q5fgfhUE0fGCKj2dQDsxBg2FO0dp0EPjqGqRVfKkZKbCTbMo03fEqei5RZW\nOyRwe5hI9wibFd4YF4yLuwJtp1wolUm+nsvwE38CgYEA5RKArvCkcStxdxA9UAUE\nnuDnapFsanEN7VVeaCo7wZk0TwernFDB6k6QJmOkpANB9kr4csn6IwacqR0vyhzU\n1blyRC7KOrKJp0Wtln0AHojZ9Q/mhCFWrMXYD18pzVudqQz/rKOGwap680zfFsci\nIbm8fxgYsIzJqcMYaEjbUr8CgYEAwbFENpUC/bQwpFE1WuTmKa8dws2bzRp1GXtj\n5t1Dl3i9Hu0lU0NaR2WVz+9RoQRgYyfJXuun6XGuHXxJAqSAHHkIPmfSHVD8/GM5\nZXqn2+w0x2ZGbQ9l30KaxfbS7ogwX+zhxpfBQyTuS3zetEwH7np5vdwpjKSYqLN6\nbamNEhcCgYEAgND02GuurY1WkzPoprULsiSbPkxlAT5uLIaTPlRxoh77UW3ozVCE\nm7RuT4g9L5Y9Y7kpGbQHG+c99cPZ+fhYn49XeIwvYO7BhfUi9rt4c7NVjf/RC4CL\n80CWjZ5gLYFVmZkbtgOHZiTuWx9hXLfCs+B05auxRqcFSJfTg+FkpJUCgYEAqqYP\nPzeR5ww2Ps79fxNkZR1Pzy1vMwk4WjcIEYKn5nANz42H8Q/KHlU15HkpJf/BHBsV\no3dj/JyXlorFmHpuFKfdx32Y9RNBkOuqyemCspQs+/Dz42pJiqYXzopj1JxQYnNF\nh750G0ASYpelbpv98PIfCFNMmAj8JsXZ+3wCOgkCgYB5MhQJFvBLagjUfrU79LAz\ndFKXYPNzRx6pQsYqYCm4ruY0t9svGvMhxxu0QPcldIftFmK0+4K22sLT592B0O/5\nZiirkvAJJqDnF+eQtE9BVs1p7SoegvzW8KN5zrzwvT1Rllix3YxTR8+qDGSv6S21\nKG74E+btwRFN8skcamz1lA==\n-----END PRIVATE KEY-----\n",
//   "client_email": "firebase-adminsdk-fbsvc@fortis-power-a014a.iam.gserviceaccount.com",
//   "client_id": "113573982321112798422",
//   "auth_uri": "https://accounts.google.com/o/oauth2/auth",
//   "token_uri": "https://oauth2.googleapis.com/token",
//   "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
//   "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-fbsvc%40fortis-power-a014a.iam.gserviceaccount.com",
//   "universe_domain": "googleapis.com"
// }


// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// // Initialize Firestore and Firebase Authentication
// const db = getFirestore(app);
// const auth = getAuth(app); // Initialize Firebase Authentication
// const storage = getStorage(app);

// // Export auth and db to use in other parts of the app
// export { auth, db, storage };


// src/firebase/config/firebase.js

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDnjWIjB238RCNeLtaW9xLw-f0eE-qcQik",
  authDomain: "fortis-power-a014a.firebaseapp.com",
  projectId: "fortis-power-a014a",
  storageBucket: "fortis-power-a014a.appspot.com",
  messagingSenderId: "758637981170",
  appId: "1:758637981170:android:4b4b8376298cca26354f6b",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

// Export to use in other files
export { auth, db, storage };
