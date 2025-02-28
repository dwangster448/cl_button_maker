// import { initializeApp } from "firebase/app";
// import { getAuth } from "firebase/auth";
// import { getFirestore, collection, addDoc } from "firebase/firestore";
// import { getDatabase, ref, push, set } from "firebase/database";

// const firebaseConfig = {
//     apiKey: "YOUR_API_KEY",
//     authDomain: "YOUR_AUTH_DOMAIN",
//     projectId: "YOUR_PROJECT_ID",
//     storageBucket: "YOUR_STORAGE_BUCKET",
//     messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
//     appId: "YOUR_APP_ID",
//     measurementId: "YOUR_MEASUREMENT_ID"
// };

// const auth = getAuth(app);
// const db = getFirestore(app);


let first_name = "Daniel"
let last_name = "Wang"

let user_email = "example@gmail.com"
let user_phone_number = "2624120000"

let startDate = "06/01/2026" // current date of reservation
let endDate = "06/04/2026" // end date that will be adjusted in reservation

let available = true;

function disclaimer(reservation_data=False) {
    // popup modal that provides user information, reservation dates, and disclaimer notes
    console.log("Disclaimer", reservation_data)
}

function submit_reservation(user_information) {
    console.log("submit function")

    let collection = "reservation_collection";

    return true; //TODO Placeholder to prevent return errors

    
    // add user information passed onto firebase

    // const db = getDatabase(); //TODO firebase push implementation
    // const dataRef = ref(db, 'your-data-path'); // Replace 'your-data-path'

    // try {
    //     // Add a new document with a generated ID
    //     const docRef = await addDoc(collection(db, {collection}), user_information);
    //     console.log("Document written with ID: ", docRef.id);
    //     return true;
    // } catch(error) {
    //   console.error("Error pushing data: ", error);
    //   return False;
    // };


}

function available_dates(start=false, end=false) {
    console.log("availla")
    // if any of the requested dates are not avaialble, return false

    if ((start || end) == false) { //Missing dates needed to confirm availability
        return false;
    }

    let overlapped_dates = true; //TODO add functionality to check overlapping dates
    if (overlapped_dates) { // if true = requested dates not available
        return false;     
    }
}

function confirmation() {
    console.log("confirmation detected")
    
    // confirmation pop-up

    if (available_dates(startDate, endDate)) { // if True = date(s) not available 
        console.log("Overlap dates detected");
        return;
    } 

    console.log("herer")
    
    let reservation_data = { //JSON to store user data to add onto firebase
        "firstName":first_name,
        "lastName":last_name,
        "email":user_email,
        "phoneNumber":user_phone_number,
        "startDate":startDate,
        "endDate":endDate,
    };

    console.log("----")
    
    if (available) {
        try {
            // submit reservation
            let submitation_result = submit_reservation(reservation_data);
            if (submitation_result) {
                // add disclaimers via disclaimer function
                disclaimer(reservation_data);
            }
            else {
                return;
            }
        }
        catch (error) {
            console.error("ERROR:", error.message);
            return;
        }
    }
    
}