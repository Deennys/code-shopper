import { Drivers } from "../../db/database";
import { driver } from "../types/types";

export function getDriversByDistance(distance: number) {
    const validDrivers = Drivers.find((driver: driver) => Number(driver['minimum distance']) <= distance) as driver[];    

    return validDrivers
}

export function getDriverById(id: number) {
    const driver = Drivers.findOne((driver: driver) => driver._id === id) as driver

    return driver
}