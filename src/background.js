function openSplashScreen() {
    browser.tabs.create({ url: 'src/setup.html' });
  }
  
  function checkLogin() {
    browser.storage.local.get(['apiKey', 'ipAddress'], function(result) {
      if (result.apiKey && result.ipAddress) {
        //do nothing, alls good
      } else {
        openSplashScreen();
      }
    });
  }
  

  browser.runtime.onInstalled.addListener(openSplashScreen);
  browser.runtime.onStartup.addListener(checkLogin);
  