import { Drivers } from "../../db/database";

export function getDriversData() {
    return [Drivers.find(1), Drivers.find(2), Drivers.find(3)]
}