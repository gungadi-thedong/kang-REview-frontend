import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="flex flex-col md:flex-row justify-center items-center min-h-screen text-white text-center md:text-center">
      <div className="pl-50 flex flex-col items-start max-w-lg">
        <div className="flex justify-between text-left">
          <h1 className="mt-20 text-6xl md:text-8xl font-extrabold leading-tight">
          Solusi <br /> Gadget <br /> Anda!!
        </h1>
        </div>
        <button className="mt-6 bg-white text-black px-10 py-2 rounded-full hover:bg-black hover:text-white transition ">
          Check disini
        </button>
      </div>

      <div className="mt-5 md:mt-0 flex justify-center">
        <Image
          src="/Asset1.png"
          alt="Phone"
          width={800}
          height={400}
          className="pt-15"
        />
      </div>
    </section>
  );
}
