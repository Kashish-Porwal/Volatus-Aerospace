"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Shield, Zap, Globe, CheckCircle } from "lucide-react";
import { useRef } from "react";
import { FlyingDrone } from "@/components/FlyingDrone";

const divisions = [
  {
    title: "Equipment Sales",
    description: "Premium enterprise drones, payloads, and sensors from top manufacturers.",
    icon: Zap,
    href: "/equipment",
    color: "bg-blue-500",
  },
  {
    title: "Aerial Services",
    description: "Professional inspections, mapping, and surveillance solutions.",
    icon: Globe,
    href: "/services",
    color: "bg-indigo-500",
  },
  {
    title: "Training Academy",
    description: "Transport Canada approved pilot certification and advanced training.",
    icon: Shield,
    href: "/academy",
    color: "bg-sky-500",
  },
  {
    title: "Public Safety",
    description: "Specialized solutions for police, fire, and search & rescue operations.",
    icon: CheckCircle,
    href: "/public-safety",
    color: "bg-slate-700",
  },
];

const partners = [
  "DJI Enterprise", "Autel Robotics", "Parrot", "Teledyne FLIR", "Phase One", "Wingtra", "YellowScan", "Pix4D"
];

export default function Home() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <div className="flex flex-col">
      <FlyingDrone />
      {/* Parallax Hero Section */}
      <section ref={containerRef} className="relative h-[95vh] flex items-center justify-center overflow-hidden bg-slate-900">
        <motion.div
          style={{ y, opacity }}
          className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1506947411487-a56738267384?q=80&w=2074&auto=format&fit=crop')] bg-cover bg-center opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/30 via-slate-900/10 to-slate-900" />

        <div className="relative container mx-auto px-4 text-center z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <h1 className="text-5xl md:text-8xl font-bold text-white mb-6 tracking-tight drop-shadow-2xl">
              The Future of <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">Aerial Intelligence</span>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl text-slate-200 max-w-3xl mx-auto mb-12 font-light leading-relaxed"
          >
            Volatus Aerospace provides integrated drone solutions for enterprise, industrial, and defense sectors globally.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-6 justify-center"
          >
            <Link
              href="/services"
              className="px-8 py-4 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700 transition-all hover:scale-105 flex items-center justify-center gap-2 shadow-lg shadow-blue-600/30"
            >
              Explore Services <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/contact"
              className="px-8 py-4 bg-white/10 backdrop-blur-md text-white font-semibold rounded-full hover:bg-white/20 transition-all border border-white/20 hover:border-white/40"
            >
              Contact Sales
            </Link>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/50 flex flex-col items-center gap-2"
        >
          <span className="text-xs uppercase tracking-widest">Scroll</span>
          <div className="w-px h-12 bg-gradient-to-b from-white/50 to-transparent" />
        </motion.div>
      </section>

      {/* Partner Marquee */}
      <section className="py-10 bg-slate-900 border-b border-slate-800 overflow-hidden">
        <div className="flex whitespace-nowrap">
          <motion.div
            animate={{ x: ["0%", "-50%"] }}
            transition={{ repeat: Infinity, ease: "linear", duration: 20 }}
            className="flex gap-16 items-center pr-16"
          >
            {[...partners, ...partners].map((partner, i) => (
              <span key={i} className="text-2xl font-bold text-slate-700 uppercase tracking-widest hover:text-slate-500 transition-colors cursor-default">
                {partner}
              </span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Divisions Grid */}
      <section className="py-32 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold text-slate-900 mb-6"
            >
              Integrated Solutions
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-xl text-slate-600 max-w-2xl mx-auto"
            >
              We combine top-tier hardware, expert services, and comprehensive training to deliver complete aerial solutions.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {divisions.map((division, index) => (
              <motion.div
                key={division.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="group relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-slate-100"
              >
                <div className={`w-16 h-16 ${division.color} rounded-2xl flex items-center justify-center text-white mb-8 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <division.icon className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">{division.title}</h3>
                <p className="text-slate-600 mb-8 leading-relaxed">{division.description}</p>
                <Link href={division.href} className="inline-flex items-center text-blue-600 font-bold group-hover:gap-3 transition-all">
                  Learn more <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats/Trust Section */}
      <section className="py-32 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-30" />
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
            {[
              { label: "Offices Worldwide", value: "30+" },
              { label: "Pilots Network", value: "1200+" },
              { label: "Missions Flown", value: "50k+" },
              { label: "Happy Clients", value: "5000+" },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, type: "spring" }}
              >
                <div className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-blue-400 to-blue-600 mb-4">{stat.value}</div>
                <div className="text-slate-400 font-medium text-lg">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
