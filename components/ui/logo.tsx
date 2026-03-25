import Image from 'next/image';
import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/tesolmooc" className="inline-flex" aria-label="VMG TESOL">
      <Image src="/images/VMG_LOGO.svg" alt="VMG TESOL Logo" width={150} height={48} className="h-12 w-auto pb-1 object-contain" />
    </Link>
  );
}
