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

const renderRawResponse = (rawResponse) => {
    const ipAddress = rawResponse.ip
    const location = `${rawResponse.location.city}, ${rawResponse.location.region} ${rawResponse.location.postalCode}`
    const timezone = rawResponse.location.timezone
    const isp = rawResponse.isp
    const lattitude = rawResponse.location.lat
    const longitude = rawResponse.location.lng

    // console.log(ipAddress, location, timezone, isp)
    return [
        ipAddress, 
        location, 
        timezone, 
        isp, 
        [lattitude, longitude]
    ]
}

export { getLocation } 

/*

as: {asn: 7127, name: 'SCE', route: '192.212.0.0/15', domain: '', type: ''}
ip: "192.212.14.101"
isp: "Southern California Edison"
location:
    city: "South San Gabriel"
    country: "US"
    geonameId: 5397771
    lat: 34.04915
    lng: -118.09462
    postalCode: ""
    region: "California"
    timezone: "-08:00"

*/