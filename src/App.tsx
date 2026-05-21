import React from 'react';
import { TopNavBar, SideNavBar } from './components/Navigation';
import { AudioPlayer } from './components/AudioPlayer';
import { PhotoGallery } from './components/PhotoGallery';
import { BookingForm } from './components/BookingForm';

export const App: React.FC = () => {
  const stagePlotUrl = '/Technical_Rider_och_Input_List.pdf';
  
  const handleScrollToBooking = (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => {
    e.preventDefault();
    const el = document.getElementById('kontakt');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleDownload = (url: string, filename: string) => {
    const link = document.createElement('a');
    link.href = url;
    link.target = '_blank';
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="bg-background text-on-background font-body-md min-h-screen overflow-x-hidden selection:bg-primary-container selection:text-background relative">
      {/* Global Noise Overlay */}
      <div className="fixed inset-0 z-0 noise-bg mix-blend-overlay"></div>

      {/* Background Light Leaks */}
      <div className="fixed top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-primary-container/10 blur-[120px] z-0 pointer-events-none"></div>
      <div className="fixed bottom-[-20%] right-[-10%] w-[60%] h-[60%] rounded-full bg-surface-tint/10 blur-[150px] z-0 pointer-events-none"></div>

      {/* Navigation Panels */}
      <TopNavBar />
      <SideNavBar />

      {/* Main Content Canvas */}
      <main className="relative z-10 pt-20 lg:pl-16 pb-20 overflow-hidden">
        
        {/* HERO SECTION */}
        <section className="relative min-h-[90vh] flex items-center justify-center px-margin-mobile md:px-margin-desktop mb-32" id="hero">
          <div className="absolute inset-0 z-0">
            <img
              alt="Band hero background"
              className="w-full h-full object-cover opacity-40 mix-blend-luminosity"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCSWWlxBCKwtYlPU-oWbeRHrm5S9Kh1DrgCGpQy6vWAfaUUhC5UQY5a51aW8jRL5rkuArb3CfCcERBhProtoav-_3bvi2o8_Lr0QT6Qejh4ljMbfKn_XcVv_ks_EeD0Qcgy-0rVmBbWf-q6-VGjGu3YAZOqaxUeNUE255cITsEJSOOcqSMRsiiz4aFIzjo3nJYDoPAufcu124BgqcqzF8IgC0gE6pe-WK5q5KXBynq3q7GqGqnfeCbk-X_pFHfeRSUfYD6o1ncHECgh"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent"></div>
          </div>
          
          <div className="relative z-10 text-center flex flex-col items-center transform -rotate-2">
            <div className="bg-primary-container text-background font-label-caps text-label-caps px-4 py-1 mb-6 inline-block font-bold">
              NY SINGEL UTE NU
            </div>
            <h1 className="font-display-xl text-headline-lg-mobile md:text-display-xl text-on-background drop-shadow-[8px_8px_0_#00f2ff] uppercase mb-4 leading-none mix-blend-exclusion">
              THE EMPTY YARDS
            </h1>
            <p className="font-headline-md text-headline-md text-primary tracking-widest mt-4">
              EPK 2024
            </p>
            <button
              onClick={handleScrollToBooking}
              className="mt-12 bg-primary-container text-on-primary-fixed font-label-caps text-label-caps px-8 py-4 uppercase border-2 border-primary-container hover:bg-transparent hover:text-primary-container transition-colors glitch-hover cursor-pointer focus:outline-none"
            >
              BOKA NU
            </button>
          </div>
        </section>

        {/* BIO SECTION */}
        <section className="px-margin-mobile md:px-margin-desktop py-20 relative" id="bio">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-center">
            <div className="lg:col-span-5 relative transform rotate-1 md:rotate-tilt-angle z-10">
              <div className="absolute inset-0 bg-primary-container translate-x-4 translate-y-4"></div>
              <img
                alt="Band press photo"
                className="relative z-10 w-full h-auto grayscale contrast-125 border border-white/10"
                src="/Artist-pic.png"
              />
            </div>
            
            <div className="lg:col-span-6 lg:col-start-7 mt-12 lg:mt-0 bg-surface-container p-8 md:p-12 border border-white/10 relative z-20 shadow-[8px_8px_0_0_rgba(0,242,255,1)]">
              <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary mb-6 uppercase">
                Vem är jag
              </h2>
              <p className="font-body-lg text-body-lg text-on-surface mb-6 leading-relaxed">
                The Empty Yards är mitt råa och rebelliska projekt som föddes ur frustration och hopp. Med en ljudbild som blandar 2000-talets pop-punk med modern alternativ rock, skapar jag hymner för en generation som vägrar tystas.
              </p>
              <p className="font-body-md text-body-md text-on-surface-variant">
                Från svettiga källargig till att sälja ut lokala klubbar – energin är alltid maxad, ofiltrerad och desperat vacker. Jag spelar inte bara musik, jag startar ett jävla riot.
              </p>
            </div>
          </div>
        </section>

        {/* MUSIK & LYRICS SECTION */}
        <section className="px-margin-mobile md:px-margin-desktop py-20 bg-surface-container-lowest border-y border-white/5 relative" id="musik">
          <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-background mb-12 text-center uppercase tracking-wider transform -rotate-1">
            Lyssna
          </h2>
          
          <div className="max-w-2xl mx-auto">
            <AudioPlayer songUrl="/FULLSONG.mp3" />
          </div>
        </section>

        {/* GALLERY SECTION */}
        <PhotoGallery />


        {/* PRESS & RECENSIONER */}
        <section className="px-margin-mobile md:px-margin-desktop py-32 relative" id="press">
          <h2 className="font-headline-md text-headline-md text-on-surface-variant mb-12 text-center uppercase tracking-[0.2em]">
            Vad dom säger
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Quote 1 */}
            <div className="bg-surface p-8 border border-white/10 relative transform hover:-translate-y-2 transition-transform shadow-[4px_4px_0_0_#1e1e1e]">
              <span className="material-symbols-outlined text-primary/20 absolute top-4 right-4" style={{ fontSize: '64px' }}>
                format_quote
              </span>
              <p className="font-body-lg text-body-lg text-on-surface mb-6 relative z-10 italic">
                "En explosiv debut som känns både bekant och helt nyskapande. De vägrar be om ursäkt."
              </p>
              <p className="font-label-caps text-label-caps text-primary uppercase">— Rockguiden</p>
            </div>

            {/* Quote 2 */}
            <div className="bg-surface p-8 border border-white/10 relative transform translate-y-4 hover:-translate-y-2 transition-transform shadow-[4px_4px_0_0_#1e1e1e]">
              <span className="material-symbols-outlined text-primary/20 absolute top-4 right-4" style={{ fontSize: '64px' }}>
                format_quote
              </span>
              <p className="font-body-lg text-body-lg text-on-surface mb-6 relative z-10 italic">
                "Äntligen ett svenskt band som fattar hur man kanaliserar äkta jävla ångest i arenarefränger."
              </p>
              <p className="font-label-caps text-label-caps text-primary uppercase">— Gaffa</p>
            </div>

            {/* Quote 3 */}
            <div className="bg-surface p-8 border border-white/10 relative transform -translate-y-2 hover:-translate-y-4 transition-transform shadow-[4px_4px_0_0_#1e1e1e] md:col-span-2 lg:col-span-1">
              <span className="material-symbols-outlined text-primary/20 absolute top-4 right-4" style={{ fontSize: '64px' }}>
                format_quote
              </span>
              <p className="font-body-lg text-body-lg text-on-surface mb-6 relative z-10 italic">
                "Det råaste livebandet jag sett i år. Se dem innan de spränger sig själva i bitar."
              </p>
              <p className="font-label-caps text-label-caps text-primary uppercase">— IndieBloggen</p>
            </div>
          </div>
        </section>

        {/* STAGE PLOT & TECH RIDER */}
        <section className="px-margin-mobile md:px-margin-desktop py-20 bg-surface-container-lowest border-y border-white/5">
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            <div className="lg:w-1/3 order-2 lg:order-1">
              <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary uppercase mb-4">
                Tech Rider
              </h2>
              <p className="font-body-md text-body-md text-on-surface-variant mb-8">
                För festivaler och klubbgig. Ladda ner komplett PDF för detaljerad input list och hospitality rider.
              </p>
              
              <ul className="space-y-4 font-body-md text-body-md text-on-surface mb-8">
                <li className="flex items-start gap-3">
                  <span className="text-primary mt-1 font-bold">X</span>
                  <span>1x Sångare (Sångmikrofon SM58)</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary mt-1 font-bold">X</span>
                  <span>1x Basist (Basförstärkare / DI)</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary mt-1 font-bold">X</span>
                  <span>1x Elgitarr (Gitarrförstärkare)</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary mt-1 font-bold">X</span>
                  <span>1x Standard trumset (Tar med egna cymbaler &amp; virvel)</span>
                </li>
              </ul>
              
              <button
                onClick={() => handleDownload(stagePlotUrl, 'Technical_Rider_och_Input_List.pdf')}
                className="w-full bg-surface-variant text-on-surface border border-white/20 hover:border-primary py-3 font-label-caps text-label-caps uppercase transition-colors flex justify-center items-center gap-2 focus:outline-none"
              >
                LADDA NER STAGE PLOT <span className="material-symbols-outlined text-sm">picture_as_pdf</span>
              </button>
            </div>
            
            <div className="lg:w-2/3 order-1 lg:order-2 w-full flex items-center justify-center min-h-[520px] relative overflow-visible mt-8 lg:mt-0">
              <div className="relative w-full max-w-lg h-[500px] flex items-center justify-center select-none group">
                
                {/* Sheet 1: Tech Rider (Back Page) */}
                <div className="absolute w-[290px] sm:w-[350px] md:w-[380px] h-[460px] bg-surface-container border border-white/10 p-6 shadow-2xl transform -rotate-3 -translate-x-6 sm:-translate-x-8 group-hover:-translate-x-12 group-hover:-rotate-6 transition-all duration-500 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-center border-b border-primary/20 pb-2 mb-4">
                      <span className="font-label-caps text-[9px] text-primary font-bold">PAGE 1 / 2</span>
                      <span className="font-label-caps text-[9px] text-on-surface-variant">THE EMPTY YARDS</span>
                    </div>
                    <h3 className="font-headline-md text-xl text-on-background uppercase mb-6 tracking-wider">TECHNICAL RIDER</h3>
                    
                    <div className="space-y-3 font-body-md text-[11px] text-on-surface-variant leading-relaxed">
                      <p className="border-l-2 border-primary pl-2"><strong className="text-on-background">SYSTEM REQ:</strong> High-quality PA system suitable for venue size. Min 105dB SPL at FOH.</p>
                      <p className="border-l-2 border-primary pl-2"><strong className="text-on-background">POWER:</strong> 3x Independent 16A 230V clean audio power outlets on stage.</p>
                      <p className="border-l-2 border-primary pl-2"><strong className="text-on-background">MONITORS:</strong> Stage monitors with independent mixes for all 4 performers.</p>
                      <p className="border-l-2 border-primary pl-2"><strong className="text-on-background">HOSPITALITY:</strong> 1x Lockable dressing room, fresh water, hot meals for band (4 pax).</p>
                    </div>
                  </div>
                  
                  <div className="border-t border-white/5 pt-4 text-right">
                    <span className="font-label-caps text-[8px] text-primary/45">CONFIDENTIAL - RIDER V2024</span>
                  </div>
                </div>

                {/* Sheet 2: Input List (Front Page) */}
                <div className="absolute w-[290px] sm:w-[350px] md:w-[380px] h-[460px] bg-surface border-2 border-primary/50 p-6 shadow-[0_0_30px_rgba(0,242,255,0.12)] transform rotate-2 translate-x-6 sm:translate-x-8 group-hover:translate-x-12 group-hover:rotate-4 transition-all duration-500 flex flex-col justify-between z-10">
                  <div>
                    <div className="flex justify-between items-center border-b border-primary/30 pb-2 mb-4">
                      <span className="font-label-caps text-[9px] text-primary font-bold">PAGE 2 / 2</span>
                      <span className="font-label-caps text-[9px] text-on-surface-variant">INPUT LIST & STAGE</span>
                    </div>
                    <h3 className="font-headline-md text-xl text-primary uppercase mb-6 tracking-widest">INPUT LIST</h3>
                    
                    <table className="w-full text-left font-body-md text-[10px] text-on-surface border-collapse">
                      <thead>
                        <tr className="border-b border-white/10 text-on-surface-variant font-label-caps text-[8px] tracking-wider">
                          <th className="py-2">CH</th>
                          <th className="py-2">INSTRUMENT</th>
                          <th className="py-2">SOURCE / MIC</th>
                          <th className="py-2">STAND</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5">
                        <tr>
                          <td className="py-2.5 font-bold text-primary">01</td>
                          <td className="py-2.5">Trummor (K/S)</td>
                          <td className="py-2.5">Standard Kit Mics</td>
                          <td className="py-2.5 text-on-surface-variant">Low / Clips</td>
                        </tr>
                        <tr>
                          <td className="py-2.5 font-bold text-primary">02</td>
                          <td className="py-2.5">Basgitarr</td>
                          <td className="py-2.5">Active DI Box</td>
                          <td className="py-2.5 text-on-surface-variant">Direct</td>
                        </tr>
                        <tr>
                          <td className="py-2.5 font-bold text-primary">03</td>
                          <td className="py-2.5">Elgitarr</td>
                          <td className="py-2.5">Sennheiser e609</td>
                          <td className="py-2.5 text-on-surface-variant">Cab Clamp</td>
                        </tr>
                        <tr>
                          <td className="py-2.5 font-bold text-primary">04</td>
                          <td className="py-2.5">Sång (Lead)</td>
                          <td className="py-2.5">Shure SM58</td>
                          <td className="py-2.5 text-on-surface-variant">Tall Boom</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div className="border-t border-primary/20 pt-4 flex justify-between items-center">
                    <span className="font-label-caps text-[8px] text-primary">STATUS: SIGNED & ACTIVE</span>
                    <span className="material-symbols-outlined text-primary text-sm animate-pulse">check_circle</span>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </section>

        {/* KONTAKT / BOOKING */}
        <section className="px-margin-mobile md:px-margin-desktop py-32 text-center relative overflow-hidden" id="kontakt">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[150px] md:text-[300px] font-display-xl text-white/[0.02] whitespace-nowrap pointer-events-none uppercase select-none">
            BOKA BOKA BOKA
          </div>
          
          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-background uppercase mb-8">
              Boka
            </h2>
            <BookingForm />

          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="bg-background w-full py-12 border-t-4 border-primary mt-20 relative z-20">
        <div className="flex flex-col md:flex-row justify-between items-center px-margin-mobile md:px-margin-desktop gap-gutter">
          <div className="font-headline-md text-headline-md text-on-surface uppercase tracking-tighter hover:skew-x-[-12deg] transition-transform cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            THE EMPTY YARDS
          </div>

          
          <div className="font-label-caps text-label-caps text-on-surface-variant/50">
            © 2024 THE EMPTY YARDS. ALLA RÄTTIGHETER FÖRBEHÅLLNA.
          </div>
        </div>
      </footer>
    </div>
  );
};
export default App;
