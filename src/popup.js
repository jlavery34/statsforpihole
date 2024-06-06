document.addEventListener('DOMContentLoaded', function () {
    var apiKey = '';
    var ipAddress = '';
    const fetchData = async () => {
        try{
            apiKey = await browser.storage.local.get(['apiKey']); //must await, else a promise is returned 
            ipAddress = await browser.storage.local.get(['ipAddress']);
            fetch(`http://${ipAddress.ipAddress}/admin/api.php?summaryRaw&auth=${apiKey.apiKey}`)
            .then(response => response.json())
            .then(data => {
                if (data.domains_being_blocked) {
                    document.getElementById('domsblocked').textContent = `Domains on blocklist: ${data.domains_being_blocked}`;
                } else {
                    document.getElementById('domsblocked').textContent = 'The "domains_being_blocked" field is not present in the API response.';
                }
                if (data.ads_blocked_today) {
                    document.getElementById('adsblocked').textContent = `Ads blocked today: ${data.ads_blocked_today}`;
                } else {
                    document.getElementById('adsblocked').textContent = 'The "ads_blocked_today" field is not present in the API response.';
                }
                if (data.dns_queries_today) {
                    document.getElementById('dnsqueries').textContent = `Queries made today: ${data.dns_queries_today}`;
                } else {
                    document.getElementById('dnsqueries').textContent = 'The "ads_blocked_today" field is not present in the API response.';
                }
                if (data.ads_percentage_today) {
                    let percentage = parseFloat(data.ads_percentage_today.toFixed(1)); //rounds it up to 1 decimal place
                    document.getElementById('percentage').textContent = `Percentage blocked: ${percentage}%`;
                } else {
                    document.getElementById('percentage').textContent = 'The "ads_blocked_today" field is not present in the API response.';
                }
            })
            .catch(error => {
                document.getElementById('adsblocked').textContent = 'Error fetching data';
                console.error('Error fetching data:', error);
            });
        }
        catch{
            document.getElementById('adsblocked').textContent = 'Error linking to PiHole. Are you sure you are logged in?';
        }
        
    };

    fetchData();

    document.getElementById('settings-link').addEventListener('click', function() {
        browser.runtime.openOptionsPage();
    });
    //30s
    document.getElementById('pausehole').addEventListener('click', function() {
        if(apiKey.apiKey && ipAddress.ipAddress){
            fetch(`http://${ipAddress.ipAddress}/admin/api.php?disable=30&auth=${apiKey.apiKey}`)
        }
    });
    //30 mins
    document.getElementById('pausehole30').addEventListener('click', function() {
        if(apiKey.apiKey && ipAddress.ipAddress){
            fetch(`http://${ipAddress.ipAddress}/admin/api.php?disable=1800&auth=${apiKey.apiKey}`)
        }
    });
    //1mins
    document.getElementById('pausehole60').addEventListener('click', function() {
        if(apiKey.apiKey && ipAddress.ipAddress){
            fetch(`http://${ipAddress.ipAddress}/admin/api.php?disable=60&auth=${apiKey.apiKey}`)
        }
    });
    //5mins
    document.getElementById('pausehole5').addEventListener('click', function() {
        if(apiKey.apiKey && ipAddress.ipAddress){
            fetch(`http://${ipAddress.ipAddress}/admin/api.php?disable=300&auth=${apiKey.apiKey}`)
        }
    });
});