import Image from "next/image";

const Heroes = () => {
  return (
    <div className="flex flex-col items-center justify-center max-w-5xl">
      <div className="flex items-center">
        <div className="relative w-[300px] h-[300px] sm:w-[350px] sm:h-[350px] md:h-[400px] md:w-[400px]">
          <Image
            src={"/documents.png"}
            fill
            className="select-none dark:hidden object-contain"
            alt="documents"
          />
          <Image
            src={"/documents-dark.png"}
            fill
            className="select-none dark:block hidden object-contain"
            alt="documents"
          />
        </div>
        <div className="relative h-[400px] w-[400px] hidden md:block">
          <Image
            alt="reading"
            src={"/reading.png"}
            fill
            className="select-none dark:hidden object-contain"
          />
          <Image
            alt="reading"
            src={"/reading-dark.png"}
            fill
            className="select-none dark:block hidden object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default Heroes;
