// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-auth.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDCXh3ypDLJeskFZQ5PH4RLG_Mnin3a1fg",
  authDomain: "login-8a142.firebaseapp.com",
  projectId: "login-8a142",
  storageBucket: "login-8a142.appspot.com",
  messagingSenderId: "714021566883",
  appId: "1:714021566883:web:290d310ade393ad09d8216"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Referencias a los elementos del DOM
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const loginButton = document.getElementById('loginButton');
const signupButton = document.getElementById('signupButton');
const googleSignupButton = document.getElementById('googleSignupButton');
const messageElement = document.getElementById('message');

// Función de inicio de sesión
loginButton.addEventListener('click', () => {
  const email = emailInput.value;
  const password = passwordInput.value;

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      messageElement.textContent = '¡Inicio de sesión exitoso!';
      messageElement.style.color = 'green';
      window.location.href = 'holamundo.html';
    })
    .catch((error) => {
      messageElement.textContent = `Error: ${error.message}`;
      messageElement.style.color = 'red';
    });
});

// Función de registro
signupButton.addEventListener('click', () => {
  const email = emailInput.value;
  const password = passwordInput.value;

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      messageElement.textContent = '¡Registro exitoso!';
      messageElement.style.color = 'green';
    })
    .catch((error) => {
      messageElement.textContent = `Error: ${error.message}`;
      messageElement.style.color = 'red';
    });
});

// Función para registrarse con Google
googleSignupButton.addEventListener('click', () => {
  const provider = new GoogleAuthProvider();

  signInWithPopup(auth, provider)
    .then((result) => {
      messageElement.textContent = '¡Registro con Google exitoso!';
      messageElement.style.color = 'green';
      window.location.href = 'holamundo.html';

    })
    .catch((error) => {
      messageElement.textContent = `Error: ${error.message}`;
      messageElement.style.color = 'red';
    });
});
