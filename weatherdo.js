
  
  let apikey="AIzaSyChX8y4lTPj9TgRhz8pLxWtc7_k6HwDuIw"
  let key="1df615ad0582967ddd8157022733828e"
  var tempDiv=document.getElementById("tempDiv")
  var forcastedDiv=document.getElementById("forecast")
  
  async function getWeather(){
    tempDiv.innerHTML=""
        try{
 var city=document.getElementById("city").value 



  let url=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric`



 var iframe=document.querySelector("iframe")
  iframe.src=`https://www.google.com/maps/embed/v1/place?key=${apikey}&q=${city}`

  
 
    const response= await fetch(url);
 
     const weather= await response.json();
     console.log("weather:",weather)
  let main=weather.main
     let temp=main.temp
     let temparature=document.createElement("h2")
     temparature.innerHTML=`Temperature ${temp}°C<img src="https://ssl.gstatic.com/onebox/weather/64/partly_cloudy.png"></img>`
  
     let mintemp=main.temp_min
     let maxtemp=main.temp_max

     var minTemp=document.createElement("h3")
     minTemp.innerHTML=`<p>Min Temperature  ${mintemp}°C`
     var maxTemp=document.createElement("h3")
     maxTemp.innerHTML=`<p>Max Temperature ${maxtemp}°C`

     let wind=weather.wind
     
     let speed=wind.speed
     
     var windSpeed=document.createElement("h3")
     windSpeed.innerHTML=`<p>Wind Speed</p>${speed}`

     let clouds=weather.clouds
     let all=clouds.all

     var cloudsTag=document.createElement("h3")
     cloudsTag.innerHTML=`All Clouds ${all}`

     const sunrise = new Date((weather.sys.sunrise) * 1000);

     var sunriseTag=document.createElement("h2")
     sunriseTag.innerHTML= `Sunrise: ${sunrise.getHours()+":"+sunrise.getMinutes()}AM<img src="https://ssl.gstatic.com/onebox/weather/48/sunny.png"><img>`;

   
   const sunset = new Date((weather.sys.sunset) * 1000);
    var sunsetTag=document.createElement("h2")
 sunsetTag.innerHTML=`Sunset: ${sunset.getHours()+":"+sunset.getMinutes()}PM<img src="https://ssl.gstatic.com/onebox/weather/48/partly_cloudy.png"></img>`;
    //  console.log(temp,mintemp,maxtemp,deg,speed,all,sunrise,sunset)
     
    tempDiv.append(temparature,minTemp,maxTemp,windSpeed,cloudsTag,sunriseTag,sunsetTag)
    
    //  var weatherdata=localStorage.setItem("weatherdata",JSON.stringify(weather))
     
// var weatherdata=JSON.parse(localStorage.getItem("weatherdata"))
// console.log("weatherdata1:",weatherdata)
      let loc=weather.coord
      
    let lon=loc.lon
    let lat=loc.lat
let forecast=`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude={daily}&appid=${key}&units=metric`
      let forecastresponse = await fetch(forecast)
      let forecastData= await forecastresponse.json()
      let forcastedDate=forecastData.daily
      display(forcastedDate)
    }  
    catch(err){
     console.log("err:",err)
    }
  finally {
console.log("worked finally")
  }
 
}
var week=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"]
var daydata =new Date()
var d=daydata.getDay()
console.log("d:",d)
function display(forcastedDate){
   forcastedDiv.innerHTML=""
 forcastedDate.forEach(function(el){
   let imageDiv=document.createElement('div')
   imageDiv.setAttribute("class","daydata")
   let thu=document.createElement("img")
  
  let day=document.createElement("p")
  let x=week[d%7]
  day.innerHTML=`${x}`
  d++
  console.log(x)
  



   let maxtemp=document.createElement("p")
   maxtemp.innerHTML=`${el.temp.max}°C`;
   let mintemp=document.createElement("p")
   mintemp.innerHTML=`${el.temp.min}°C`;
   if(el.temp.max>=29){
      
      thu.src="https://ssl.gstatic.com/onebox/weather/48/sunny.png"
   }
   else if (el.temp.max<30 || el.temp>13){
     thu.src="https://ssl.gstatic.com/onebox/weather/48/partly_cloudy.png"
   }
 
   imageDiv.append(day,thu,maxtemp,mintemp)
   forcastedDiv.append(imageDiv)
 })

}

