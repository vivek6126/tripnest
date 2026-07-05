export type Property = {
  id: number;
  title: string;
  location: string;
  rating: number;
  price: number;
  image: string;
};

export async function getProperties(
  destination: string | null
): Promise<Property[]> {
  let url = "/api/properties";

  if (destination) {
    url += `?destination=${encodeURIComponent(destination)}`;
  }

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Failed to fetch properties.");
  }

  return await response.json();
}