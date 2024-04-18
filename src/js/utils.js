export function parseFormToJSON(form) {
  const formData = new FormData(form);
  const JSONFormData = Object.fromEntries(formData.entries());
  return JSONFormData;
}
