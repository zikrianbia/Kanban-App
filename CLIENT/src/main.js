import Vue from 'vue'
import App from './App.vue'
import firebase from 'firebase'

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBz7VSpYk0sUyJkqnOVwbd5MNrqlWHyka0",
    authDomain: "kanban-cc4dc.firebaseapp.com",
    projectId: "kanban-cc4dc",
    storageBucket: "kanban-cc4dc.appspot.com",
    messagingSenderId: "99122319652",
    appId: "1:99122319652:web:8151a6303185f1b05323b1",
    measurementId: "G-9RYP6ZHRB2"
  };

  firebase.initializeApp(firebaseConfig)

new Vue ({ 
    render: h => h(App)
}).$mount('#app')