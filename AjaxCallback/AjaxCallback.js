let XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest

function makeAjaxCall(methodType,url,callback,async = true,data) {
    let xchr = new XMLHttpRequest();
    xchr.onreadystatechange = function () {
        console.log("State Changed Called. ready State: "+xchr.readyState+" Status: "+xchr.status)
        if (xchr.readyState === 4) {
            //response 200 series menans success
            if (xchr.status === 200 || xchr.status === 201) {
                callback(xchr.responseText)
            }
            else if (xchr.status >= 400){
                console.log("Handle 400 client Error or 500 Server Error");
            }
        }
    }
    xchr.open(methodType,url,async)
    if(data){
        console.log(JSON.stringify(data));
        xchr.setRequestHeader("Content-Type","application/json")
        xchr.send(JSON.stringify(data))
    }
    else{
        xchr.send()
    }
    console.log(methodType+" request has been sent to Server");
}

//fetch data from server
const getURL = "http://127.0.0.1:3000/employees/"
function getUserDetails(data) {
    console.log("Get User Data: "+data);
}
makeAjaxCall("Get",getURL,getUserDetails)

//delete data from server
const deleteURL = "http://127.0.0.1:3000/employees/4"
function deleteUserDetails(data) {
    console.log("User is Deleted: "+data);
}
makeAjaxCall("Delete",deleteURL,deleteUserDetails,false)

//Add a new object
const postUrl= "http://127.0.0.1:3000/employees"
const empData = {"name":"Omkar","salary":"5000"}
function userAdd(data) {
    console.log("User Added: "+data);
}
makeAjaxCall("Post",postUrl,userAdd,true,empData)