const fileInput = document.getElementById('file-input');
fileInput.addEventListener('change', (e) => console.log(e.target.files));
navigator.serviceWorker.register('/service-worker.js', { scope: '/' })
        .then(function (registration)
        {
          console.log('Service worker registered successfully');
        }).catch(function (e)
        {
          console.error('Error during service worker registration:', e);
        });
