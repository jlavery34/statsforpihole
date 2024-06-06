document.addEventListener('DOMContentLoaded', function () {
    const fetchData = async () => {
        try{
            let apiKey = await browser.storage.local.get(['apiKey']); //must await, else a promise is returned 
            let ipAddress = await browser.storage.local.get(['ipAddress']);
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
                    let percentage = parseFloat(data.ads_percentage_today.toFixed(1));
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
});
