type driver = {
    _id: Number,
    name: String,
    description: String,
    car: String,
    resume: String,
    stars: Number,
    rate: Number,
    'minimum distance': Number
}

type ride = {
    save(): unknown
    "customer_id": string,
    "rides": [
        {
            "id": number,
            "date": Object,
            "origin": string,
            "destination": string,
            "distance": number,
            "duration": string,
            "driver": {
                "id": number,
                "name": string
            },
            "value": number
        }
    ]
}

type requestRideConfirm = {
    "customer_id": string,
    "origin": string,
    "destination": string,
    "distance": number,
    "duration": string,
    "driver": {
        "id": number,
        "name": string
    },
    "value": number
}


export { driver, requestRideConfirm, ride }