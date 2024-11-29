import { FastifyRequest, FastifyReply } from "fastify";
import { requestRideConfirm } from "../types/types";
import { getDriverById } from "../services/driverService";
import { saveRides } from "../services/ridesService";



class RideConfirmController {
    async handle(request: FastifyRequest, reply: FastifyReply) {
        const {
            customer_id: customerId,
            origin,
            destination,
            distance,
            driver,
            value
        } = request.body as requestRideConfirm;
        
        //Validação de paramentros de customerId, origin e destination
        if (![customerId, origin, destination].every(param => typeof param === 'string' && param.trim()) || origin.trim() === destination.trim()) {
            reply.status(400).send({
                "error_code": "INVALID_DATA",
                "error_description": 'string'
            })
            return
        }
        
        const driverResponse = getDriverById(driver.id)

        if (!driverResponse) {
            reply.status(404).send({
                "error_code": "DRIVER_NOT_FOUND",
                "error_description": 'string'
            })
            return
        }

        if (Number(driverResponse['minimum distance']) > distance) {
            reply.status(406).send({
                "error_code": "INVALID_DISTANCE",
                "error_description": 'string'
            })
            return
        }

        const realValue = distance * Number(driverResponse.rate)

        if (value === realValue) {
            reply.status(200).send({
                "success": saveRides(request.body as requestRideConfirm)
            }) 
        } else {
            reply.status(406).send({
                "error_code": "INVALID_VALUE",
                "error_description": 'string'
            })
        }


    }
}

export { RideConfirmController }