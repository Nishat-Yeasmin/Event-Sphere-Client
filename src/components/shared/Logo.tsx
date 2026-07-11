import Link from "next/link";

interface LogoProps {
  light?: boolean;
}

export default function Logo({ light = false }: LogoProps) {
  return (
    <Link
      href="/"
      className="text-3xl font-extrabold tracking-tight"
    >
      <span className="text-violet-600">Event</span>

      <span className={light ? "text-white" : "text-gray-900"}>
        Sphere
      </span>
    </Link>
  );
}