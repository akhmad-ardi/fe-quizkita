"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

// component
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function Home() {
  const [activeSection, setActiveSection] = React.useState("home");
  const [isScrolled, setIsScrolled] = React.useState(false);

  React.useEffect(() => {
    const sections = document.querySelectorAll("section");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id); // id section dipakai untuk penanda
          }
        });
      },
      { threshold: 0.6 } // 60% terlihat baru dianggap aktif
    );

    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  const Features = [
    {
      icon: "✍️",
      title: "Input Materi",
      content:
        "Cukup templekan artikel, ringkasan pelajaran, atau unggah dokumen. QuizKita akan membaca dan memahami isi materi secara otomatis.",
    },
    {
      icon: "🎯",
      title: "Hasil Kuis",
      content:
        "Dalam hitungan detik, QuizKita menghasilkan soal pilihan ganda lengkap dengan jawaban benar dan penjelsan singkat yang mudah dipahami.",
    },
    {
      icon: "📊",
      title: "Belajar Cepat &  Ujian Instan",
      content:
        "Gunakan kuis yang dihasilkan untuk latihan mandiri, ujian cepat di kelas, atau bahan diskusi interaktif bersama teman dan guru.",
    },
  ];

  return (
    <>
      <header
        className={`fixed z-50 flex w-full items-center justify-between px-16 transition-all duration-300 ${
          isScrolled
            ? "bg-white/90 py-3 shadow-md backdrop-blur-md"
            : "bg-transparent py-6"
        }`}
      >
        <div>
          <Image
            src="/QuizKita_logo.png"
            width={230}
            height={110}
            alt="QuizKita Logo"
            className="h-[80px] w-[180px] rounded-lg object-cover transition-all duration-300"
            priority
          />
        </div>

        <div className="me-10">
          <ul className="text-primary flex items-center gap-8">
            <li>
              <Link
                href="#home"
                className={`text-2xl transition ${
                  activeSection === "home" ? "font-bold" : ""
                }`}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="#features"
                className={`text-2xl transition ${
                  activeSection === "features" ? "font-bold" : ""
                }`}
              >
                Features
              </Link>
            </li>
            <li>
              <Button className="rounded-full px-10 py-4 text-2xl" asChild>
                <Link href="">Sign In</Link>
              </Button>
            </li>
          </ul>
        </div>
      </header>

      <section
        id="home"
        className="text-primary-foreground relative flex min-h-screen items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: "url('/QuizKita_bg.jpg')" }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/50"></div>

        {/* Konten */}
        <div className="relative z-10 container mx-auto mt-20">
          <h1 className="w-full text-center text-7xl">
            Buat <span className="text-primary font-bold">Kuis</span> Otomatis
            dari <br /> Materi Belajar
          </h1>

          <div className="mt-10 text-center">
            <Button className="me-5 rounded-full px-14 py-7 text-2xl" asChild>
              <Link href="">Sign In</Link>
            </Button>

            <Button
              className="text-primary border-primary hover:text-primary-foreground rounded-full bg-transparent px-14 py-7 text-2xl"
              variant="outline"
              asChild
            >
              <Link href="">Sign Up</Link>
            </Button>
          </div>
        </div>
      </section>

      <section
        id="features"
        className="container mx-auto flex min-h-screen flex-col items-center justify-center px-16"
      >
        <h3 className="mb-10 text-center text-3xl">Features</h3>

        <div className="flex gap-5">
          {Features.map((feature, index) => (
            <Card className="gap-2 border-2 border-black" key={index}>
              <CardHeader>
                <CardTitle className="mb-2 text-3xl">{feature.icon}</CardTitle>

                <CardTitle>{feature.title}</CardTitle>
              </CardHeader>

              <CardContent>
                <p>{feature.content}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <footer className="bg-primary text-primary-foreground py-10">
        <p className="text-center">
          &copy; 2025 <span className="font-bold">Akhmad Ardiansyah Amnur</span>
        </p>
      </footer>
    </>
  );
}
