//API_URL
//const API_URL = "http://localhost:8000/api";
//const API_URL = "http://159.65.152.98:80/api";
const API_URL = "https://trickysquare.com/api";

console.log("intigrated");

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
  apiKey: "AIzaSyBd4kBVT7JRjIT1b-CehXoFPW0TWoqGpOk",
  authDomain: "push-825ed.firebaseapp.com",
  projectId: "push-825ed",
  storageBucket: "push-825ed.appspot.com",
  messagingSenderId: "257360173859",
  appId: "1:257360173859:web:4cd37098f6f984222f8a96",
  measurementId: "G-BQPTJBJ6J9",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

// Retrieve Firebase Messaging object.
const messaging = firebase.messaging();

//on route
messaging.onMessage(function (payload) {
  console.log("on intigrated");
  console.log("on intigrated", payload);

  const parsedPayload = payload;

  fetch(`${API_URL}/user/received/${parsedPayload.data._id}`).then(() => {
    console.log("success");
  });

  const notification = payload.data;
  const notificationOption = {
    body: notification.body,
    icon: notification.icon,
    image: notification.image,
    data: {
      url: notification.url,
      _id: parsedPayload.data._id,
    },
  };
  return self.registration.showNotification(
    payload.notification.title,
    notificationOption
  );
});

const publicVapidKey =
  "BJMzzvE1qmSSGnnA81S4KlEr_yIrO3Y06afAVvxtV0qm8LXKlRJG1gpwBNbw2fhv2dF3Qi1YrVJOT-u-Odb1DYI";
// Add the public key generated from the console here.
//header

let theHeader = new Headers();
theHeader.append("Content-Type", "application/json");
messaging.getToken({ vapidKey: publicVapidKey }).then((token) => {
  console.log(token);
  if (!localStorage.getItem("isTokenSentToTheServer")) {
    const body = {
      sitename: location.hostname,
      country: "India",
      token: token,
    };

    fetch(`${API_URL}/user/subscribe`, {
      method: "POST",
      headers: theHeader,
      body: JSON.stringify(body),
    }).then((r) => {
      console.log("req sent");
      localStorage.setItem("isSent", true);
      r.json((d) => {
        console.log(d);
      });
    });
  }
});
