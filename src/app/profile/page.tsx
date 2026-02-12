import { HeroProfile, VisiMision, TalentBuilding, IndustrySolutions, CTA } from '@/components';

export default function ProfilePage() {
  return (
    <main className="min-h-screen bg-white">
      <HeroProfile 
        title="ArutalaLab"
        subtitle="Transformasi Karir dan Solusi Digital Berkualitas"
        description="Menghadirkan revolusi pendidikan dan solusi teknologi, ArutalaLab adalah wujud dari visi kami untuk mengubah wajah industri IT. Dibangun pada tahun 2022, kami berkomitmen untuk mencetak profesional IT masa depan, memberikan layanan Manpower terbaik, dan software services yang berkualitas."
        imageSrc="/src/profile/hero-classroom.jpg"
      />

      <VisiMision 
        title="Visi & Misi"
        vision={{
          title: "Mendorong percepatan peningkatan kualitas SDM IT untuk menyongsong Indonesia Emas 2045.",
          description: ""
        }}
        missions={[
          { text: "Mewujudkan mimpi menjadi bagian dalam pengembangan IT melalui pelatihan IT." },
          { text: "Menjadi pilihan utama dalam penyediaan IT resource melalui layanan head hunting dan outsource." },
          { text: "Menjadi mitra tepercaya dalam mendukung penyediaan software bagi industri dan" }
        ]}
        imageSrc="/src/profile/visi-mission.jpg"
      />

      <TalentBuilding 
        title="Bangun Talenta Bersama ArutalaLab"
        description="ArutalaLab menyelenggarakan pelatihan IT yang berkualitas melalui bootcamp, kelas online/offline, workshop, dan webinar untuk meningkatkan kompetensi digital individu maupun kalangan industri."
        images={[
          "/src/profile/galeri-1.png",
          "/src/profile/galeri-2.png",
          "/src/profile/galeri-3.png",
          "/src/profile/galeri-4.png",
          "/src/profile/galeri-5.png",
          "/src/profile/MG_8819.jpg",
          "/src/profile/MG_9227.jpg"
        ]}
      />

      <IndustrySolutions 
        mainTitle="Solusi untuk semua Industri"
        tabs={[
          {
            id: "education",
            label: "IT Education",
            title: "Solusi Bagi Fresh Graduated",
            description: "Kami menyediakan program pendidikan dan pelatihan IT yang dirancang khusus untuk fresh graduate agar siap terjun ke dunia kerja. Materi disusun sesuai kebutuhan industri, dilengkapi dengan pembelajaran praktis untuk meningkatkan skill teknis dan profesional.",
            imageSrc: "/src/profile/it-edu.png"
          },
          {
            id: "resource",
            label: "Resource",
            title: "Solusi Headhunting dan Outsource IT Profesional",
            description: "Kami membantu perusahaan menyediakan talenta IT profesional yang tepat melalui layanan headhunting dan outsourcing. Proses seleksi dilakukan secara terstruktur dan efisien untuk memastikan kandidat sesuai dengan kebutuhan teknis maupun budaya perusahaan.",
            imageSrc: "/src/profile/resource.png"
          },
          {
            id: "software",
            label: "Software Services",
            title: "Solusi Bagi Kebutuhan Perangkat Lunak",
            description: "Kami menyediakan layanan pengembangan perangkat lunak yang sesuai dengan kebutuhan bisnis Anda. Mulai dari perencanaan, pengembangan, hingga pemeliharaan sistem, kami memastikan solusi software yang scalable, aman, dan efektif untuk mendukung operasional perusahaan dengan dokumentasi yang baik.",
            imageSrc: "/src/profile/software-service.png"
          }
        ]}
      />
      <CTA />
    </main>
  );
}