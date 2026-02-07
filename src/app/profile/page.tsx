import { HeroProfile, VisiMision } from '@/components';

export default function ProfilePage() {
  return (
    <main className="min-h-screen bg-white">
      <HeroProfile 
        title="ArutalaLab"
        subtitle="Transformasi Karir dan Solusi Digital Berkualitas"
        description="Menghadirkan revolusi pendidikan dan solusi teknologi, ArutalaLab adalah wujud dari visi kami untuk mengubah wajah industri IT. Dibangun pada tahun 2022, kami berkomitmen untuk mencetak profesional IT masa depan, memberikan layanan Manpower terbaik, dan software services yang berkualitas."
        imageSrc="/src/hero-classroom.png"
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
        imageSrc="/src/visi-mission.png"
      />
    </main>
  );
}