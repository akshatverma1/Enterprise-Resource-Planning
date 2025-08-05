export async function getAutomobileData() {
    const response = await fetch("http://localhost:4000/data");
    const jsonData = await response.json();
    return jsonData;
}
  