import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

// This is a mock data source. In a real app, this would come from a CMS or API.
const divisions: Record<string, { title: string; description: string; content: string }> = {
  equipment: {
    title: "Equipment Sales",
    description: "Premium enterprise drones and payloads.",
    content: "We offer a wide range of enterprise-grade drones from leading manufacturers including DJI Enterprise, Autel Robotics, and Parrot. Our inventory includes thermal cameras, LiDAR sensors, and multispectral payloads for specialized applications.",
  },
  services: {
    title: "Aerial Services",
    description: "Professional drone services for any industry.",
    content: "Our network of certified pilots delivers high-quality data for inspections, mapping, surveying, and creative media. We specialize in complex operations including BVLOS (Beyond Visual Line of Sight) and night operations.",
  },
  academy: {
    title: "Training Academy",
    description: "Transport Canada approved pilot training.",
    content: "Get certified with our comprehensive drone pilot training programs. We offer Basic and Advanced RPAS certification, flight reviews, and specialized courses for thermal imaging and photogrammetry.",
  },
  investors: {
    title: "Investor Relations",
    description: "Financial information and news.",
    content: "Volatus Aerospace is a publicly traded company. Here you can find our latest financial reports, press releases, and stock information.",
  },
  industries: {
    title: "Industries Served",
    description: "Tailored solutions for your sector.",
    content: "From oil & gas to agriculture, public safety to construction, we have specialized solutions designed to meet the unique challenges of your industry.",
  },
  about: {
    title: "About Us",
    description: "Who we are and what we do.",
    content: "Volatus Aerospace is a leading provider of integrated drone solutions. We are dedicated to driving the adoption of drone technology across various sectors to improve safety, efficiency, and data quality.",
  },
  "public-safety": {
    title: "Public Safety",
    description: "Supporting first responders.",
    content: "We provide critical aerial support for police, fire, and search & rescue teams. Our tactical drones and thermal imaging capabilities help save lives and protect communities.",
  },
};

export function generateStaticParams() {
  return Object.keys(divisions).map((division) => ({
    division,
  }));
}

export default async function DivisionPage({ params }: { params: Promise<{ division: string }> }) {
  const { division: divisionSlug } = await params;
  const division = divisions[divisionSlug];

  if (!division) {
    // For demo purposes, we'll show a generic fallback for unknown routes
    // instead of a hard 404, to make the demo feel more "complete".
    return (
      <div className="container mx-auto px-4 py-20">
        <Link href="/" className="inline-flex items-center text-slate-500 hover:text-blue-600 mb-8">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Home
        </Link>
        <h1 className="text-4xl font-bold text-slate-900 mb-4 capitalize">{divisionSlug.replace("-", " ")}</h1>
        <p className="text-xl text-slate-600 mb-8">
          This is a placeholder page for the {divisionSlug} section.
        </p>
        <div className="p-8 bg-slate-50 rounded-2xl border border-slate-100">
          <p className="text-slate-500">Content coming soon...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header Section */}
      <div className="bg-slate-900 py-20 text-white">
        <div className="container mx-auto px-4">
          <Link href="/" className="inline-flex items-center text-slate-400 hover:text-white mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Home
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{division.title}</h1>
          <p className="text-xl text-slate-300 max-w-2xl">{division.description}</p>
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl">
          <p className="text-lg text-slate-700 leading-relaxed mb-8">
            {division.content}
          </p>
          <div className="h-64 bg-slate-100 rounded-xl flex items-center justify-center text-slate-400">
            Placeholder Image / Content Area
          </div>
        </div>
      </div>
    </div>
  );
}
