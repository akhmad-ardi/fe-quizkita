"use client";

import { Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

import { isAuth as IsAuth } from "@/server/is-auth";

import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Home() {
  const [activeSection, setActiveSection] = React.useState("home");
  const [isScrolled, setIsScrolled] = React.useState(false);

  const [isAuth, setIsAuth] = React.useState<boolean>(false);

  React.useEffect(() => {
    (async () => {
      const { is_auth } = await IsAuth();

      setIsAuth(is_auth);
    })();

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

  React.useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
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
        className={`fixed z-50 flex w-full items-center justify-between px-1 transition-all duration-300 md:px-16 ${
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

        <div className="me-5 md:me-10">
          <DropdownMenu>
            <DropdownMenuTrigger className="flex md:hidden">
              <Menu size={40} className="text-primary" />
            </DropdownMenuTrigger>

            <DropdownMenuContent className="py-3">
              <DropdownMenuItem
                className={`text-xl transition ${
                  activeSection === "home" ? "font-bold" : ""
                }`}
                asChild
              >
                <Link href="#home">Home</Link>
              </DropdownMenuItem>
              <DropdownMenuItem
                className={`text-xl transition ${
                  activeSection === "features" ? "font-bold" : ""
                }`}
                asChild
              >
                <Link href="#features">Features</Link>
              </DropdownMenuItem>
              {isAuth ? (
                <DropdownMenuItem className="mt-3" asChild>
                  <Button className="rounded-full px-10 py-4 text-2xl" asChild>
                    <Link href="/dashboard">Dashboard</Link>
                  </Button>
                </DropdownMenuItem>
              ) : (
                <DropdownMenuItem className="mt-3" asChild>
                  <Button className="rounded-full px-10 py-4 text-2xl" asChild>
                    <Link href="/auth/sign-in">Sign In</Link>
                  </Button>
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>

          <ul className="text-primary hidden items-center gap-8 md:flex">
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
              {isAuth ? (
                <Button className="rounded-full px-10 py-4 text-2xl" asChild>
                  <Link href="/dashboard">Dashboard</Link>
                </Button>
              ) : (
                <Button className="rounded-full px-10 py-4 text-2xl" asChild>
                  <Link href="/auth/sign-in">Sign In</Link>
                </Button>
              )}
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
          <h1 className="w-full text-center text-3xl md:text-7xl">
            Buat <span className="text-primary font-bold">Kuis</span> Otomatis
            dari <br /> Materi Belajar
          </h1>

          <div className="mt-10 text-center">
            {isAuth ? (
              <Button
                className="me-5 rounded-full px-10 py-5 text-xl md:px-14 md:py-7"
                asChild
              >
                <Link href="/dashboard">Dashboard</Link>
              </Button>
            ) : (
              <>
                <Button
                  className="me-5 rounded-full px-10 py-5 text-xl md:px-14 md:py-7"
                  asChild
                >
                  <Link href="/auth/sign-in">Sign In</Link>
                </Button>

                <Button
                  className="text-primary border-primary hover:text-primary-foreground rounded-full bg-transparent px-10 py-5 text-xl md:px-14 md:py-7"
                  variant="outline"
                  asChild
                >
                  <Link href="/auth/sign-up">Sign Up</Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </section>

      <section
        id="features"
        className="container mx-auto flex min-h-screen flex-col items-center justify-center px-16 py-10 md:py-0"
      >
        <h3 className="mb-10 text-center text-3xl">Features</h3>

        <div className="flex flex-col gap-5 md:flex-row">
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
