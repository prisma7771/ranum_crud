export default {
  beforeCreate(event) {
    normalizeJsonFields(event.params.data);
  },
  beforeUpdate(event) {
    normalizeJsonFields(event.params.data);
  },
};

function normalizeJsonFields(data: Record<string, any>) {
  const jsonFields = ["includes", "before_event", "on_event", "add_ons"]; // Adjust this list

  jsonFields.forEach((field) => {
    if (data[field] === "" || data[field] === "{}" || data[field] === "[]") {
      data[field] = null; // Convert empty string or empty JSON to null
    }
  });
}
