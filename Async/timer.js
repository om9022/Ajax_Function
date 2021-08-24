function showTime() {
    const date = new Date()
    return date.getHours() + "Hours:" + date.getMinutes() +"Minuts:"+ date.getSeconds()+"Seconds"
}

function showSessionExpire() {
    console.log("Act-B: Your session expired at "+showTime());
}

console.log("Act-A : tigering Act-B at: "+showTime());
setTimeout(showSessionExpire,5000)
console.log("Act-A : Trigered Act-B at "+showTime()+" will execute after 5 seconds");