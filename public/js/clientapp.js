
const weatherForm = document.querySelector("form")
const search = document.querySelector("input")
const message1 = document.querySelector("#message1")
const message2 = document.querySelector("#message2")


weatherForm.addEventListener("submit", (e) => {
    console.log("hi")
    e.preventDefault();
    const location = String(search.value);
    console.log(location)
    const url = "http://localhost:3003/weather?address=" + location;
    fetch(url).then((response)=>{
        response.json().then((data) => {
            if (data.error){
                message1.textContent = data.error
                message2.textContent=""
            } else {
                message1.textContent = location
                message2.textContent = `description: ${data.description}
                temperature: ${data.temperature}
                feelslike: ${data.feelslike}`
            }
        })
    })
})