import iziToast from 'izitoast';

document.addEventListener('DOMContentLoaded', function () {
  const form = document.querySelector('.form');

  form.addEventListener('submit', function (event) {
    event.preventDefault();

    const delayInput = document.querySelector("input[name='delay']");
    const delay = parseInt(delayInput.value);

    const stateInput = document.querySelector("input[name='state']:checked");
    const state = stateInput ? stateInput.value : null;

    if (!delay || !state) {
      alert('Please fill in all fields.');
      return;
    }

    form.reset();

    const delayPromise = new Promise((resolve, reject) => {
      setTimeout(() => {
        if (state === 'fulfilled') {
          resolve(delay);
        } else {
          reject(delay);
        }
      }, delay);
    });

    delayPromise.then(
      delay => {
        iziToast.success({
          title: 'Promise Fulfilled',
          message: `✅ Fulfilled promise in ${delay}ms`,
          position: 'topRight',
        });
      },
      delay => {
        iziToast.error({
          title: 'Promise Rejected',
          message: `❌ Rejected promise in ${delay}ms`,
          position: 'topRight',
        });
      }
    );
  });
});
