import { createMap } from "./map.js"
import { getLocation } from "./ipFind.js"

const inputField = document.querySelector('.input-text')
const form = document.querySelector('#myForm')

console.log('NOTE - Accuracy depends on how the isp and algorithm of api. Vpn may also affects how the location will be display. It doesn\'t present the location with 100% accuracy')

const trigger = async () => {
    try {
        const gettingLocation = await getLocation(inputField.value)
        const displayingMessage = await displayMessage(gettingLocation)
        const creatingMap = await createMap(L, displayingMessage)
    } catch(err) {
        console.error(err)
    }
}

const inputButton = document.querySelector('.input-button')
form.addEventListener('submit', (e) => {
    e.preventDefault()
    if (!inputField.value) inputField.placeholder = 'Empty field or Falsy input'
    else trigger()
})

inputField.addEventListener('input', (e) => {
    e.target.placeholder = "Search for any IP address or domain"
})

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

        resolve(renderedResponse[4])
    })
}

