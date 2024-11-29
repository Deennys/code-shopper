import { Rides } from "../../db/database";
import { requestRideConfirm, ride } from "../types/types";

export function saveRides(requestConfirm: requestRideConfirm) {
    const ride = Rides.findOne((ride: ride) => ride.customer_id === requestConfirm.customer_id) as ride

    if (!ride) {
        Rides.create({
            "customer_id": requestConfirm.customer_id,
            "rides": [
                {
                    "id": requestConfirm.driver.id,
                    "date": Date.now(),
                    "origin": requestConfirm.origin,
                    "destination": requestConfirm.destination,
                    "distance": requestConfirm.distance,
                    "duration": requestConfirm.duration,
                    "driver": {
                        "id": requestConfirm.driver.id,
                        "name": requestConfirm.driver.name
                    },
                    "value": requestConfirm.value
                }
            ]
        }).save()
        return true
    }

    const newRides = ride.rides

    newRides.push({
        "id": requestConfirm.driver.id,
        "date": Date.now(),
        "origin": requestConfirm.origin,
        "destination": requestConfirm.destination,
        "distance": requestConfirm.distance,
        "duration": requestConfirm.duration,
        "driver": {
            "id": requestConfirm.driver.id,
            "name": requestConfirm.driver.name
        },
        "value": requestConfirm.value
    })

    ride.rides = newRides
    ride.save()
    return true
}

export function getRides(customerId: string) {
    const ride = Rides.findOne((ride: ride) => {
        return ride.customer_id === customerId
    }) as ride

    return ride
}