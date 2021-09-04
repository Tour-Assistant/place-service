export const placeSchema = {
  type: "object",
  properties: {
    name: {
      type: "string",
    },
    alternativeNames: {
      type: "array",
      items: {
        type: "string",
      },
    },
    postCode: {
      type: "string",
    },
    area: {
      type: "string",
    },
    thana: {
      type: "string",
    },
    district: {
      type: "string",
    },
    division: {
      type: "string",
    },
    country: {
      type: "string",
    },
  },
  required: ["name"],
};
