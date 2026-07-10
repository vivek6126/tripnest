export type Property = {
  id: number;
  title: string;
  location: string;
  description: string;
  price: number;
  rating: number;
  image: string;
  bedrooms: number;
  bathrooms: number;
  guests: number;
  amenities: string[];
  category: string;
};
type PropertyFilters = {
  destination?: string;
  minPrice?: string;
  maxPrice?: string;
  bedrooms?: string;
  rating?: string;
};

export async function getProperties(
  filters: PropertyFilters
): Promise<Property[]> {
  const params = new URLSearchParams();

    if (filters.destination) {
      params.set("destination", filters.destination);
    }

    if (filters.minPrice) {
      params.set("minPrice", filters.minPrice);
    }

    if (filters.maxPrice) {
      params.set("maxPrice", filters.maxPrice);
    }
    if (filters.bedrooms) {
      params.set("bedrooms", filters.bedrooms);
    }
    if (filters.rating) {
      params.set("rating", filters.rating);
    }

  const url = `/api/properties?${params.toString()}`;
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