//const API_URL = "http://localhost:8000/api";
//const API_URL = "http://159.65.152.98:80/api";
const API_URL = "https://https://allinonepush.live/api";

importScripts("https://www.gstatic.com/firebasejs/7.14.6/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/7.14.6/firebase-messaging.js"
);

self.addEventListener("notificationclick", function (event) {
  const clickedNotification = event.notification;
  const id = clickedNotification.data["_id"];

  fetch(`${API_URL}/user/clicked/${id}`, {
    method: "GET",
  })
    .then(() => {})
    .catch(function (err) {
      if (err) {
        console.log(err);
      }
      //
    });
});

var firebaseConfig = {
  apiKey: "AIzaSyDmW4KdeyqswFEOEkA_BxKXSqMH9MHQkLA",
  authDomain: "push-a9188.firebaseapp.com",
  projectId: "push-a9188",
  storageBucket: "push-a9188.appspot.com",
  messagingSenderId: "969903150706",
  appId: "1:969903150706:web:8f88b536999f83550894eb",
  measurementId: "G-HTQX43VPR4",
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(function (payload) {
  console.log("called");

  console.log(payload);

  const parsedPayload = payload;

  fetch(`${API_URL}/user/received/${parsedPayload.data._id}`).then(() => {
    console.log("success");
  });

  const notification = parsedPayload.data;
  const notificationOption = {
    body: notification.body,
    icon: notification.icon,
    image: notification.image,
    data: {
      url: notification.url,
      _id: parsedPayload._id,
    },
  };
  return self.registration.showNotification(
    payload.data.title,
    notificationOption
  );
});
