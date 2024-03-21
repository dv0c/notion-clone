import Image from "next/image";
import { Poppins } from "next/font/google";

import { cn } from "@/lib/utils";

const font = Poppins({
  subsets: ["latin"],
  weight: ["400", "600"],
});

const Logo = () => {
  return (
    <div className="flex items-center gap-x-2">
      <Image
        src={"/not-dark.png"}
        height={"40"}
        width={"40"}
        alt="Logo"
        className="dark:hidden"
      />
      <Image
        src={"/not-white.webp"}
        height={"40"}
        width={"40"}
        alt="Logo"
        className="hidden dark:block"
      />
      <p className={cn("font-semibold hidden sm:block", font.className)}>
        Notion
      </p>
    </div>
  );
};

export default Logo;
