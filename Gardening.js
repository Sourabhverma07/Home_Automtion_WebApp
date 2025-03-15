import  { db, ref, get,update } from "./db.js"; 
if ('WebSocket' in window) {
    (function () {
        function refreshCSS() {
            var sheets = [].slice.call(document.getElementsByTagName("link"));
            var head = document.getElementsByTagName("head")[0];
            for (var i = 0; i < sheets.length; ++i) {
                var elem = sheets[i];
                var parent = elem.parentElement || head;
                parent.removeChild(elem);
                var rel = elem.rel;
                if (elem.href && typeof rel != "string" || rel.length == 0 || rel.toLowerCase() == "stylesheet") {
                    var url = elem.href.replace(/(&|\?)_cacheOverride=\d+/, '');
                    elem.href = url + (url.indexOf('?') >= 0 ? '&' : '?') + '_cacheOverride=' + (new Date().valueOf());
                }
                parent.appendChild(elem);
            }
        }
        var protocol = window.location.protocol === 'http:' ? 'ws://' : 'wss://';
        var address = protocol + window.location.host + window.location.pathname + '/ws';
        var socket = new WebSocket(address);
        socket.onmessage = function (msg) {
            if (msg.data == 'reload') window.location.reload();
            else if (msg.data == 'refreshcss') refreshCSS();
        };
        if (sessionStorage && !sessionStorage.getItem('IsThisFirstTime_Log_From_LiveServer')) {
            console.log('Live reload enabled.');
            sessionStorage.setItem('IsThisFirstTime_Log_From_LiveServer', true);
        }
    })();
}
else {
    console.error('Upgrade your browser. This Browser is NOT supported WebSocket for Live-Reloading.');
}

window.onload=function()
{

// MOtor Status
get(ref(db, 'Gardening/Motor_status')).then((snapshot) => {
const data = snapshot.val();
if(data)
{
 var img=document.getElementById('M_S');
 img.src="/images/motor_on.gif";
 document.getElementById('Motorstatus').textContent="On";
}
else{
var img=document.getElementById('M_S');
 img.src="/images/motor_off.png";
 document.getElementById('Motorstatus').textContent="Off";
}
}).catch((error) => {
// Handle potential errors during data fetching
console.error("Error fetching data:", error);
});
get(ref(db, 'Gardening/Duration')).then((snapshot) => {
const data = snapshot.val();
document.getElementById('Duration').textContent =data+" minutes";
});

get(ref(db, 'Gardening/run_time')).then((snapshot) => {
const data = snapshot.val();
document.getElementById('runtime').textContent =data;
});

const refreshInterval = setInterval(() => {
location.reload(); // Reload the entire page
}, 100000); 

}
//Room Light on status update Function
function Motor_status_on()
{
update(ref(db,'Gardening/'),{
Motor_status:true}).then(()=>{
  //document.querySelector('#RB_S').textContent="on";
  var img=document.getElementById('M_S');
 img.src="/images/motor_on.gif";
 document.getElementById('Motorstatus').textContent="On";
  alert("Motor status updated succefully");
})
.catch((error)=>
{
  alert("unsuccessfull");
  console.log(error);
})
}
function Motor_status_off()
{
update(ref(db,'Gardening/'),{
Motor_status:false}).then(()=>{
  //document.querySelector('#RB_S').textContent="on";
  var img=document.getElementById('M_S');
 img.src="/images/motor_off.png";
 document.getElementById('Motorstatus').textContent="Off";
  alert("Motor status updated succefully");
})
.catch((error)=>
{
  alert("unsuccessfull");
  console.log(error);
})
}

function Runtime_and_duration_update() {
// Retrieve values
var newt = document.getElementById('uruntime').value.trim();
var nDuration;

// Time format validation (using regular expression)
const timeRegex = /^([0-1][0-9]|2[0-3]):([0-5][0-9])$/;
if (!timeRegex.test(newt)) {
alert("Error: Invalid runtime format. Please use HH:MM (24-hour format).");
return; // Exit the function if format is invalid
}

try {
nDuration = parseInt(document.getElementById('uduration').value.trim());
if (isNaN(nDuration)) {
  throw new Error("Invalid duration value. Please enter a number.");
}
} catch (error) {
alert("Error: " + error.message);
console.error(error);
return; // Exit the function if error occurs during conversion
}

// Update runtime and duration in Firestore with error handling
update(ref(db, 'Gardening/'), {
run_time: newt,
})
.then(() => {
document.getElementById('runtime').textContent = newt;
return update(ref(db, 'Gardening/'), {
  Duration: nDuration, // Field name might require adjustment based on your schema
});
})
.then(() => {
document.getElementById('Duration').textContent = nDuration+" minutes";
alert("Runtime and Duration updated successfully!");
})
.catch((error) => {
alert("Unsuccessful update: " + error.message);
console.error(error);
});
document.getElementById('uruntime').value='';
document.getElementById('uduration').value='';

}


document.getElementById("On_status").addEventListener("click", Motor_status_on);
document.getElementById("Off_status").addEventListener("click", Motor_status_off);
document.getElementById("update_status").addEventListener("click", Runtime_and_duration_update);