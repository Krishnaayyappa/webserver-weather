
const express = require("express");
const path = require("path");
const hbs = require("hbs");
const { setFlagsFromString } = require("v8");
const { kMaxLength } = require("buffer");
const forecast = require("./utils/forecast")
const app = express();

const publicdirectoryname = path.join(__dirname, "../public");
const viewspath = path.join(__dirname, "../templates/views");
const partialspath = path.join(__dirname, "../templates/partials");


app.set("view engine", "hbs");
app.set("views", viewspath);
hbs.registerPartials(partialspath);


app.use(express.static(publicdirectoryname));


// app.get("", (req,res) => {
//     res.send("");
// })

app.get("/", (req,res) => {
    res.render("home", {
        description:"Welcome to weather app!"
    })
});


app.get("/weather", (req,res) => {
    const address = req.query.address
    if (!address){
        return res.render("weather", {
            description:"Use this search to enter the weather details"
        })
    }
    
    forecast(address, (error, response)=>{
        if (error){
            res.send({
                error:error
            })
        } else {
            res.send({
                description:response.description,
                temperature: response.temperature,
                feelslike: response.feelslike        
            })
        }
    })
})
    
    

   
    // res.render("weather", {
    //     description:"Today's weather is 0 deg"
    // })


app.get("/about", (req,res) => {
    res.render("about", {
        description:"My Name is Krishna.Welcome to weather Channel"
    })
});

app.get("/help", (req,res) => {
    res.render("help", {
        description:"Please find the below help documents"
    })
});

app.get("/help/*", (req,res) => {
    res.render("message", {
        message:"Help article not found"
    });
})

app.get("*", (req,res) => {
    res.render("message", {
        message:"page not found"
    });
})


app.listen(3003, () => {
    console.log("connected to the port sucessfully!");
})

