
// Fetching elements
let audiofI = document.getElementById('audioF')
let semiCircles = document.querySelectorAll('.semicircle')
const timer = document.querySelector('.timer')
const startBtn = document.getElementById('start')
const stopBtn = document.getElementById('stop')
const hoursInput = document.getElementById('hoursInput')
const minutesInput = document.getElementById('minutesInput')
let secondsInput = document.getElementById('secondsInput')
let submenuItems = document.getElementById('submenuItem')
let subdropDownBtn = document.getElementById('subdropdownBtn')
let setCustomWorkTimeBtn = document.getElementById('SetCustomTime')
let coustomSec = document.getElementById('secInputs')
let coustomMin = document.getElementById('minInputs')
let navContainer = document.getElementById('navcontainer')
let dropDownMenubtn = document.getElementById('dropDownbtn')
let custom_button =document.querySelector(".custom-button");
    custom_button.addEventListener('click', function () {
        Swal.fire({
                    title: 'Slow Snail',
                    text: 'A pomodoro app ^_^ for Deep focus',
                    icon: 'info',
                    confirmButtonText: 'OK'});});



let timeLoop;
let futureTime;
let setTime = 0; // Initialize setTime

startBtn.disabled = false;
timer.innerHTML = `
        <div>00</div><div class="colon">:</div>
        <div>00</div><div class="colon">:</div>
        <div>00</div>
    `;
    

function getValue() {
    let hours = parseInt(hoursInput.value) || 0;
    let minutes = parseInt(minutesInput.value) || 0;
    let seconds = parseInt(secondsInput.value) ||  0;

    setTime = (hours * 3600 + minutes * 60 + seconds) * 1000; // Convert total time to milliseconds
    futureTime = Date.now() + setTime; // Calculate future time
    
}

function countDownTimer() {
    let currentTime = Date.now();
    let remainingTime = futureTime - currentTime;
    let angle = (remainingTime / setTime) * 360;

    // Progress Indicator
    if(angle > 180) {
        semiCircles[0].style.visibility = `visible`
        semiCircles[1].style.visibility = `visible`
        semiCircles[2].style.display = 'none'
        semiCircles[0].style.transform = `rotate(180deg)`
        semiCircles[1].style.transform = `rotate(${angle}deg)`
    }
    else {
        semiCircles[2].style.display = 'block';
        semiCircles[0].style.transform = `rotate(${angle}deg)`
        semiCircles[1].style.transform = `rotate(${angle}deg)`
    }


    // Timer Display
    const hrs = Math.floor(remainingTime / (1000 * 60 * 60)).toLocaleString('en-us', { minimumIntegerDigits: 2, useGrouping: false });
    const mins = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60)).toLocaleString('en-us', { minimumIntegerDigits: 2, useGrouping: false });
    const secs = Math.floor((remainingTime % (1000 * 60)) / 1000).toLocaleString('en-us', { minimumIntegerDigits: 2, useGrouping: false });

    timer.innerHTML = `
        <div>${hrs}</div>
        <div class="colon">:</div>
        <div>${mins}</div>
        <div class="colon">:</div>
        <div>${secs}</div>
    `;
    
    // 5 - sec rule (remind USER that the timer is about to end in 5 Min)
    if (remainingTime <= 6000){
        semiCircles[0].style.backgroundColor = "#FD8A8A";
        semiCircles[1].style.backgroundColor = "#FD8A8A";
        timer.style.color = "#FD8A8A";
    }
    if (remainingTime < 3600000 ){
        timer.innerHTML = `
        <div>${mins}</div>
        <div class="colon">:</div>
        <div>${secs}</div>
    `
    }
    // End Timer
    if (remainingTime < 0) {
        clearInterval(timeLoop)
        semiCircles[0].style.visibility = `hidden`
        semiCircles[1].style.visibility = `hidden`
        semiCircles[2].style.visibility = `visible`
        semiCircles[0].style.backgroundColor = "#fec868";//So the design bug is the i have made the opacity less but when the smicircle is overlaping the other one it is create a dark effect
        semiCircles[1].style.backgroundColor = "#fec868";
        timer.innerHTML = `
            <div>00</div><div class="colon">:</div>
            <div>00</div><div class="colon">:</div>
            <div>00</div>
        `;
        startBtn.disabled = false;
        timer.style.color = "darkgrey"; //to show USER that the timer is stopped
        audiofI.onended = function () { alert("WELL DONE!!, You've completed your session!");};
        audiofI.play();
    }

    
}

startBtn.onclick =  function(){
    startBtn.disabled = true; /*turns the button Off as soon as we click it 
    (but when it is ideal it displays the ending text)
    */
    getValue(); // Fetch value from input
    countDownTimer(); // Initialize timer display
    timeLoop = setInterval(countDownTimer); // Start countdown
    timer.style.color = "#0c0c0c";//number's color
}; 


stopBtn.addEventListener("click", function stop() {
        stopBtn.ariaDisabled = true;
        clearInterval(timeLoop);
    //localStorage.clear();
    //semiCircles.forEach(sc => sc.style.display = 'none');
    semiCircles[0].style.visibility = `hidden`
    semiCircles[1].style.visibility = `hidden`
    semiCircles[2].style.visibility = `visible`
    semiCircles[0].style.backgroundColor = "#fec868";
    semiCircles[1].style.backgroundColor = "#fec868";
    timer.style.color = "darkgrey";
    timer.innerHTML = `
        <div>00</div><div class="colon">:</div>
        <div>00</div><div class="colon">:</div>
        <div>00</div>
    `;
    hoursInput.value = ""
    minutesInput.value = ""
    secondsInput.value = ""  
    startBtn.disabled = false;
    
}, );

dropDownMenubtn.addEventListener('click', function () {
    navContainer.style.display = navContainer.style.display === 'none' ? 'block': 'none' 
    
})



subdropDownBtn.addEventListener('click', function() {
    submenuItems.classList.toggle('subMenuItem'); // or whatever your active class is
});
window.onclick = function(event) {
    if (!event.target.matches('subMenu')) {
      let dropdowns = document.getElementsByClassName("subMenuItem");
      let i;
      for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
          openDropdown.classList.remove('show');
        }
      }
    }
  }
  
  
setCustomWorkTimeBtn.onclick = function() {
    let customSec = parseInt(coustomSec.value);
    secondsInput.value = customSec
    let userMin = parseInt(coustomMin.value);
    minutesInput.value = userMin
    getValue(); // Fetches value from seconds-input
    countDownTimer(); // Initialize timer display
    timeLoop = setInterval(countDownTimer); // Start countdown
    navContainer.style.display = navContainer.style.display === 'none' ? 'block': 'none' 
    timer.style.color = "#0c0c0c";//number's color

}
