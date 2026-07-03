import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle } from "lucide-react";
import { Link } from "wouter";

export default function Certifications() {
  const certifications = [
    {
      id: "cpcb",
      name: "CPCB",
      fullName: "Central Pollution Control Board",
      description: "Official certification from India's premier environmental regulatory body, ensuring compliance with national pollution control standards and environmental protection regulations.",
      badge: "✓ Verified",
      icon: "https://chatgpt.com/backend-api/estuary/public_content/enc/eyJpZCI6Im1fNmE0N2YyNTAxM2RjODE5MTgwN2I1YmRlNmMzNzI0ZDA6ZmlsZV8wMDAwMDAwMDljOTg3MWZhOTI1YzM3NDcyYzlhYjI1MSIsImdpem1vX2lkIjpudWxsLCJ0cyI6IjIwNjM3IiwicCI6InB5aSIsImNpZCI6IjEiLCJzaWciOiJiNjZhNGJmNGU5Y2FmNDNhNzhkMmY4MGZhMGZkYmE2MTk3NTEyMzA2MzQ5MDIzMmMyOWI1YTY2OGQ4OGJiMGU4IiwidiI6IjAiLCJjcyI6bnVsbCwiY2RuIjpudWxsLCJmbiI6bnVsbCwiY2QiOm51bGwsImNwIjpudWxsLCJtYSI6bnVsbH0=",
    },
    {
      id: "cipet",
      name: "CIPET",
      fullName: "Central Institute of Plastics Engineering and Technology",
      description: "Recognized certification from India's leading research institute for plastics technology, validating our biodegradable material quality and manufacturing excellence.",
      badge: "✓ Certified",
      icon: "https://res.cloudinary.com/dvmrrn6gg/image/upload/v1783100876/ebefb867bfe64a49b395304afd74db1a_yw19er.jpg",
    },
    {
      id: "swachha",
      name: "Swachha Bharat",
      fullName: "Swachha Bharat Mission",
      description: "Approved under India's national cleanliness mission, confirming our commitment to sustainable waste management and environmental hygiene standards.",
      badge: "✓ Approved",
      icon: "https://res.cloudinary.com/dvmrrn6gg/image/upload/v1783102762/ChatGPT_Image_Jul_3_2026_11_48_41_PM_dar28q.png",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header Section */}
      <section className="bg-gradient-to-br from-green-50 to-white pt-32 pb-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-bold text-green-900 mb-6">Our Certifications</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Bioplast India is proud to be certified by India's leading environmental and quality assurance bodies, ensuring the highest standards of sustainability and excellence.
            </p>
          </div>
        </div>
      </section>

      {/* Certifications Grid */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {certifications.map((cert) => (
              <Card
                key={cert.id}
                className="overflow-hidden border-green-100 hover:border-green-300 hover:shadow-xl transition-all duration-300 hover-scale"
              >
                <div className="bg-gradient-to-br from-green-50 to-green-100 p-12 flex items-center justify-center h-52">
                  <div className="w-32 h-32 bg-white rounded-full p-4 shadow-md border border-green-100 flex items-center justify-center hover:scale-110 transition-transform duration-300">
                    <img
                      src={cert.icon}
                      alt={`${cert.name} Logo`}
                      className="max-w-full max-h-full object-contain"
                      referrerPolicy="no-referrer"
                      loading="lazy"
                    />
                  </div>
                </div>

                <div className="p-8">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-2xl font-bold text-green-900 mb-1">{cert.name}</h3>
                      <p className="text-sm text-gray-600">{cert.fullName}</p>
                    </div>
                    <Badge className="bg-green-600 text-white whitespace-nowrap">{cert.badge}</Badge>
                  </div>

                  <p className="text-gray-700 leading-relaxed">{cert.description}</p>

                  <div className="mt-6 flex items-center gap-2 text-green-600 font-semibold">
                    <CheckCircle className="w-5 h-5" />
                    <span>Officially Recognized</span>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Certification Benefits */}
          <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-12 mt-16">
            <h2 className="text-3xl font-bold text-green-900 mb-8 text-center">What Our Certifications Mean</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-full bg-green-600 text-white font-bold">
                    ✓
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-green-900 mb-2">Environmental Compliance</h3>
                  <p className="text-gray-700">
                    Our products meet all national environmental standards and regulations, ensuring minimal ecological impact.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-full bg-green-600 text-white font-bold">
                    ✓
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-green-900 mb-2">Quality Assurance</h3>
                  <p className="text-gray-700">
                    Rigorous testing and validation by leading research institutions guarantee superior product quality and performance.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-full bg-green-600 text-white font-bold">
                    ✓
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-green-900 mb-2">Sustainable Practices</h3>
                  <p className="text-gray-700">
                    Our manufacturing processes align with India's Swachha Bharat mission and global sustainability goals.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-full bg-green-600 text-white font-bold">
                    ✓
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-green-900 mb-2">Customer Confidence</h3>
                  <p className="text-gray-700">
                    Independent certifications provide transparency and build trust with our customers and business partners.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="mt-16 text-center">
            <h3 className="text-2xl font-bold text-green-900 mb-4">Ready to Partner with Certified Excellence?</h3>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              Join businesses across India that trust Bioplast India for sustainable, certified, and high-quality biodegradable packaging solutions.
            </p>
            <Link href="/contact">
              <span className="inline-block bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 cursor-pointer">
                Get in Touch
              </span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
