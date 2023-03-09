const { response } = require('express');
const express = require('express'); //importing express js module into our application
const app = express(); //initializing the app using express
const port = 3000;
const fs = require('fs')
var bodyParser = require('body-parser');


app.set('views', 'views');
app.set('view engine', 'hbs');
app.use(express.static('public'));
app.use(express.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

let rawData = fs.readFileSync('bmi.json')
let data = JSON.parse(rawData)


function calculateBMI(weight, height){
    let bmi = weight/((height/100)**2);
    // console.log(bmi)

    return bmi.toFixed(2);
}

app.get('/', function (request, response){ //using app we are configuring the route
    response.render('home');
});


app.post('/results', (request, response)=>{
    const {weight, height} = request.body;
    const bmi = calculateBMI(weight, height);
    const info = {
        weight:weight,
        height:height,
        bmi:bmi,
    }

    data.push(info)
    fs.writeFileSync('bmi.json',JSON.stringify(data,null,2))
    
    response.render('results', {bmi: bmi});
}); 

app.get("/reports", function(request, response){
    response.render('reports');
});

app.get('/get-bmi',(_,response)=>{
    response.send(data)
})
    

app.listen(port, () => console.log('server is listening on port 3000'));

