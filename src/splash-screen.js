document.addEventListener('DOMContentLoaded', function() {
    let submitButton = document.getElementById('submit');
    submitButton.addEventListener('click', function() {
      let apiKey = document.getElementById('api-key').value;
      let ipAddress = document.getElementById('ip-address').value;

      fetch(`http://${ipAddress}/admin/api.php?auth=${apiKey}`)
        .then(response => {
          if (response.ok) {
            browser.storage.local.set({
              apiKey: apiKey,
              ipAddress: ipAddress
            }).then(() => {
              console.log(browser.storage.local.get(['apiKey']));
              console.log(browser.storage.local.get('ipAddress'));
              alert('Successfully connected to your Pi-Hole! Your settings have been saved.');
            });
          } else {
            alert('Connection failed. Please check that your API key is correct and your Pi-Hole is located at that IP address.');
          }
        }).catch(error => {
          alert('Error: ' + error);
        });
    });
  });
  