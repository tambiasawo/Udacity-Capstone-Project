const fetch = require('node-fetch')
const doc = document

const user = process.env.user;
const weatherBitAPI = process.env.weatherBitAPI;
const pixAPI = process.env.pixAPI;

console.log(user, pixAPI)

const ul = doc.querySelector('.destinations')
const loc = doc.getElementById('loc')
const date = doc.getElementById('date')

let weatherURL;
let items =  []

export async function getInfo(e) {
    e.preventDefault()
    const location = loc.value.substring(0,1).toUpperCase()+loc.value.substring(1,loc.value.length).toLowerCase();
    const dateValue = date.value;
    if(location && dateValue)
    {
        const d1 = new Date(dateValue+'T00:00:00')
        const today = new Date()
        let t1 = today.getTime()
        let t2 = d1.getTime()
        let t1_nextWeek = t1+(7*24*60*60*1000)
        let diff_days = Math.floor((t2-t1)/(24*60*60*1000)) + 1;
        if(diff_days<0)
        {
            alert("Please enter a valid date")
            return false;
        }
        const geonameURL = `http://api.geonames.org/searchJSON?q=${location}&maxRows=10&username=${user}`
        const request = await fetch(geonameURL)
        try{
            const response = await request.json() 
            const long = response.geonames[0].lng
            const lat = response.geonames[0].lat
            const curr = `https://api.weatherbit.io/v2.0/current?lat=${lat}&lon=${long}&key=${weatherBitAPI}`
            const forecast = `https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${long}&days=${diff_days}&key=${weatherBitAPI}`
    
            weatherURL = t2 > t1_nextWeek ? forecast : curr
            getWeatherResponse(weatherURL).then(function (results) {
                getWeatherData(results, diff_days, location, dateValue)
            })
        }
        catch(e)      
        {
            console.log('Request Unsuccessful');
        }
        loc.value = ""
        date.value = ""
    }

    else {
        alert("Please make sure all input fields are filled")
        return false;
    }
}
export async function getLocationImage(location) { 
    const url = `https://pixabay.com/api/?key=${pixAPI}&q=${location}&per_page=3&image_type=photo`
    const request = await fetch(url)
    try
    {
        const resp = await request.json()
        return (resp.hits.length==0) ? "https://cdn.pixabay.com/photo/2018/05/06/15/48/city-3378773_960_720.jpg" : resp.hits[0].webformatURL
    }
    catch(e)      
    {
        console.log('Request Unsuccessful');
    }
}

export async function getWeatherResponse(url) {
    const request = await fetch(url);
    try
    {
        const response = await request.json();
        return response
    }
    catch(e)      
    {
        console.log('Request Unsuccessful');
    }
}

async function getWeatherData(result, diff_days, loc, dateVal) {
    const data = result.data.length>1 ? result.data[diff_days-1] : result.data[0]
    const temp = data.temp;
    const hum = data.rh
    const descr = data.weather.description
    const icon = data.weather.icon
    const country = result.data.length>1 ? result.country_code : data.country_code
    const feelsLike = data.app_max_temp ? (data.app_max_temp + data.app_min_temp)/2 : data.app_temp
    const iconUrl = `https://www.weatherbit.io/static/img/icons/${icon}.png`
    const wind = data.wind_spd;
    const locImage = await getLocationImage(loc)
    postMethod('/send', {country, diff_days, temp, descr, iconUrl, feelsLike, wind, hum, locImage, dateVal, loc})
    getDataFromServer()
}

export async function postMethod(url, data) {
    return await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
}

async function getDataFromServer() {
    const response = await fetch('/get');
    let retrievedData = await response.json();
    updateUI(retrievedData)   
}

