type NavbarProps = {
    title : string;
  buttonText: string;
};

export default function Navbar({ buttonText ,title }: NavbarProps) {
  return (
    <nav className="flex items-center justify-between border-b p-4">
      <h1 className="text-2xl font-bold">{title}</h1>

      <button className="rounded bg-black px-4 py-2 text-white">
        {buttonText}
      </button>
    </nav>
  );
}