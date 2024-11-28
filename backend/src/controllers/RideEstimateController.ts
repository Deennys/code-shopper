import axios from "axios";
import dotenv from 'dotenv';
import { FastifyRequest, FastifyReply } from "fastify";
import { getDriversData } from "../services/driverService";

dotenv.config();

class RideEstimateController {
    async handle(request: FastifyRequest, reply: FastifyReply) {
        const { customer_id: customerId, origin, destination } = request.body as { customer_id: string, origin: string, destination: string }

        //Validação de paramentros
        if (![customerId, origin, destination].every(param => typeof param === 'string' && param.trim())) {
            reply.status(400).send({
                "error_code": "INVALID_DATA",
                "error_description": 'string'
            })
            return
        }

        try {
            const [ routes, geocodeOrigin, geocodeDestination ] = await Promise.all([
                this.postRoute(origin, destination),
                this.getGeocode(origin),
                this.getGeocode(destination)
            ]) 


            const drivers = getDriversData()

            const response = {
                origin: {
                    latitude: geocodeOrigin?.lat,
                    longitude: geocodeOrigin?.lng
                },
                destination: {
                    latitude: geocodeDestination?.lat,
                    longitude: geocodeDestination?.lng
                },
                distance: routes?.[0]?.distanceMeters,
                duration: routes?.[0]?.duration,
                
            }

            reply.status(200).send()

        } catch (error) {
            throw error
        }



    }

    async postRoute(origin: string, destination: string) {
        const { data } = await axios.post('https://routes.googleapis.com/directions/v2:computeRoutes', {
            "origin": {
                "address": origin
            },
            "destination": {
                "address": destination
            },
            "travelMode": "DRIVE"
        }, {
            headers: {
                'Content-Type': 'application/json',
                'X-Goog-Api-Key': process.env.GOOGLE_API_KEY,
                'X-Goog-FieldMask': 'routes.duration,routes.distanceMeters' 
              }                
        })

        return data
    }

    async getGeocode(address: string) {
        const { data } = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURI(address)}&key=${process.env.GOOGLE_API_KEY}`)
        const lat = data?.results?.[0]?.geometry?.location?.lat
        const lng = data?.results?.[0]?.geometry?.location?.lng
        
        
        return { lat, lng}
    }
}

export { RideEstimateController }