function updateUI(retrievedData) {
    items.push(retrievedData)
   
    items = items.sort((a,b)=> {return parseFloat(a.diff_days) - parseFloat(b.diff_days)})
  
    ul.innerHTML = items.map((item, i) => { 
        const localInfo = 
            `<div class = "display">
                <h3>Packing List</h3> 
                <p> ${item.info} </p>
            </div>`

        const notesDisplay = (item.info) ? localInfo : ""
        return `
            <li data-index = ${i}>
                <div class="dest1">
                    <h2>${item.loc}, ${item.country}</h2>
                    <img src="${item.locImage}" alt="se" width="200px" height="150px">
                    <h4>${item.diff_days} Days left. <br>Departing on: ${item.dateVal} </h4>
                    <div class="weatherContainer">
                        <div id="weatherDescriptionHeader">${item.descr}</div>
                        <div id="weatherMain">
                            <div id="temperature"><h2>${Math.floor(item.temp)} &#8451;</h2></div>
                            <div id="documentIconImg"><img src="${item.iconUrl}"></div>
                            <div class="bottomDetails"> 
                                <div id="feel">Feels like ${Math.floor(item.feelsLike)} &#8451;</div>
                                <div id="windSpeed" class="bottom-details">Wind Speed: ${Math.floor(item.wind)} m/s</div>
                                <div id="humidity" class="bottom-details">Humidity: ${Math.floor(item.hum)}</div>
                            </div>
                        </div>
                    </div>
                    <div class = "tripps">
                        ${notesDisplay}
                        <button id = ${i} data-pack = ${i} class = "but">Add Packing List </button>
                        <button id = "save" data-index = ${i} job = "save">Save Trip</button>
                    </div>
                </div>   
        </li>`;
    }).join('');
}


export function handleClick(e) {
    if(e.target.localName=="button"){
        const elem = e.target
        let ikey = Math.floor(Math.random()*1000)
        if(elem.innerText=="Save Trip"){
            saveList(elem,ikey)
        }
        else if(elem.innerText=="Delete Trip"){
            deleteList(elem)
        }
        else{
            const dataPack = elem.dataset.pack
            if(dataPack==(elem.nextElementSibling.dataset.index))
            {
                //display textarea for specific li when button clicked
                let notes = doc.createElement('textarea') 
                notes.setAttribute('id', 'notes')
                notes.rows= 3; notes.cols = 8
                elem.parentElement.insertAdjacentElement('afterbegin', notes)
                const pack = elem.dataset.pack
                notes.setAttribute('data-index', pack) 
                doc.getElementById(pack).style.display='none'
            }
            else
            {
                return
            }
        }
    }
}

function saveList(targ,ikey){
    const display = doc.createElement('div')
    const index = targ.dataset.index 
    if(targ.parentElement.firstChild.rows==3)
    {
        let textVal
        const thatNote = doc.querySelectorAll('textarea')
        thatNote.forEach(item => {
            if(item.dataset.index==index){
                textVal = item.value; 
            }
        })

        display.setAttribute('index', index)
        display.classList.add('display')
        if(textVal){
            let newArr
            newArr=textVal.split("\n")
            display.innerHTML = `<h3>Packing List</h3>`   
            newArr.forEach(line => {                    // display the contents of the textarea per line
                display.innerHTML += `<p>${line}</p>`
            })
            items[index].info= textVal
            targ.parentElement.insertAdjacentElement('afterbegin', display)
            targ.parentElement.firstElementChild.nextElementSibling.remove()
        }
        else
        {
            targ.parentElement.getElementsByTagName('textarea')[0].style.display = 'none';        
        }
    }
    else
    {
        targ.previousElementSibling.style.display='none'
    }
    
    items[index].delkey = ikey
    localStorage.setItem(`${ikey}`, JSON.stringify(items[index]))
    targ.innerText = "Delete Trip"
}
    
function deleteList(t) {
    let delIndex; let toDel
    let lockeys = Object.keys(localStorage) 
    // get the keys from localStorgae and delete appropraite item when keys match
    items.forEach((item, i) => {     
        if(item.delkey == lockeys[i]) 
            {
                delIndex = items.indexOf(item)  
                toDel = item.delkey
            }
            else
            {
                delIndex = -1
            }
        })

    items.splice(delIndex,1)
    localStorage.removeItem(toDel) 
    t.parentElement.parentElement.parentElement.remove()   
   
}

//display localStorage items upon reload
const store = { ...localStorage };

if(Object.getOwnPropertyNames(store).length>0){
    for(var c in store)
    {
        
        updateUI(JSON.parse(store[c]))
        const delBut = doc.querySelectorAll('#save')
        delBut.forEach(item => {item.innerText = "Delete Trip" })
        const packListBut = doc.querySelectorAll('button[data-pack]')
        packListBut.forEach(item => {item.style.display = "none" })
        
    }
}
