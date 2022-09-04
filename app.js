const tableBody = document.getElementById('table-body')
let flights = [
    {
        time: "8: 11",
        destination: "OMAN",
        flight: "OX 203",
        gate: "A 01",
        remarks: "ON TIME"
    },
    {
        time: "09: 11",
        destination: "LONDON",
        flight: "CL 320",
        gate: "C 31",
        remarks: "CANCELLED"
    },
    {
        time: "10: 11",
        destination: "DUBAI",
        flight: "OXB 201",
        gate: "A 19",
        remarks: "CANCELLED"
    },
    {
        time: "11: 01",
        destination: "FRANKFURT",
        flight: "FR 402",
        gate: "AB 02",
        remarks: "ON TIME"
    },
    {
        time: "12: 22",
        destination: "TOKYO",
        flight: "TK 211",
        gate: "A 32",
        remarks: "DELAYED"
    },
]
const destinations = ["OMAN", "LONDON", "DUBAI", "FRANKFURT", "TOKYO", "BEIRUT", "FRANCE", "NY"]
const remarks = ["ON TIME", "DELAYED", "CANCELLED"]
let lastFlightHour = 13
function populateTable(flights) {
    flights.forEach(flight => {
        const tableRow = document.createElement('tr')
        Object.keys(flight).forEach(flightDetail => {
            const tableData = document.createElement('td')
            Array.from(flight[flightDetail]).forEach((letter,i) => {
                const letterElement = document.createElement("div")
                setTimeout(()=> {
                    letterElement.classList.add("flip")
                    letterElement.textContent = letter.trim()
                    tableData.append(letterElement)
                },100 * i)
            })
            tableRow.append(tableData)
        })
        tableBody.append(tableRow)
    })
}
populateTable(flights)
function genRandLtr() {
    const alphabts = "abcdefghijklmnopqrstuvwxyz"
    return alphabts.charAt(Math.floor(Math.random() * alphabts.length))
}
function genRandNum(max) {
    let nums = "1234567890"
    if(max) {
        nums = nums.slice(0,max)
    }
    return Math.floor(Math.random() * nums.length)
}
function genTime(h) {
    let hour = h
    if(hour<24) hour = hour+1
    if(hour>=24) hour = 0
    if(hour<10) hour = "0"+hour
    lastFlightHour = Number(hour)
    return hour + ":" + genRandNum(5) + genRandNum()
}
function shuffleUp(flts)  {
    const flightsCopy = [...flts]
    flightsCopy.shift()
    flightsCopy.push({
        time: genTime(lastFlightHour),
        destination: destinations[Math.floor(Math.random() * destinations.length)],
        flight: genRandLtr() + genRandLtr() + " " + genRandNum() + genRandNum() + genRandNum(),
        gate: genRandLtr() + " " + genRandNum() + genRandNum(),
        remarks: remarks[Math.floor(Math.random() * remarks.length)]
    })
    tableBody.textContent = ""
    flights = flightsCopy
    populateTable(flightsCopy)
}
setInterval(() => shuffleUp(flights), 2000)