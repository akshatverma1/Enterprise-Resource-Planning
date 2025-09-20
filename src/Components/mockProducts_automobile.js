export async function getAutomobileData() {
    const response = await fetch("https://enterprise-resource-planning-roan.vercel.app/api/products");
    console.log(response);
    const jsonData = await response.json();
    return jsonData;
}
  