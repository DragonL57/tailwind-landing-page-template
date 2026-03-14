import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/tesolmooc" className="inline-flex" aria-label="VMG TESOL">
      <img src="/images/VMG_LOGO.svg" alt="VMG TESOL Logo" className="h-40 w-auto pt-3" />
    </Link>
  );
}
