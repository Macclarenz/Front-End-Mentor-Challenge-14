import { createMap } from "./map.js"
import { getLocation } from "./ipFind.js"

const inputField = document.querySelector('.input-text')
const form = document.querySelector('#myForm')

console.log('NOTE - Accuracy depends on how the isp displays the ip (whether it has filtered for security or not) and how the algorithm of api handles it. Vpn may also affects how the location will be display. It doesn\'t present the location with 100% accuracy')

// - This is where all the functions will be trigger asynchronously
const trigger = async () => {
    try {
        const gettingLocation = await getLocation(inputField.value)
        const displayingMessage = await displayMessage(gettingLocation)
        createMap(L, displayingMessage) // - L is the object from the leaflet.js which would be pass to map.js to renders the map
    } catch(err) {
        console.error(err)
    }
}

// - Once the form submits it invoke the trigger async function
form.addEventListener('submit', (e) => {
    e.preventDefault()
    if (!inputField.value) inputField.placeholder = 'Empty field or Falsy input'
    else trigger()
})

// - To remove the error placeholder
inputField.addEventListener('input', (e) => {
    e.target.placeholder = "Search for any IP address or domain"
})

// - Divides the array in to small and data display it
const displayMessage = (renderedResponse) => {
    return new Promise((resolve, reject) => {
        if (!renderedResponse) reject('Result falsy!')
        {
            const resultPanels = document.querySelectorAll('.result-panel')
            resultPanels.forEach((el, i) => {
                if (el.children[1].children.length) el.children[1].children[0].innerText = renderedResponse[i]
                else el.children[1].innerText = renderedResponse[i]
            })
        }

        // returns the [lattitude, longtitude] for the map to generate
        resolve(renderedResponse[4])
    })
}

