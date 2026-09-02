import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

let userSelectedDate;

const startButton = document.querySelector("[data-start]");
startButton.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
    onClose(selectedDates) {
        if (selectedDates[0] <= new Date()) {
            iziToast.error({
  title: "Error",
  message: "Please choose a date in the future",
});
            startButton.disabled = true;
        }
        else {
            startButton.disabled = false;
        }

        userSelectedDate = selectedDates[0];

  },
};

const days = document.querySelector("[data-days]");
const hours = document.querySelector("[data-hours]");
const minutes = document.querySelector("[data-minutes]");
const seconds = document.querySelector("[data-seconds]");


const datePicker = document.querySelector("#datetime-picker");
startButton.addEventListener("click", () => {
    startButton.disabled = true;
    datePicker.disabled = true;
    const timerId = setInterval(() => {
        const remainingTime = userSelectedDate - new Date();
        
         if (remainingTime <= 0) {
            clearInterval(timerId);

            days.textContent = "00";
            hours.textContent = "00";
            minutes.textContent = "00";
            seconds.textContent = "00";

            datePicker.disabled = false;
            return;
        }
        const time = convertMs(remainingTime);

        days.textContent = addLeadingZero(time.days);
        hours.textContent = addLeadingZero(time.hours);
        minutes.textContent = addLeadingZero(time.minutes);
        seconds.textContent = addLeadingZero(time.seconds);

       
    }, 1000);
});

flatpickr("#datetime-picker", options);

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, "0");
};