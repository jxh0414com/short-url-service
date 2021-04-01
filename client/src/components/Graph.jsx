import React from 'react'
import { Line } from 'react-chartjs-2';
import { useState, useEffect } from 'react'


function Graph({ redirects }) {
    const [Date, setDate] = useState({})

    useEffect(() => {
        const data = {
            "1": 0,
            "2": 0,
            "3": 0,
            "4": 0,
            "5": 0,
            "6": 0,
            "7": 0,
            "8": 0,
            "9": 0,
            "10": 0,
            "11": 0,
            "12": 0
        }
        redirects.forEach(e => {
            let month = parseInt(e.date.split("-")[1])
            data[month] = (data[month] + 1)
        })
        setDate(data)
    }, [])
       
    return (
        <Line
            data={{
                labels: ["January","February","March","April","May","June","July",
            "August","September","October","November","December"],
                datasets: [
                    {
                        label: "# of redirect",
                        data: Object.values(Date)
                    }
                ]
            }}
            width={400}
            height={350}
            options={{ maintainAspectRatio: false }}
            />
    )
}

export default Graph
