importScripts("https://www.gstatic.com/firebasejs/7.14.6/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/7.14.6/firebase-messaging.js"
);
var firebaseConfig = {
  apiKey: "AIzaSyBd4kBVT7JRjIT1b-CehXoFPW0TWoqGpOk",
  authDomain: "push-825ed.firebaseapp.com",
  projectId: "push-825ed",
  storageBucket: "push-825ed.appspot.com",
  messagingSenderId: "257360173859",
  appId: "1:257360173859:web:4cd37098f6f984222f8a96",
  measurementId: "G-BQPTJBJ6J9",
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();
