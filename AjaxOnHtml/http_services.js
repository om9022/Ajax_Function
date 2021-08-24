function makePromiseCall(methodType, url,async = true, data) {
    return new Promise(function (resolve, reject) {
      let xchr = new XMLHttpRequest();
      xchr.onload = function () {
        console.log(
          "State Changed Called. ready State: " +
            xchr.readyState +
            " Status: " +
            xchr.status
        );
        if (xchr.readyState === 4) {
          //response 200 series menans success
          if (xchr.status === 200 || xchr.status === 201) {
            resolve(xchr.responseText);
          } else if (xchr.status >= 400) {
              reject({
                  status : xchr.status,
                  statusText : xchr.statusText
              })
            console.log("Handle 400 client Error or 500 Server Error");
          }
        }
      };
      xchr.onerror = function(){
        reject({
          status : xchr.status,
          statusText : xchr.statusText
      })
      }
      xchr.open(methodType, url, async);
      if (data) {
        console.log(JSON.stringify(data));
        xchr.setRequestHeader("Content-Type", "application/json");
        xchr.send(JSON.stringify(data));
      } else {
        xchr.send();
      }
      console.log(methodType + " request has been sent to the server");
    });
  }