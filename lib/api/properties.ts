export type Property = {
  id: number;
  title: string;
  location: string;
  description: string;
  price: number;
  rating: number;
  image: string;
  bedrooms: number;
  amenities: string[];
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

export async function getProperty(
  id: number
): Promise<Property> {
  const response = await fetch(
    `/api/properties/${id}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch property.");
  }

  return await response.json();
}