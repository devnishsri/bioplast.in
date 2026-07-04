import React from "react";
import { Landmark, MapPin } from "lucide-react";

export default function CPCBCertificate() {
  return (
    <section id="cpcb-certificate" className="py-16 bg-stone-50 border-y border-stone-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Certificate Pages Display Container */}
        <div className="grid gap-12 grid-cols-1 lg:grid-cols-2">
          
          {/* ================= PAGE 1 ================= */}
          <div className="bg-[#FAF9F5] border border-stone-300 shadow-xl rounded-2xl overflow-hidden font-serif text-stone-950 p-8 sm:p-12 relative min-h-[1100px] flex flex-col justify-between print:shadow-none print:border-none print:p-0">
            {/* Background watermark effect */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none flex items-center justify-center">
              <Landmark size={400} className="text-green-800" />
            </div>

            <div>
              {/* Official Letterhead Header */}
              <div className="flex justify-between items-start gap-4 border-b-2 border-green-800 pb-6 mb-8">
                {/* Left Logo Emblem Placeholder */}
                <div className="w-16 h-16 rounded-full border-2 border-stone-800 flex flex-col items-center justify-center p-1 bg-white shrink-0 shadow-inner relative">
                  <div className="text-[7px] font-sans font-bold leading-tight text-center text-stone-800 tracking-tighter">
                    के.प्र.नि.बो.
                  </div>
                  <Landmark className="w-6 h-6 text-stone-700 my-0.5" />
                  <div className="text-[7px] font-sans font-bold leading-tight text-center text-stone-800 tracking-tighter">
                    CPCB
                  </div>
                </div>

                {/* Center Text Header */}
                <div className="text-center flex-grow">
                  <div className="text-sm sm:text-base font-bold text-stone-800 tracking-wide font-sans mb-0.5">
                    केन्द्रीय प्रदूषण नियंत्रण बोर्ड
                  </div>
                  <div className="text-base sm:text-lg font-extrabold text-green-900 tracking-wider font-sans mb-1">
                    CENTRAL POLLUTION CONTROL BOARD
                  </div>
                  <div className="text-[9px] sm:text-xs font-medium text-stone-700 tracking-normal font-sans">
                    पर्यावरण, वन एवं जलवायु परिवर्तन मंत्रालय भारत सरकार
                  </div>
                  <div className="text-[10px] sm:text-[11px] font-bold text-stone-800 tracking-wide font-sans">
                    MINISTRY OF ENVIRONMENT, FOREST & CLIMATE CHANGE GOVT. OF INDIA
                  </div>
                </div>
              </div>

              {/* Certificate Meta Bar */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 text-xs font-sans font-bold border-b border-stone-200 pb-4 mb-6">
                <div>
                  Certificate No.- <span className="font-mono text-stone-800">B-17011/7/PWM(COMP)/2020(PW)</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="relative inline-block px-3 py-1 border border-blue-500 text-blue-800 rounded-lg text-[10px] font-mono transform -rotate-3 font-semibold shadow-sm">
                    2754
                    <span className="absolute -inset-1 border border-dotted border-blue-400 rounded-lg pointer-events-none"></span>
                  </div>
                  <div>
                    Dated: <span className="font-mono">13.11.2020</span>
                  </div>
                </div>
              </div>

              {/* Receiver Info */}
              <div className="mb-6 font-sans text-sm text-stone-800 space-y-1">
                <div className="font-bold text-stone-900 text-base mb-1">To,</div>
                <div className="font-bold text-stone-900 text-base pl-4">M/s Paper Wings</div>
                <div className="pl-4">Poonam Singh,</div>
                <div className="pl-4">House no.7</div>
                <div className="pl-4">Harinagar colony semra, Chinhat, Lucknow</div>
              </div>

              {/* Subject Line */}
              <div className="mb-6 bg-stone-100 border-l-4 border-green-700 px-4 py-2 rounded-r-xl">
                <span className="font-sans font-extrabold text-stone-900 text-sm">Sub: </span>
                <span className="font-sans font-bold text-stone-900 text-sm underline decoration-stone-800 underline-offset-4 leading-relaxed">
                  Certificate to seller for Marketing and Selling of Compostable Carry Bags
                </span>
              </div>

              {/* Main Body content */}
              <div className="text-xs sm:text-sm leading-relaxed text-stone-800 space-y-4 text-justify font-sans">
                <p>
                  With reference to the application no. this is to certify that{" "}
                  <strong className="text-stone-950 font-bold">M/s Paper Wings</strong> is fulfilling the criteria as per
                  revised Standard Operating Procedure (SOP) for issuing certificate as per the provisions '4(h)' & '11(c)'
                  of Plastic Waste Management Rules, 2018, for marketing and selling of compostable carry bags such as in
                  Indian Market as <strong className="text-green-800 font-extrabold">'SELLER'</strong>.
                </p>
                <p>
                  Central Pollution Control Board, hereby, grant the permission to{" "}
                  <strong className="text-stone-950 font-bold">M/s Paper Wings</strong> as{" "}
                  <strong className="text-green-800 font-extrabold">'SELLER'</strong> for Marketing and Selling of
                  compostable carry bags in Indian Market subject to the following conditions:
                </p>

                {/* Conditions List */}
                <ol className="space-y-3.5 pl-2 pt-2">
                  <li className="flex gap-2">
                    <span className="font-bold text-stone-900 min-w-[20px]">i.</span>
                    <span>
                      The Certified <strong className="text-stone-900">'SELLER'</strong>,{" "}
                      <strong className="text-stone-950 font-bold">M/s Paper Wings</strong> shall comply with the provisions
                      of '4(h)' & '11(c)' of the PWM Rules, 2018, notified under the Environmental (Protection) Act, 1986.
                    </span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-bold text-stone-900 min-w-[20px]">ii.</span>
                    <span>
                      The certified Seller, <strong className="text-stone-950 font-bold">M/s Paper Wings</strong> shall comply
                      with conditions for compliance as per any Guidelines issued from time to time by the Ministry of
                      Environment, Forest & Climate Change or Central Pollution Control Board.
                    </span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-bold text-stone-900 min-w-[20px]">iii.</span>
                    <span>
                      The seller shall provide six-monthly details of procurement of compostable carry bags from registered
                      manufacturer as per prescribed format.
                    </span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-bold text-stone-900 min-w-[20px]">iv.</span>
                    <span>
                      The seller shall provide quantity details of sales of compostable carry bags.
                    </span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-bold text-stone-900 min-w-[20px]">v.</span>
                    <span>
                      Each carry bag made from compostable material or plastic shall bear a label{" "}
                      <strong className="text-stone-950 font-extrabold">"COMPOSTABLE"</strong> IS/ISO: 17088 titled as
                      Specifications for "Compostable Plastic" in English & regional language. Each carry bag shall also have
                      printed M/s: <strong className="text-stone-950 font-bold">M/s Paper Wings</strong>; code:{" "}
                      <strong className="font-mono font-bold">PW</strong> and Certificate Number of "Seller".
                    </span>
                  </li>
                </ol>
              </div>
            </div>

            {/* Page Footer Section */}
            <div className="mt-12 border-t border-stone-200 pt-6">
              {/* Hand Signature Indication */}
              <div className="flex justify-end mb-4">
                <div className="text-center font-sans">
                  <span className="italic font-serif text-blue-800 block text-xs pr-12 leading-none select-none">by</span>
                </div>
              </div>

              <div className="bg-stone-100/80 border border-stone-200 rounded-xl p-3 text-[10px] sm:text-xs font-sans text-center text-stone-700 leading-normal">
                <div className="font-bold text-stone-800 mb-0.5">
                  'परिवेश भवन' पूर्वी अर्जुन नगर, दिल्ली-110032
                </div>
                <div className="font-semibold text-stone-800 mb-1">
                  Parivesh Bhawan, East Arjun Nagar, Delhi-110032
                </div>
                <div>
                  दूरभाष/Tel : 43102030, 22305792, वेबसाईट/Website :{" "}
                  <a
                    href="http://www.cpcb.nic.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-700 hover:underline font-semibold"
                  >
                    www.cpcb.nic.in
                  </a>
                </div>
              </div>
              <div className="text-center mt-3 text-[10px] text-stone-400 font-mono">
                Page 1 of 2
              </div>
            </div>
          </div>

          {/* ================= PAGE 2 ================= */}
          <div className="bg-[#FAF9F5] border border-stone-300 shadow-xl rounded-2xl overflow-hidden font-serif text-stone-950 p-8 sm:p-12 relative min-h-[1100px] flex flex-col justify-between print:shadow-none print:border-none print:p-0">
            {/* Background watermark effect */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none flex items-center justify-center">
              <Landmark size={400} className="text-green-800" />
            </div>

            <div>
              {/* Condition vi Continued */}
              <div className="text-xs sm:text-sm leading-relaxed text-stone-800 space-y-4 text-justify font-sans pt-8">
                <ol start={6} className="space-y-4 pl-2">
                  <li className="flex gap-2">
                    <span className="font-bold text-stone-900 min-w-[20px]">vi.</span>
                    <span>
                      If any stage, information provided by the seller, is found to be incorrect then the Certificate granted
                      by CPCB shall stand cancelled.
                    </span>
                  </li>
                </ol>
              </div>

              {/* Signature Box 1 */}
              <div className="mt-12 flex justify-end">
                <div className="text-right font-sans max-w-[250px]">
                  {/* Simulated Signature */}
                  <div className="flex flex-col items-center justify-center mb-1">
                    <div className="font-serif italic text-blue-700 text-sm select-none pr-8">by</div>
                    <div className="font-serif italic text-blue-800/80 text-lg font-bold select-none transform rotate-[-2deg] my-1">
                      Divya Sinha
                    </div>
                  </div>
                  <div className="font-bold text-stone-900 text-sm">(Divya Sinha)</div>
                  <div className="text-stone-700 text-xs">Additional Director & I/c UPC-II</div>
                </div>
              </div>

              {/* Copy To Section */}
              <div className="mt-16 pt-8 border-t border-stone-200">
                <div className="font-sans font-bold text-stone-900 text-sm mb-4">Copy to:</div>
                
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 text-xs sm:text-sm font-sans text-stone-800 leading-relaxed">
                  <div className="md:col-span-6 space-y-1.5 border-r border-stone-200 pr-4">
                    <div className="font-bold text-stone-900">Member Secretary,</div>
                    <div className="font-semibold text-stone-900">Uttar Pradesh Pollution Control Board</div>
                    <div>Building.No. TC-12V Vibhuti Khand,</div>
                    <div>Gomti Nagar Lucknow-226010</div>
                  </div>

                  <div className="md:col-span-6 pl-0 md:pl-4 flex items-center">
                    <div className="text-stone-700 italic border-l-2 border-stone-300 pl-3 py-1">
                      : With a request to confirm the details provided by the applicant in Form -A (enclosed) within 30 days
                      of receipt of this Certificate
                    </div>
                  </div>
                </div>
              </div>

              {/* Signature Box 2 (Copy To validation) */}
              <div className="mt-12 flex justify-end">
                <div className="text-right font-sans max-w-[250px]">
                  {/* Simulated Signature 2 */}
                  <div className="flex flex-col items-center justify-center mb-1">
                    <div className="font-serif italic text-blue-700 text-xs select-none pr-6">by</div>
                    <div className="font-serif italic text-blue-800/80 text-base font-bold select-none transform rotate-[-1deg] my-1">
                      Divya Sinha
                    </div>
                  </div>
                  <div className="font-bold text-stone-900 text-sm">(Divya Sinha)</div>
                </div>
              </div>
            </div>

            {/* Page Footer Section with Stamp */}
            <div className="mt-16 border-t border-stone-200 pt-8 flex flex-col sm:flex-row justify-between items-center gap-6">
              {/* Official Stamp */}
              <div className="relative p-4 border-2 border-dashed border-purple-500/80 text-purple-700/90 rounded-2xl text-center transform -rotate-6 font-sans max-w-[200px] select-none bg-white/40 backdrop-blur-[1px]">
                <div className="text-[10px] font-bold uppercase tracking-wider mb-1">केन्द्रीय प्रदूषण नियंत्रण बोर्ड</div>
                <div className="text-xs font-black uppercase mb-1">CPCB RECV. STAMP</div>
                <div className="text-[10px] leading-tight mb-1 border-y border-purple-300 py-0.5">
                  निर्गत: <span className="font-mono font-bold">N.C.S.</span>
                </div>
                <div className="text-[10px] font-semibold">
                  दिनांक: <span className="font-mono font-bold">16.11.2020</span>
                </div>
                {/* Outer double border ring */}
                <span className="absolute -inset-1 border border-dotted border-purple-400 rounded-2xl pointer-events-none opacity-55"></span>
              </div>

              {/* Verify details helper */}
              <div className="text-center sm:text-right">
                <div className="text-xs font-sans text-stone-500 font-semibold mb-1">
                  Verifiable on official CPCB registry
                </div>
                <a
                  href="https://maps.app.goo.gl/zc2miSqHWkw43LiJ9"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-green-700 font-bold hover:underline"
                >
                  <MapPin size={12} />
                  <span>Ayodhya Hub Facility</span>
                </a>
              </div>
            </div>

            <div className="text-center mt-3 text-[10px] text-stone-400 font-mono pt-4">
              Page 2 of 2
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
