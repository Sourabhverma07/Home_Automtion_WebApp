import { db, ref, get, update } from "./db.js";

document.addEventListener("DOMContentLoaded", function () {
    function updateComponents() {
        fetchRoomStatus();
        fetchKitchenStatus();
    }
    setInterval(updateComponents, 25000);
    updateComponents();

    // Room Button Event Listeners
    document.getElementById("RB1_on").addEventListener("click", Room_B_On);
    document.getElementById("RB1_off").addEventListener("click", Room_B_Off);
    document.getElementById("RF1_on").addEventListener("click", Room_F_On);
    document.getElementById("RF1_off").addEventListener("click", Room_F_Off);

    // Kitchen Button Event Listeners
    document.getElementById("KB1_on").addEventListener("click", Kitchen_B_On);
    document.getElementById("KB1_off").addEventListener("click", Kitchen_B_Off);
    document.getElementById("KF1_on").addEventListener("click", Kitchen_F_On);
    document.getElementById("KF1_off").addEventListener("click", Kitchen_F_Off);
    document.getElementById("KR_on").addEventListener("click", Kitchen_R_On);
    document.getElementById("KR_off").addEventListener("click", Kitchen_R_Off);
});

function updateImage(elementId, condition, onSrc, offSrc) {
    document.getElementById(elementId).src = condition ? onSrc : offSrc;
}

// Fetch and update room status
function fetchRoomStatus() {
    Promise.all([
        get(ref(db, 'Home_Appliances/R1L1')),
        get(ref(db, 'Home_Appliances/R1fan1')),
        get(ref(db, 'Home_Appliances/R_Smoke'))
    ])
    .then(([lightSnapshot, fanSnapshot, smokeSnapshot]) => {
        updateImage('RB_S', lightSnapshot.val(), "/images/on_bulb.png", "/images/off_bulb.png");
        updateImage('RF_S', fanSnapshot.val(), "/images/fan_on.gif", "/images/fan_off.png");
        document.getElementById('rommsmoke').innerText = `Smoke Level in your Room: ${smokeSnapshot.val()}`;
    })
    .catch(error => console.error("Error fetching room data:", error));
}

// Fetch and update kitchen status
function fetchKitchenStatus() {
    Promise.all([
        get(ref(db, 'Home_Appliances/Kled1')),
        get(ref(db, 'Home_Appliances/Kfan1')),
        get(ref(db, 'Home_Appliances/K_Smoke')),
        get(ref(db, 'Home_Appliances/regulator_status'))
    ])
    .then(([ledSnapshot, fanSnapshot, smokeSnapshot, regulatorSnapshot]) => {
        updateImage('KB_S', ledSnapshot.val(), "/images/on_bulb.png", "/images/off_bulb.png");
        updateImage('KF_S', fanSnapshot.val(), "/images/fan_on.gif", "/images/fan_off.png");
        document.getElementById('Kitchensmoke').innerText = `Smoke Level in your Kitchen: ${smokeSnapshot.val()}`;
        document.getElementById('regulator').textContent = regulatorSnapshot.val() ? "On" : "Off";
    })
    .catch(error => console.error("Error fetching kitchen data:", error));
}

// Room Control Functions
function Room_B_On() {
    update(ref(db, 'Home_Appliances/'), { R1L1: true })
    .then(() => {
        document.getElementById('RB_S').src = "/images/on_bulb.png";
        alert("Room Light turned ON successfully");
    })
    .catch(error => console.log("Error:", error));
}

function Room_B_Off() {
    update(ref(db, 'Home_Appliances/'), { R1L1: false })
    .then(() => {
        document.getElementById('RB_S').src = "/images/off_bulb.png";
        alert("Room Light turned OFF successfully");
    })
    .catch(error => console.log("Error:", error));
}

function Room_F_On() {
    update(ref(db, 'Home_Appliances/'), { R1fan1: true })
    .then(() => {
        document.getElementById('RF_S').src = "/images/fan_on.gif";
        alert("Room Fan turned ON successfully");
    })
    .catch(error => console.log("Error:", error));
}

function Room_F_Off() {
    update(ref(db, 'Home_Appliances/'), { R1fan1: false })
    .then(() => {
        document.getElementById('RF_S').src = "/images/fan_off.png";
        alert("Room Fan turned OFF successfully");
    })
    .catch(error => console.log("Error:", error));
}

// Kitchen Control Functions
function Kitchen_B_On() {
    update(ref(db, 'Home_Appliances/'), { Kled1: true })
    .then(() => {
        document.getElementById('KB_S').src = "/images/on_bulb.png";
        alert("Kitchen Bulb turned ON successfully");
    })
    .catch(error => console.log("Error:", error));
}

function Kitchen_B_Off() {
    update(ref(db, 'Home_Appliances/'), { Kled1: false })
    .then(() => {
        document.getElementById('KB_S').src = "/images/off_bulb.png";
        alert("Kitchen Bulb turned OFF successfully");
    })
    .catch(error => console.log("Error:", error));
}

function Kitchen_F_On() {
    update(ref(db, 'Home_Appliances/'), { Kfan1: true })
    .then(() => {
        document.getElementById('KF_S').src = "/images/fan_on.gif";
        alert("Kitchen Fan turned ON successfully");
    })
    .catch(error => console.log("Error:", error));
}

function Kitchen_F_Off() {
    update(ref(db, 'Home_Appliances/'), { Kfan1: false })
    .then(() => {
        document.getElementById('KF_S').src = "/images/fan_off.png";
        alert("Kitchen Fan turned OFF successfully");
    })
    .catch(error => console.log("Error:", error));
}

function Kitchen_R_On() {
    update(ref(db, 'Home_Appliances/'), { regulator_status: true })
    .then(() => {
        document.getElementById('regulator').textContent = "On";
        alert("Kitchen Regulator turned ON successfully");
    })
    .catch(error => console.log("Error:", error));
}

function Kitchen_R_Off() {
    update(ref(db, 'Home_Appliances/'), { regulator_status: false })
    .then(() => {
        document.getElementById('regulator').textContent = "Off";
        alert("Kitchen Regulator turned OFF successfully");
    })
    .catch(error => console.log("Error:", error));
}
