//const API_URL = "http://localhost:8000/api";
//const API_URL = "http://159.65.152.98:80/api";
const API_URL = "https://allinonepush.live/api";

importScripts("https://www.gstatic.com/firebasejs/7.14.6/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/7.14.6/firebase-messaging.js"
);


self.addEventListener('notificationclick', function (event) {
  let url = event.notification.data.url;
  event.notification.close(); // Android needs explicit close.
  const clickedNotification = event.notification;
  const id = clickedNotification.data["_id"];

  fetch(`${API_URL}/user/clicked/${id}`, {
    method: "GET",
  })
    .then(() => { })
    .catch(function (err) {
      if (err) {
        console.log(err);
      }

    });
  event.waitUntil(
    clients.matchAll({ type: 'window' }).then(windowClients => {
      // Check if there is already a window/tab open with the target URL
      for (var i = 0; i < windowClients.length; i++) {
        var client = windowClients[i];
        // If so, just focus it.
        if (client.url === url && 'focus' in client) {
          return client.focus();
        }
      }
      // If not, then open the target URL in a new window/tab.
      if (clients.openWindow) {
        return clients.openWindow(url);
      }
    })
  );
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


  const parsedPayload = payload;

  fetch(`${API_URL}/user/received/${parsedPayload.data._id}`).then(() => {
  });


  const notification = parsedPayload.data;
  const notificationOption = {
    body: notification.body,
    icon: notification.icon,
    image: notification.image,
    data: {
      _id: payload.data._id,
      url: notification.url,
    },
  };
  return self.registration.showNotification(
    payload.data.title,
    notificationOption
  );
});
