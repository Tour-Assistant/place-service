import { placeSchema } from "./placeSchema";

const createPlaceSchema = {
  type: "object",
  properties: {
    body: placeSchema,
  },
  required: ["body"],
};

export { createPlaceSchema };
