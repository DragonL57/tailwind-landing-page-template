import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/" className="inline-flex" aria-label="VMG TESOL">
      <img src="/images/VMG_LOGO.svg" alt="VMG TESOL Logo" className="h-30 w-auto" />
    </Link>
  );
}
