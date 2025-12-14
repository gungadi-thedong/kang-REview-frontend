
"use client";

interface SpecTableProps {
  category: string;
  image?: string;
}

export default function SpecTable({ category, image }: SpecTableProps) {
  // 🧠 Data spesifikasi per kategori
  const specsData: Record<string, { label: string; value: string }[]> = {
    Laptop: [
      { label: "Prosesor (CPU)", value: "Intel Core i7-13700H" },
      { label: "Kartu Grafis (GPU)", value: "NVIDIA RTX 4060 8GB" },
      { label: "RAM", value: "16GB DDR5 5200MHz" },
      { label: "Penyimpanan", value: "512GB SSD NVMe" },
      { label: "Layar", value: '15.6" FHD 144Hz IPS' },
      { label: "Sistem Operasi", value: "Windows 11 Home" },
      { label: "Baterai", value: "56Wh, hingga 10 jam" },
      { label: "Konektivitas", value: "Wi-Fi 6E, Bluetooth 5.3" },
    ],

    Handphone: [
      { label: "Chipset", value: "Snapdragon 8 Gen 2" },
      { label: "RAM & Storage", value: "12GB RAM, 256GB ROM (UFS 4.0)" },
      { label: "Layar", value: '6.7" AMOLED 120Hz HDR10+' },
      { label: "Kamera", value: "50MP utama (OIS), 12MP ultrawide, 10MP tele" },
      { label: "Baterai & Charging", value: "5000mAh, Fast Charging 45W" },
      { label: "Sistem Operasi", value: "Android 14, OneUI 6.1" },
      { label: "Konektivitas", value: "5G, Wi-Fi 6, NFC, Bluetooth 5.3" },
      { label: "Material", value: "Aluminium frame, Gorilla Glass Victus 2" },
    ],

    Motherboard: [
      { label: "Chipset", value: "B660" },
      { label: "Socket CPU", value: "LGA 1700" },
      { label: "Form Factor", value: "ATX" },
      { label: "Memory Support", value: "DDR4 128GB (4 slot)" },
      { label: "Storage Slots", value: "2× M.2 NVMe, 4× SATA" },
      { label: "PCIe Support", value: "PCIe 5.0 x16" },
      { label: "Networking", value: "2.5G LAN, Wi-Fi 6E" },
      { label: "I/O Ports", value: "USB-C, HDMI, Audio Jack" },
    ],

    GPU: [
      { label: "GPU Chip", value: "NVIDIA RTX 4070" },
      { label: "VRAM", value: "12GB GDDR6X" },
      { label: "Clock Speed", value: "Boost 2500 MHz" },
      { label: "Memory Bus", value: "192-bit, 504 GB/s" },
      { label: "TDP", value: "200W" },
      { label: "Output Ports", value: "HDMI 2.1, DisplayPort 1.4a" },
      { label: "Tech Support", value: "DLSS 3, Ray Tracing" },
    ],

    Processor: [
      { label: "Model", value: "Intel Core i7-13700K (13th Gen)" },
      { label: "Core / Thread", value: "16 Core / 24 Thread" },
      { label: "Base Clock", value: "3.4GHz" },
      { label: "Boost Clock", value: "5.4GHz" },
      { label: "Cache", value: "30MB L3" },
      { label: "Socket", value: "LGA 1700" },
      { label: "TDP", value: "125W" },
      { label: "Integrated GPU", value: "Intel UHD 770" },
    ],
  };

  const specs = specsData[category] || [];

  return (
    <section className="w-full bg-[#0b1623] text-white py-10 px-6 md:px-12 flex justify-center">
      <div className="w-full max-w-5xl flex flex-col md:flex-row justify-between items-start gap-10">
        {/* Kolom kiri: tabel */}
        <div className="w-full md:w-2/3">
          <h2 className="text-xl font-semibold mb-3 border-b border-gray-500 pb-1">
            Spesifikasi
          </h2>

          <table className="w-full border-separate border-spacing-y-2">
            <tbody>
              {specs.map((item, index) => (
                <tr
                  key={index}
                  className={`rounded-lg ${
                    index % 2 === 0 ? "bg-[#1a2233]" : "bg-[#111a29]"
                  }`}
                >
                  <td className="py-3 px-4 text-gray-300 w-1/3 rounded-l-lg">
                    {item.label}
                  </td>
                  <td className="py-3 px-4 text-gray-100 rounded-r-lg">
                    {item.value}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Kolom kanan: gambar */}
       {/* Bagian kanan: gambar produk */}
<div className="w-full md:w-1/3 flex justify-center items-center">
  <img
    src={image || "../Asset1.png"}
    alt={`${category} image`}
    className="rounded-2xl w-80 h-56 object-cover shadow-xl border border-gray-700"
  />
</div>


      </div>
    </section>
  );
}
