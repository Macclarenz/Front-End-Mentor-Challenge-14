// - Resquesting to get the data
const getLocation = async (userIp) => {
    try {
        const url = 'https://geo.ipify.org/api/v2/country,city?'
        const apikey = 'apiKey=at_vtDyocFWr2cgLlRV3zoyXTAQHA6fR'
        const ip = '&ipAddress=' + userIp
        const endpoint = url + apikey + ip

        const gettingLocation = await fetch(endpoint, {
            cache: 'no-cache'
        })

        if (gettingLocation.ok) {
            const jsonResponse = await gettingLocation.json()
            return renderRawResponse(jsonResponse)
        } else throw new Error('Connection Failed!')


    } catch(err) {
        console.error(err.message)
    }
}

// - Once it resolves it will renders the raw data from getLocation async function and returns the data it needs
const renderRawResponse = (rawResponse) => {
    const ipAddress = rawResponse.ip
    const location = `${rawResponse.location.city}, ${rawResponse.location.region} ${rawResponse.location.postalCode}`
    const timezone = rawResponse.location.timezone
    const isp = rawResponse.isp
    const lattitude = rawResponse.location.lat
    const longitude = rawResponse.location.lng

    // console.log(lattitude, longitude)
    return [
        ipAddress, 
        location, 
        timezone, 
        isp, 
        [lattitude, longitude]
    ]
}

// exports the getLocation() to be use by the main.js
export { getLocation } 
