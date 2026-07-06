import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Leaf, Package, Truck, Award } from "lucide-react";
import { useState, useEffect } from "react";
import ProductImageCarousel from "@/components/ProductImageCarousel";
const logoImg = "https://res.cloudinary.com/dvmrrn6gg/image/upload/f_auto,q_auto/v1783093256/Bioplast-India.b15aed0e23e6240fc2c1_ytxiku.png";

const WHATSAPP_NUMBER = "919112224123";
const WHATSAPP_MESSAGE = "Hi! I'm interested in your biodegradable bags for purchase.";

export default function Home() {
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null);

  useEffect(() => {
    // Scroll to #products if the URL has it on mount/page load
    if (window.location.hash === "#products") {
      const el = document.getElementById("products");
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    }
  }, []);

  const products = [
    {
      id: "grocery",
      name: "Grocery Bags",
      description: "U and W cut bags perfect for grocery shops, sweet shops, and retail stores with thin margins.",
      sizes: "8×10 to 27×30 inches",
      thickness: "Customizable thickness",
      icon: Package,
      images: [
        "https://res.cloudinary.com/dvmrrn6gg/image/upload/v1783018599/ChatGPT_Image_Jul_2_2026_09_43_51_PM_lfqmha.png",
        "https://res.cloudinary.com/dvmrrn6gg/image/upload/v1783018592/ChatGPT_Image_Jul_2_2026_09_47_36_PM_jbo6jw.png",
      ],
    },
    {
      id: "carry",
      name: "Carry Bags",
      description: "Biodegradable carry bags ideal for clothing boutiques, stationery shops, and fashion retailers.",
      sizes: "8×12 to 16×24 inches",
      thickness: "Eco-friendly material",
      icon: Truck,
      images: [
        "https://res.cloudinary.com/dvmrrn6gg/image/upload/v1783018609/ChatGPT_Image_Jul_2_2026_09_53_37_PM_gsrcjy.png",
        "https://res.cloudinary.com/dvmrrn6gg/image/upload/v1783018592/ChatGPT_Image_Jul_2_2026_09_53_50_PM_iynsg7.png",
      ],
    },
    {
      id: "garbage",
      name: "Garbage Bags",
      description: "Heavy-duty biodegradable garbage bags designed for waste management and environmental care.",
      sizes: "17×19 to 35×45 inches",
      thickness: "Durable and reliable",
      icon: Award,
      images: [
        "https://res.cloudinary.com/dvmrrn6gg/image/upload/v1783018599/ChatGPT_Image_Jul_2_2026_09_58_10_PM_q7tdj2.png",
        "https://res.cloudinary.com/dvmrrn6gg/image/upload/v1783018599/ChatGPT_Image_Jul_2_2026_09_58_25_PM_jkqgnk.png",
      ],
    },
    {
      id: "pouch",
      name: "Pouches",
      description: "Sambar and specialty pouches in multiple sizes: 4x5, 5x7, 6x8, 8x10, 10x12, and custom dimensions.",
      sizes: "4x5 to 10x12 inches",
      thickness: "Premium quality",
      icon: Leaf,
      images: [
        "https://res.cloudinary.com/dvmrrn6gg/image/upload/v1783018600/ChatGPT_Image_Jul_2_2026_10_07_51_PM_y5y0mx.png",
        "https://res.cloudinary.com/dvmrrn6gg/image/upload/v1783018602/ChatGPT_Image_Jul_2_2026_10_08_05_PM_qcwunx.png",
      ],
    },
  ];

  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

  const getGenerativeFillUrl = (url: string) => {
    if (url.includes("cloudinary.com")) {
      if (!url.includes("c_pad")) {
        return url.replace("/image/upload/", "/image/upload/c_pad,w_322,h_241,b_gen_fill,f_auto,q_auto/");
      } else if (!url.includes("f_auto")) {
        return url.replace("/image/upload/", "/image/upload/f_auto,q_auto/");
      }
    }
    return url;
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative flex items-center justify-center overflow-hidden bg-gradient-to-br from-green-50 via-white to-green-50 pt-20 pb-16">
        {/* Decorative background elements */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-green-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-green-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
        <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-green-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>

        <div className="relative z-10 container mx-auto px-4 py-12 text-center">
          <div className="animate-slide-up">
            {/* Logo/Icon */}
            <div className="flex justify-center mb-6">
              <img
                src={logoImg}
                alt="Bioplast India Logo"
                className="w-24 h-24 object-contain drop-shadow-lg hover:scale-110 transition-transform duration-300"
              />
            </div>

            {/* Headline */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-green-900 mb-4 leading-tight">
              Bioplast <span className="text-green-600">India</span>
            </h1>

            {/* Tagline */}
            <p className="text-xl md:text-2xl text-green-700 mb-6 font-medium max-w-3xl mx-auto">
              Leading supplier of 100% biodegradable bags since 2023
            </p>

            {/* Description */}
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Committed to sustainability and environmental responsibility. Our premium biodegradable packaging solutions are designed for businesses that care about the planet.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                <Button
                  size="lg"
                  className="bg-green-600 hover:bg-green-700 text-white px-8 py-6 text-lg rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Chat on WhatsApp
                </Button>
              </a>
              <Button
                size="lg"
                variant="outline"
                className="border-green-600 text-green-600 hover:bg-green-50 px-8 py-6 text-lg rounded-lg"
                onClick={() => {
                  const el = document.getElementById("products");
                  if (el) {
                    el.scrollIntoView({ behavior: "smooth" });
                  }
                }}
              >
                Explore Products
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-green-900 mb-4">Our Featured Products</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              All products are made with 100% biodegradable material, available in different sizes and thicknesses tailored to your needs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => {
              const IconComponent = product.icon;
              return (
                <Card
                  key={product.id}
                  className="overflow-hidden hover-scale border-green-100 hover:border-green-300 hover:shadow-lg transition-all duration-300"
                  onMouseEnter={() => setHoveredProduct(product.id)}
                  onMouseLeave={() => setHoveredProduct(null)}
                >
                  <div className="p-4">
                    {product.images && product.images.length > 0 ? (
                      <ProductImageCarousel images={product.images.map(getGenerativeFillUrl)} alt={product.name} />
                    ) : (
                      <div className="bg-gradient-to-br from-green-50 to-green-100 p-8 flex items-center justify-center min-h-48 rounded-lg">
                        <IconComponent className={`w-24 h-24 text-green-600 transition-transform duration-300 ${hoveredProduct === product.id ? "scale-110" : ""}`} />
                      </div>
                    )}
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-bold text-green-900 mb-3">{product.name}</h3>
                    <p className="text-gray-600 text-sm mb-4">{product.description}</p>

                    <div className="space-y-2 mb-6">
                      <div className="flex items-start gap-2">
                        <span className="text-green-600 font-semibold text-sm">Sizes:</span>
                        <span className="text-gray-700 text-sm">{product.sizes}</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="text-green-600 font-semibold text-sm">Material:</span>
                        <span className="text-gray-700 text-sm">{product.thickness}</span>
                      </div>
                    </div>

                    <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                      <Button className="w-full bg-green-600 hover:bg-green-700 text-white rounded-lg">
                        Inquire Now
                      </Button>
                    </a>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-gradient-to-br from-green-50 to-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-slide-up">
              <h2 className="text-4xl md:text-5xl font-bold text-green-900 mb-6">About Bioplast India</h2>

              <p className="text-lg text-gray-700 mb-6">
                Founded in 2023, Bioplast India emerged from a vision to revolutionize the packaging industry through sustainable, eco-friendly solutions. Based in Ayodhya, Uttar Pradesh, we are dedicated to providing 100% biodegradable bags that don't compromise on quality or durability.
              </p>

              <p className="text-lg text-gray-700 mb-6">
                Our mission is simple yet powerful: to reduce plastic waste and environmental pollution by offering premium biodegradable alternatives to conventional packaging. Every product we create reflects our commitment to the planet and future generations.
              </p>

              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-green-600 text-white">
                      <Leaf className="h-6 w-6" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-green-900">100% Biodegradable</h3>
                    <p className="text-gray-600">All our products decompose naturally without harming the environment.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-green-600 text-white">
                      <Award className="h-6 w-6" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-green-900">Certified Quality</h3>
                    <p className="text-gray-600">Approved by CPCB, CIPET, and Swachha Bharat for reliability and standards.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-green-600 text-white">
                      <Package className="h-6 w-6" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-green-900">Custom Solutions</h3>
                    <p className="text-gray-600">Tailored packaging options to meet your specific business requirements.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-green-400 to-green-600 rounded-2xl transform rotate-3 opacity-10"></div>
              <div className="relative bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-12 shadow-xl">
                <div className="space-y-8">
                  <div className="text-center">
                    <div className="text-5xl font-bold text-green-600 mb-2">2023</div>
                    <p className="text-gray-700 font-semibold">Year Founded</p>
                  </div>

                  <div className="text-center">
                    <div className="text-5xl font-bold text-green-600 mb-2">100%</div>
                    <p className="text-gray-700 font-semibold">Biodegradable Materials</p>
                  </div>

                  <div className="text-center">
                    <div className="text-5xl font-bold text-green-600 mb-2">3</div>
                    <p className="text-gray-700 font-semibold">Major Certifications</p>
                  </div>

                  <div className="text-center">
                    <div className="text-5xl font-bold text-green-600 mb-2">∞</div>
                    <p className="text-gray-700 font-semibold">Commitment to Sustainability</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-green-900 mb-12 text-center">Why Choose Bioplast India?</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-green-100 hover:border-green-300 hover:shadow-lg transition-all p-8">
              <div className="text-4xl mb-4">♻️</div>
              <h3 className="text-2xl font-bold text-green-900 mb-3">Eco-Friendly</h3>
              <p className="text-gray-600">
                Our products are completely biodegradable and leave no harmful residue, protecting our planet for future generations.
              </p>
            </Card>

            <Card className="border-green-100 hover:border-green-300 hover:shadow-lg transition-all p-8">
              <div className="text-4xl mb-4">✓</div>
              <h3 className="text-2xl font-bold text-green-900 mb-3">Certified Quality</h3>
              <p className="text-gray-600">
                Approved by leading environmental and quality certification bodies, ensuring reliability and compliance with standards.
              </p>
            </Card>

            <Card className="border-green-100 hover:border-green-300 hover:shadow-lg transition-all p-8">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="text-2xl font-bold text-green-900 mb-3">Custom Solutions</h3>
              <p className="text-gray-600">
                We offer personalized packaging solutions tailored to your business needs, from sizes to thickness and specifications.
              </p>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
