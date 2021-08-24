let XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

function makePromiseCall(methodType, url,async = true, data) {
  return new Promise(function (resolve, reject) {
    let xchr = new XMLHttpRequest();
    xchr.onreadystatechange = function () {
      console.log(
        "State are Changed Called. ready State: " +
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
    xchr.open(methodType, url, async);
    if (data) {
      console.log(JSON.stringify(data));
      xchr.setRequestHeader("Content-Type", "application/json");
      xchr.send(JSON.stringify(data));
    } else {
      xchr.send();
    }
    console.log(methodType + " request sent to the server");
  });
}

//fetch data from server
const getURL = "http://127.0.0.1:3000/employees/";
makePromiseCall("Get", getURL,true)
.then(responseText => console.log("Get the User Data "+responseText))
.catch(error => console.log("Get the User Data "+JSON.stringify(error)))

//delete data from server
const deleteURL = "http://127.0.0.1:3000/employees/4";
makePromiseCall("Delete", deleteURL, false)
.then(responseText => console.log("User is Deleted: " +responseText))
.catch(error =>console.log("Delete an Error Status: " +JSON.stringify(error)))

//Add a new object
const postUrl = "http://127.0.0.1:3000/employees";
const empData = { name: "Omkar", salary: "5000" };
makePromiseCall("Post", postUrl,true, empData)
.then(responseText => console.log("User are Added: " +responseText))
.catch(error =>console.log("POST Error Status: " +JSON.stringify(error)))
