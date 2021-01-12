//API_URL
//const API_URL = "http://localhost:3000/api";
const API_URL = "http://159.65.152.98:80/api";

console.log("intigrated");

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
  apiKey: "AIzaSyDmW4KdeyqswFEOEkA_BxKXSqMH9MHQkLA",
  authDomain: "push-a9188.firebaseapp.com",
  projectId: "push-a9188",
  storageBucket: "push-a9188.appspot.com",
  messagingSenderId: "969903150706",
  appId: "1:969903150706:web:8f88b536999f83550894eb",
  measurementId: "G-HTQX43VPR4",
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
  "BJ8sWnq_Zr232YSRo_qo02gKEzmt3nI0hOkVJHHxT2C59exgfTeaqpOTRHzSnoeFQSbIWvJKBKcjSRdajzx8Qs4";
// Add the public key generated from the console here.
//header

let theHeader = new Headers();
theHeader.append("Content-Type", "application/json");
messaging.getToken({ vapidKey: publicVapidKey }).then((token) => {
  console.log(token);
  if (!localStorage.getItem("isSent")) {
    //fetch("http://freegeoip.net/json/", {
    //method: 'GET',
    //headers: theHeader

    //}).then( res => {
    // res.json().then( data => {
    // console.log(data)
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

    //})
    //} )
  }
});
