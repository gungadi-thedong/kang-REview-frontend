import Image from "next/image";

const products = [
  {
    img: "/Asset3.png",
    title: "Smartphone",
    desc: "jika kamu mencari rekomendasi mengenai smartphone klik disini!",
  },
  {
    img: "/Asset5.png",
    title: "Laptop",
    desc: "jika kamu mencari rekomendasi mengenai laptop klik disini!",
  },
  {
    img: "/Asset4.png",
    title: "Part PC",
    desc: "jika kamu mencari rekomendasi mengenai PC untuk produktifitasmu klik disini!",
  },
  {
    img: "/Asset2.png",
    title: "Screen Monitor",
    desc: "jika kamu mencari rekomendasi mengenai screen monitor yang bagus klik disini!",
  },
];

export default function ProductSection() {
  return (
    <section
      id="product"
      className="min-h-screen flex items-center justify-center py-8 px-2 text-white"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 max-w-7xl">
        {products.map((p, i) => (
          <div key={i} className="flex flex-col items-start">
            {/* Kotak putih persegi */}
            <div className="bg-white rounded-2xl shadow-lg flex justify-center items-center w-64 aspect-square transition-transform duration-300 hover:scale-105 mx-auto">
              <Image
                src={p.img}
                alt={p.title}
                width={190}
                height={180}
                className="object-contain"
              />
            </div>

            <div className="mt-4">
              <h3 className="text-base font-semibold">{p.title}</h3>
              <p className="text-sm text-gray-300 max-w-[220px] leading-relaxed mt-3">
                {p.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
