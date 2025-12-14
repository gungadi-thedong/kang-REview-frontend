import Image from "next/image";

export default function AboutSection() {
  return (
    <section className="bg-[#0c1424] py-10 px-6 flex justify-center items-center">
      <div className="bg-white shadow-lg flex justify-center items-center w-full h-80 sm:h-56 md:h-60 lg:h-64 mx-auto">
        {/* Gambar kiri */}
        <div className="flex-1 flex justify-center mb-8 md:mb-0">
          <Image
            src="/Asset6.png" // ubah ke path gambarmu
            alt="Laptop"
            width={400}
            height={250}
            className="object-contain"
          />
        </div>

        {/* Konten kanan */}
        <div className="flex-1 text-center md:text-left mx">
          <h2 className="mb-7 text-4xl font-extrabold text-black mb-">
            Tentang Kami
          </h2>
          <p className="text-black leading-relaxed max-w-md mx-auto md:mx-0 text-sm md:text-base">
            “Kami hadir untuk jadi teman kamu dalam dunia teknologi,
            memberikan review gadget yang jujur, simple, dan gampang dipahami
            supaya kamu nggak salah pilih saat beli perangkat impian.”
          </p>
        </div>
      </div>
    </section>
  );
}
