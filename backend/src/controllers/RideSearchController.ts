import { FastifyRequest, FastifyReply } from "fastify";
import { getDriverById } from "../services/driverService";
import { getRides } from "../services/ridesService";



class RideSearchController {
    async handle(request: FastifyRequest, reply: FastifyReply) {
        const { customer_id: customerId } = request.params as { customer_id: string }
        const { driver_id: driverId } = request.query as { driver_id: string }
        if (!(typeof customerId === 'string' && customerId.trim())) {
            reply.status(400).send({
                "error_code": "INVALID_DATA",
                "error_description": 'string'
            })
            return
        }

        const ride = getRides(customerId)

        if (!ride) {
            reply.code(404).send({
                "error_code": "NO_RIDES_FOUND",
                "error_description": "string"
            })
            return
        }

        if (driverId) {
            const driver = getDriverById(+driverId)
    
            if (!driver) {
                return reply.code(400).send({
                    "error_code": "INVALID_DRIVER",
                    "error_description": "string"
                })
                
            }

            const ridesFiltered = ride.rides.filter(ride => {
                return ride.id === +driverId
            })

            if (!ridesFiltered.length) {
                return reply.code(404).send({
                    "error_code": "NO_RIDES_FOUND",
                    "error_description": "string"
                })
            } else {
                return reply.code(200).send({
                    "customer_id": customerId,
                    "rides": ridesFiltered
                })
            }
        }

        return reply.code(200).send(ride)

    }
}

export { RideSearchController }