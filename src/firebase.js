import { initializeApp } from 'firebase'

const app = initializeApp({
    apiKey: "AIzaSyDp84XXDpeG39KfyDoXOFpc2BgRk9AgkvQ",
    authDomain: "kanban-hacktiv8.firebaseapp.com",
    databaseURL: "https://kanban-hacktiv8.firebaseio.com",
    projectId: "kanban-hacktiv8",
    storageBucket: "",
    messagingSenderId: "762888527808"
});

export const db = app.database();
export const namesRef = db.ref('names');
