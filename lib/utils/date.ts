export function calculateNights(checkIn: string, checkOut: string) {
  const start = new Date(checkIn);
  const end = new Date(checkOut);

  return Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
}

export function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function getBookingStatus(checkIn: string, checkOut: string) {
  const today = new Date();
  const start = new Date(checkIn);
  const end = new Date(checkOut);

  today.setHours(0, 0, 0, 0);
  start.setHours(0, 0, 0, 0);
  end.setHours(0, 0, 0, 0);

  const daysUntilStart = Math.ceil(
    (start.getTime() - today.getTime()) / (1000 * 60 * 60 * 24),
  );

  const daysUntilEnd = Math.ceil(
    (end.getTime() - today.getTime()) / (1000 * 60 * 60 * 24),
  );

  const daysSinceCompleted = Math.floor(
    (today.getTime() - end.getTime()) / (1000 * 60 * 60 * 24),
  );

  if (today < start) {
    return {
      status: "Upcoming",
      badge: "🟢 Upcoming",
      badgeClasses: "bg-green-100 text-green-700",
      message:
        daysUntilStart === 1
          ? "Starts tomorrow"
          : `Starts in ${daysUntilStart} days`,
    };
  }

  if (today >= start && today < end) {
    return {
      status: "Ongoing",
      badge: "🔵 Ongoing",
      badgeClasses: "bg-blue-100 text-blue-700",
      message:
        daysUntilEnd === 1 ? "Ends tomorrow" : `Ends in ${daysUntilEnd} days`,
    };
  }

  return {
    status: "Completed",
    badge: "⚫ Completed",
    badgeClasses: "bg-zinc-200 text-zinc-700",
    message:
      daysSinceCompleted === 0
        ? "Checked out today"
        : `Stayed ${daysSinceCompleted} days ago`,
  };
  
}
