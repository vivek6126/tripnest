type BookingCardProps = {
  price: number;
};

export default function BookingCard({
  price,
}: BookingCardProps) {
  return (
    <aside className="rounded-xl border p-6 shadow-sm">
      <p className="text-3xl font-bold">
        ₹{price}
        <span className="text-base font-normal text-zinc-500">
          {" "}
          / night
        </span>
      </p>

      

      <button className="mt-6 w-full rounded-lg bg-black px-4 py-3 text-white transition hover:bg-zinc-800">
        Book Now
      </button>
    </aside>
  );
}