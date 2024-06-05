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
              alert('Connection successful! Your settings have been saved.');
            });
          } else {
            alert('Connection failed. Please check your API key and IP address.');
          }
        }).catch(error => {
          alert('Error: ' + error);
        });
    });
  });
  