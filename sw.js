// Service Worker — Kadosh EV Push Notifications
// Arquivo: sw.js (deve ficar na raiz do repositório GitHub)

importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey:            "AIzaSyDpKNDpFJW8LzJBWEoarjGsuIzLq1WTKNM",
  authDomain:        "kadosh-ev.firebaseapp.com",
  projectId:         "kadosh-ev",
  storageBucket:     "kadosh-ev.appspot.com",
  messagingSenderId: "761018197901",
  appId:             "1:761018197901:web:406e9d3e8ca17500087fc4"
});

const messaging = firebase.messaging();

// Receber push em background (app fechado ou em segundo plano)
messaging.onBackgroundMessage(function(payload) {
  console.log('[SW] Push recebido em background:', payload);
  const notif = payload.notification || {};
  const titulo = notif.title || '⚡ Kadosh EV';
  const opcoes = {
    body:  notif.body  || 'Uma vaga foi liberada!',
    icon:  notif.icon  || '/Logo_kadosh512.png',
    badge: notif.badge || '/Logo_kadosh512.png',
    data:  payload.data || {},
    vibrate: [200, 100, 200],
  };
  return self.registration.showNotification(titulo, opcoes);
});

// Clique na notificação — abre o app
self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  const url = event.notification.data && event.notification.data.link
    ? event.notification.data.link
    : 'https://kadoshcarregamento.github.io/kadosh/';
  event.waitUntil(clients.openWindow(url));
});

