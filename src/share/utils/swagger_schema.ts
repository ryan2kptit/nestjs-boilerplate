export function swaggerSchemaExample(example, description) {
  return {
    content: {
      schema: {
        example,
      },
    },
    description,
  };
}
