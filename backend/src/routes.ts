import { FastifyInstance, FastifyPluginOptions, FastifyRequest, FastifyReply } from "fastify";
import { RideEstimateController } from "./controllers/RideEstimateController";

export async function routes(fastify: FastifyInstance, opions: FastifyPluginOptions) {
    fastify.post('/ride/estimate', async(request: FastifyRequest, reply: FastifyReply) => {
        return new RideEstimateController().handle(request, reply)
    })
}   