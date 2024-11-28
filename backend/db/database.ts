const dbLocal = require("db-local");
const { Schema } = new dbLocal({ path: "./databases" });

const Drivers = Schema("Drivers", {
    _id: { type: Number, required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    car: { type: String, required: true },
    resume: { type: String, required: true },
    stars: { type: Number, required: true },
    rate: { type: Number, required: true },
    'minimum distance': { type: Number, required: true }
});

export { Drivers }