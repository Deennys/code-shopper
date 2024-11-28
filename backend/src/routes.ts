import { FastifyInstance, FastifyPluginOptions, FastifyRequest, FastifyReply } from "fastify";
import { RideEstimateController } from "./controllers/RideEstimateController";
import { RideConfirmController } from "./controllers/RideConfirmController";

export async function routes(fastify: FastifyInstance, opions: FastifyPluginOptions) {
    fastify.post('/ride/estimate', async(request: FastifyRequest, reply: FastifyReply) => {
        return new RideEstimateController().handle(request, reply)
    })
    fastify.patch('/ride/confirm', async(request: FastifyRequest, reply: FastifyReply) => {
        return new RideConfirmController().handle(request, reply)
    })
    fastify.get('/ride/:customer_id', opions, async(request: FastifyRequest, reply: FastifyReply) => {
        return new RideConfirmController().handle(request, reply)
    })
}   