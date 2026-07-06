import React, { useState, useEffect, useRef } from "react";
import { MapPin } from "lucide-react";

export default function CPCBCertificate() {
  const [scale, setScale] = useState(1);
  const [height, setHeight] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current && innerRef.current) {
        const containerWidth = containerRef.current.clientWidth;
        const targetWidth = 800; // Fixed target width of the legal document
        const currentScale = containerWidth < targetWidth ? containerWidth / targetWidth : 1;
        
        setScale(currentScale);
        setHeight(innerRef.current.offsetHeight * currentScale);
      }
    };

    handleResize();

    // Setup ResizeObserver to watch both container size and inner document height changes
    const observer = new ResizeObserver(() => {
      handleResize();
    });

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    if (innerRef.current) {
      observer.observe(innerRef.current);
    }

    window.addEventListener("resize", handleResize);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <section id="cpcb-certificate" className="py-12 bg-white border-y border-stone-200">
      <div className="max-w-4xl mx-auto px-4" ref={containerRef}>
        {/* Scaled wrapper container to preserve page flow naturally without scrollbars */}
        <div 
          className="relative w-full overflow-hidden" 
          style={{ height: height !== null ? `${height}px` : "auto" }}
        >
          {/* The actual fixed-width non-responsive document */}
          <div 
            ref={innerRef}
            className="w-[800px] bg-white border border-stone-400 p-12 text-black font-serif text-sm leading-relaxed absolute top-0 left-1/2 -translate-x-1/2 origin-top shrink-0"
            style={{ transform: `scale(${scale})` }}
          >
            
            {/* Header: Central Pollution Control Board */}
            <div className="text-center border-b-2 border-black pb-4 mb-6">
              <div className="text-lg font-bold uppercase tracking-wider">
                केन्द्रीय प्रदूषण नियंत्रण बोर्ड
              </div>
              <div className="text-xl font-extrabold uppercase tracking-widest my-1">
                CENTRAL POLLUTION CONTROL BOARD
              </div>
              <div className="text-xs font-medium">
                (पर्यावरण, वन एवं जलवायु परिवर्तन मंत्रालय, भारत सरकार)
              </div>
              <div className="text-xs font-bold uppercase tracking-wider">
                (MINISTRY OF ENVIRONMENT, FOREST & CLIMATE CHANGE, GOVT. OF INDIA)
              </div>
              <div className="text-xs mt-2 font-sans font-semibold">
                'परिवेश भवन' पूर्वी अर्जुन नगर, दिल्ली-110032 / Parivesh Bhawan, East Arjun Nagar, Delhi-110032
              </div>
            </div>

            {/* Certificate Metadata */}
            <div className="flex justify-between items-center border-b border-stone-300 pb-3 mb-6 font-sans text-xs font-bold">
              <div>
                Certificate No.: <span className="font-mono">B-17011/7/PWM(COMP)/2020(PW)/2754</span>
              </div>
              <div>
                Date of Issue: <span className="font-mono">13.11.2020</span>
              </div>
            </div>

            {/* Address To */}
            <div className="mb-6 font-sans text-sm space-y-1">
              <div className="font-bold">To,</div>
              <div className="font-bold pl-4">M/s Paper Wings</div>
              <div className="pl-4">Poonam Singh, House No. 7,</div>
              <div className="pl-4">Harinagar Colony Semra, Chinhat, Lucknow, Uttar Pradesh</div>
            </div>

            {/* Subject */}
            <div className="mb-6 border-l-2 border-black pl-4 py-1">
              <span className="font-sans font-bold">Subject: </span>
              <span className="font-sans font-bold underline decoration-black decoration-1 underline-offset-4">
                Certificate to Seller for Marketing and Selling of Compostable Carry Bags
              </span>
            </div>

            {/* Main Content Body */}
            <div className="space-y-4 text-justify text-sm">
              <p>
                With reference to the application, this is to certify that <strong>M/s Paper Wings</strong> is fulfilling the criteria as per the revised Standard Operating Procedure (SOP) for issuing certificate as per the provisions "4(h)" & "11(c)" of the Plastic Waste Management Rules, 2018, for marketing and selling of compostable carry bags in the Indian Market as a <strong>'SELLER'</strong>.
              </p>
              <p>
                Central Pollution Control Board hereby grants permission to <strong>M/s Paper Wings</strong> as a <strong>'SELLER'</strong> for Marketing and Selling of compostable carry bags in the Indian Market subject to the following standard conditions:
              </p>

              {/* Conditions List */}
              <ol className="space-y-3 pl-4 list-decimal">
                <li>
                  The Certified 'SELLER', <strong>M/s Paper Wings</strong> shall comply with the provisions of "4(h)" & "11(c)" of the PWM Rules, 2018, notified under the Environment (Protection) Act, 1986.
                </li>
                <li>
                  The certified Seller shall comply with all compliance conditions as per any Guidelines issued from time to time by the Ministry of Environment, Forest & Climate Change or Central Pollution Control Board.
                </li>
                <li>
                  The seller shall provide six-monthly details of procurement of compostable carry bags from registered manufacturers in the prescribed format.
                </li>
                <li>
                  The seller shall maintain and provide quantity details of all sales of compostable carry bags.
                </li>
                <li>
                  Each carry bag made from compostable material shall bear a label <strong>"COMPOSTABLE"</strong> conforming to IS/ISO 17088 titled as Specifications for "Compostable Plastics" in English & regional languages. Each carry bag shall also have printed details of the manufacturer: <strong>M/s Paper Wings</strong>; Manufacturer Code: <strong>PW</strong> and the corresponding Certificate Number of the Seller.
                </li>
                <li>
                  If at any stage, information provided by the seller is found to be incorrect, the Certificate granted by the Central Pollution Control Board shall stand cancelled with immediate effect.
                </li>
              </ol>
            </div>

            {/* Signatures & Stamps */}
            <div className="mt-12 pt-6 border-t border-stone-200">
              <div className="flex justify-between items-start">
                
                {/* Official Receiving Stamp */}
                <div className="p-3 border border-stone-400 text-stone-800 text-xs font-sans max-w-[220px] bg-stone-50">
                  <div className="font-bold text-center border-b border-stone-300 pb-1 mb-1">
                    CENTRAL POLLUTION CONTROL BOARD
                  </div>
                  <div className="font-mono text-[10px] space-y-0.5">
                    <div>REGISTRY RECV. STAMP</div>
                    <div>Ref No: <span className="font-bold">N.C.S.</span></div>
                    <div>Date: <span className="font-bold">16.11.2020</span></div>
                  </div>
                </div>

                {/* Signee Details */}
                <div className="text-right font-sans">
                  <div className="mb-8 text-stone-500 italic text-xs">
                    [Digitally Signed / Sd/-]
                  </div>
                  <div className="font-bold text-sm">Divya Sinha</div>
                  <div className="text-xs text-stone-700">Additional Director & I/c UPC-II</div>
                  <div className="text-[11px] text-stone-500 mt-1">Central Pollution Control Board, Delhi</div>
                </div>

              </div>
            </div>

            {/* Copy To Section */}
            <div className="mt-8 pt-6 border-t border-stone-300 text-xs font-sans text-stone-700">
              <div className="font-bold text-stone-900 mb-2">Copy to:</div>
              <div className="grid grid-cols-12 gap-4">
                <div className="col-span-7 space-y-1">
                  <div className="font-bold text-stone-900">Member Secretary,</div>
                  <div className="font-semibold">Uttar Pradesh Pollution Control Board</div>
                  <div>Building No. TC-12V, Vibhuti Khand,</div>
                  <div>Gomti Nagar, Lucknow - 226010</div>
                </div>
                <div className="col-span-5 border-l border-stone-300 pl-4 italic">
                  With a request to verify and confirm the details provided by the applicant in Form-A (enclosed) within 30 days of receipt of this certificate.
                </div>
              </div>
            </div>

            {/* Footer Registry and Location */}
            <div className="mt-12 pt-4 border-t border-stone-300 flex justify-between items-center text-xs font-sans text-stone-500">
              <div>
                Official Website:{" "}
                <a
                  href="http://www.cpcb.nic.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-stone-800 font-semibold hover:underline"
                >
                  www.cpcb.nic.in
                </a>
              </div>
              <div className="flex items-center gap-1.5">
                <MapPin size={12} />
                <a
                  href="https://maps.app.goo.gl/zc2miSqHWkw43LiJ9"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-stone-800 font-semibold hover:underline"
                >
                  Ayodhya Hub Facility
                </a>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}

