export async function getAutomobileData() {
    const response = await fetch("http://localhost:4000/api/products");
    console.log(response);
    const jsonData = await response.json();
    return jsonData;
}
  