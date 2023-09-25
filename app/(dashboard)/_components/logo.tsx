import Image from "next/image";
import Link from "next/link";

const Logo = () => {
  return (
    <Link href="/" className="min-w-fit">
      <Image height={100} width={80} alt="logo" src="/logo.svg" />
    </Link>
  );
};

export default Logo;
