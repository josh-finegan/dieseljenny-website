// components/Logo.tsx
import Image from 'next/image';

export function Logo() {
  return (
    <Image
      src="/logo.svg"
      alt="Diesel Jenny Logo"
      width={400}
      height={200}
      priority
    />
  );
}
