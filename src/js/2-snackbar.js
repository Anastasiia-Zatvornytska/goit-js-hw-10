import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";


const form = document.querySelector(".form");

form.addEventListener("submit", (event) => {
    event.preventDefault();
    
    const delay = Number(document.querySelector("[name='delay']").value);
    const state = document.querySelector("input[name='state']:checked").value;

    const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
            if (state === "fulfilled") {
                resolve(delay);
            }
            else {
                reject(delay);

            }

        }, delay);
    });

    promise
        .then((delay) => {
        iziToast.success({
    title: 'OK',
    message: `✅ Fulfilled promise in ${delay}ms`
});
        })
        .catch((delay) => {
        iziToast.error({
    title: 'Error',
    message: `❌ Rejected promise in ${delay}ms`
});
    })
});