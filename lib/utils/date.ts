export function calculateNights(
  checkIn: string,
  checkOut: string
) {
  const start = new Date(checkIn);
  const end = new Date(checkOut);

  return Math.ceil(
    (end.getTime() - start.getTime()) /
      (1000 * 60 * 60 * 24)
  );
}

export function formatDate(
  date: string
) {
  return new Date(date).toLocaleDateString(
    "en-IN",
    {
      day: "numeric",
      month: "short",
      year: "numeric",
    }
  );
}