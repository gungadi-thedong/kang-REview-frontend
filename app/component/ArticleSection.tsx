import Image from "next/image";

const articles = [
  {
    img: "/Asset8.jpg",
    title: "Apakah iPhone worth dibeli pada tahun 2025?!",
  },
  {
    img: "/Asset9.jpg",
    title: "Kenalan dengan Vivo premium terbaru di tahun 2024",
  },
  {
    img: "/Asset7.jpeg",
    title: "Macbook Air Pro pilihan yang bijak atau tidak?",
  },
];

export default function ArticleSection() {
  return (
    <section
      id="review"
      className="py-16 flex justify-center items-center bg-dark"  // ⬅️ ubah baris ini
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-9 max-w-8xl w-full px-10">
        {articles.map((a, i) => (
          <div
            key={i}
            className="bg-[#0f1926] rounded-1xl overflow-hidden shadow-lg transition-transform duration-300 hover:scale-105 w-full aspect-square flex flex-col"
          >
            <Image
              src={a.img}
              alt={a.title}
              width={400}
              height={400}
              className="w-full h-3/5 object-cover"
            />
            <div className="flex-grow p-4 text-left md:text-3xl font-semibold text-white">
              {a.title}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
