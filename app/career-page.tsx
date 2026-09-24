"use client";

import { useState } from "react";
import { ArrowDownRight, ArrowRight, ArrowUpRight, BriefcaseBusiness, ChevronRight, CirclePlay, Clock3, Coffee, HeartHandshake, MapPin, Menu, ShieldCheck, Sparkles, X } from "lucide-react";
import styles from "./career.module.css";

const SELF_URL = "https://waymart.selfrecruit.ge/e8e7ca79-c3fc-475c-9c01-bfde96354572";

const locations = [
  { city: "თბილისი", title: "გულია", address: "გულიას მოედანი #12", tag: "მაღაზია • SOCAR" },
  { city: "თბილისი", title: "კახეთის გზატკეცილი", address: "კახეთის გზატკეცილი #44", tag: "მაღაზია • SOCAR" },
  { city: "თბილისი", title: "მოსკოვის გამზირი", address: "ისანი–სამგორი, მოსკოვის გამზირი #10", tag: "მაღაზია • SOCAR" },
  { city: "თბილისი", title: "შეშელიძე", address: "შეშელიძის ქუჩა #34", tag: "მაღაზია • SOCAR" },
  { city: "ბათუმი", title: "ბარცხანა", address: "თამარ მეფის გამზირი", tag: "მაღაზია • SOCAR" },
  { city: "ბათუმი", title: "ანგისა", address: "აეროპორტის გზატკეცილი #45", tag: "მაღაზია • SOCAR" },
  { city: "ქუთაისი", title: "ნიკეა", address: "ნიკეას ქუჩა #8", tag: "მაღაზია • SOCAR" },
  { city: "ზუგდიდი", title: "ჭითაწყარი", address: "ჭითაწყარის სოფელი", tag: "მაღაზია • SOCAR" },
  { city: "ფოთი", title: "ლარნაკა", address: "ლარნაკას ქუჩა", tag: "მაღაზია • SOCAR" },
  { city: "ბაკურიანი", title: "ბორჯომის ქუჩა", address: "ბორჯომის ქ. #55", tag: "მაღაზია • SOCAR" },
];

const regions = ["ყველა", "თბილისი", "ბათუმი", "რეგიონები"];

const videos = [
  { src: "/media/waymart-moment-01.mp4", title: "ჩვენი გზა იწყება ადამიანებით" },
  { src: "/media/waymart-moment-02.mp4", title: "ერთი მორიგეობა — ბევრი ამბავი" },
  { src: "/media/waymart-moment-03.mp4", title: "შესვენება, რომელიც გემახსოვრება" },
  { src: "/media/waymart-moment-04.mp4", title: "შენი ქალაქი, შენი Way Mart" },
];

export default function CareerPage() {
  const [region, setRegion] = useState("ყველა");
  const [activeVideo, setActiveVideo] = useState<number | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const shownLocations = locations.filter((location) => region === "ყველა" || (region === "რეგიონები" ? !["თბილისი", "ბათუმი"].includes(location.city) : location.city === region));

  return <main className={styles.page}>
    <header className={styles.header}>
      <a href="#top" className={styles.brand} aria-label="Way Mart Careers">
        <img src="/waymart-logo.jpg" alt="Way Mart" />
        <span>CAREERS</span>
      </a>
      <nav className={`${styles.nav} ${menuOpen ? styles.navOpen : ""}`} aria-label="მთავარი ნავიგაცია">
        <a onClick={() => setMenuOpen(false)} href="#story">ჩვენი ამბავი</a>
        <a onClick={() => setMenuOpen(false)} href="#moments">გუნდის მომენტები</a>
        <a onClick={() => setMenuOpen(false)} href="#locations">ლოკაციები</a>
        <a onClick={() => setMenuOpen(false)} href="#roles">ვაკანსიები</a>
      </nav>
      <a className={styles.applyTop} href={SELF_URL} target="_blank" rel="noreferrer">შეავსე აპლიკაცია <ArrowUpRight size={16}/></a>
      <button className={styles.menuButton} onClick={() => setMenuOpen(!menuOpen)} aria-label="მენიუ">{menuOpen ? <X /> : <Menu />}</button>
    </header>

    <section className={styles.hero} id="top">
      <div className={styles.heroWords}>
        <div className={styles.kicker}><span /> SOCAR-ის გზაზე მეგობარი გუნდი</div>
        <h1>შენი ახალი<br /><i>გზა</i> აქ იწყება.</h1>
        <p>Way Mart არის ადგილი, სადაც ერთი პატარა გაჩერება კარგ გამოცდილებად იქცევა. შემოგვიერთდი და ერთად შევქმნათ ეს გამოცდილება.</p>
        <div className={styles.heroActions}>
          <a className={styles.primary} href="#roles">იპოვე შენი პოზიცია <ArrowRight size={18}/></a>
          <a className={styles.textLink} href="#story">გაიცანი Way Mart <ArrowDownRight size={18}/></a>
        </div>
        <div className={styles.heroFact}><MapPin size={18}/><span>მაღაზიები SOCAR-ის ლოკაციებზე<br /><b>თბილისი • ბათუმი • მთელი საქართველო</b></span></div>
      </div>
      <div className={styles.heroMedia}>
        <img src="/media/waymart-hero.png" alt="Way Mart-ის სტუმრები მაღაზიის წინ" />
        <div className={styles.photoCaption}><span>WAY MART</span><b>შენი მეგობარი<br />გზაზე.</b></div>
        <div className={styles.orangeTag}>ერთი კარგი<br />ცვლა იწყება<br />ღიმილით ✦</div>
      </div>
    </section>

    <div className={styles.marquee} aria-hidden="true"><div>კეთილგანწყობა <i>✦</i> ენერგია <i>✦</i> ყურადღება <i>✦</i> გუნდი <i>✦</i> კეთილგანწყობა <i>✦</i> ენერგია <i>✦</i> ყურადღება <i>✦</i> გუნდი <i>✦</i></div></div>

    <section className={styles.story} id="story">
      <div className={styles.sectionIntro}><span>01 / მეტი ვიდრე convenience store</span><h2>გზის ყველა<br />გაჩერებას აქვს <em>ისტორია.</em></h2><p>Way Mart არის SOCAR-ის სადგურებზე არსებული თანამედროვე convenience store — სწრაფი ყავა, თბილი საკვები, ყოველდღიური პროდუქცია და ყურადღებიანი მომსახურება ერთ სივრცეში.</p></div>
      <div className={styles.storyGrid}>
        <article className={`${styles.imageCard} ${styles.interiorCard}`}><img src="/media/waymart-socar-interior.png" alt="SOCAR Way Mart-ის ინტერიერი" /><div><small>ყოველდღიური რიტმი</small><b>კარგი მომსახურება<br />დეტალებით იწყება.</b></div></article>
        <article className={styles.statementCard}><Coffee size={33}/><p>„დღის ტემპი შეიძლება იცვლებოდეს, მაგრამ სტუმრისთვის კარგი განწყობა ყოველთვის რჩება.“</p><span>WAY MART-ის მომსახურების კულტურა</span></article>
        <article className={`${styles.imageCard} ${styles.loungeCard}`}><img src="/media/waymart-lounge.png" alt="Way Mart-ის კომფორტული სივრცე" /><div><small>სივრცე გზაზე</small><b>კომფორტი,<br />რომელსაც ქმნი.</b></div></article>
      </div>
    </section>

    <section className={styles.moments} id="moments">
      <div className={styles.momentHead}><div><span>02 / ნამდვილი ატმოსფერო</span><h2>ნახე ცხოვრება<br />Way Mart-ში.</h2></div><p>ვიდეო მომენტები ყოველდღიური გარემოდან — ადამიანები, გემოები და რიტმი, რომლის ნაწილიც შეიძლება შენც გახდე.</p></div>
      <div className={styles.videoRail}>{videos.map((video, index) => <button onClick={() => setActiveVideo(index)} className={styles.videoCard} key={video.src}><video src={video.src} muted autoPlay loop playsInline preload="metadata" /><span className={styles.play}><CirclePlay size={25}/></span><div><small>VIDEO 0{index + 1}</small><b>{video.title}</b></div></button>)}</div>
    </section>

    <section className={styles.conditions}>
      <div className={styles.conditionsPhoto}><img src="/media/waymart-night.png" alt="Way Mart-ის ღამის ფილიალი" /><div>ყოველ<br />ცვლას<br /><i>აქვს აზრი.</i></div></div>
      <div className={styles.conditionsCopy}><span>03 / რას გთავაზობთ</span><h2>გარემო, სადაც<br />შენი შრომა <em>ჩანს.</em></h2><div className={styles.benefits}>
        <div><HeartHandshake /><b>ჯანმრთელობის დაზღვევა</b><p>ბენეფიტი მოქმედი ვაკანსიის პირობებში.</p></div>
        <div><Clock3 /><b>გრაფიკის შეთანხმება</b><p>სამუშაო საათებისა და დღეების შეთანხმების შესაძლებლობა.</p></div>
        <div><Sparkles /><b>ბონუსები და მხარდაჭერა</b><p>ანაზღაურებადი შვებულება, ბიულეტენი და ბონუსები.</p></div>
        <div><MapPin /><b>ტრანსპორტის ბარათი</b><p>თბილისის ტრანსპორტის ულიმიტო ბარათი ვაკანსიის პირობებით.</p></div>
      </div>
      </div>
    </section>

    <section className={styles.locationSection} id="locations">
      <div className={styles.locationIntro}><div><span>04 / სად იმუშავებ</span><h2>შენი ქალაქი.<br /><em>შენი ვეი მარტი.</em></h2></div><p>Way Mart-ის გუნდები მუშაობენ SOCAR-ის ლოკაციებზე საქართველოს მასშტაბით. აი რამდენიმე არჩევანი მიმდინარე საჯარო ჩამონათვალიდან.</p></div>
      <div className={styles.locationControls}>{regions.map((item) => <button onClick={() => setRegion(item)} className={item === region ? styles.activeFilter : ""} key={item}>{item}</button>)}<a href="https://sgp.ge/en/service-centers" target="_blank" rel="noreferrer">სრული რუკა <ArrowUpRight size={16}/></a></div>
      <div className={styles.locationCards}>{shownLocations.map((location, index) => <article key={location.title}><span>0{index + 1}</span><MapPin /><div><small>{location.tag}</small><h3>{location.city} — {location.title}</h3><p>{location.address}</p></div><ChevronRight /></article>)}</div>
      <p className={styles.sourceNote}>ლოკაციების საბოლოო ხელმისაწვდომობა გადაამოწმე <a href="https://sgp.ge/en/service-centers" target="_blank" rel="noreferrer">SOCAR-ის ოფიციალურ რუკაზე</a>.</p>
    </section>

    <section className={styles.roles} id="roles">
      <div><span>05 / შემოუერთდი გუნდს</span><h2>დაიწყე კარიერა,<br />რომელიც <em>მოძრაობაშია.</em></h2></div>
      <div className={styles.roleList}>
        <a href={SELF_URL} target="_blank" rel="noreferrer"><span>01</span><div><b>მოლარე-კონსულტანტი</b><small>თბილისი • სრული განაკვეთი</small></div><ArrowUpRight /></a>
        <a href={SELF_URL} target="_blank" rel="noreferrer"><span>02</span><div><b>მოლარე-კონსულტანტი</b><small>რეგიონები • სრული განაკვეთი</small></div><ArrowUpRight /></a>
        <a href="/recruit-win"><span>03</span><div><b>Recruit &amp; Win</b><small>შეიტყვე, როგორ მუშაობს საჩუქრები და მოწვევა</small></div><ArrowRight /></a>
      </div>
    </section>

    <section className={styles.cta}><img src="/media/waymart-station.png" alt="SOCAR-ის სადგური და Way Mart" /><div><span>შენი შემდეგი ნაბიჯი</span><h2>მოდი, გზა ერთად უკეთესი გავხადოთ.</h2><p>გაეცანი ვაკანსიის სრულ პირობებს და დატოვე აპლიკაცია ოფიციალურ გვერდზე.</p><a className={styles.primary} href={SELF_URL} target="_blank" rel="noreferrer">შეავსე აპლიკაცია <ArrowUpRight size={18}/></a></div></section>

    <footer className={styles.footer}><div className={styles.brand}><img src="/waymart-logo.jpg" alt="Way Mart" /><span>CAREERS</span></div><p>Way Mart Careers • SOCAR-ის ლოკაციებზე მეგობარი გუნდი</p><a href={SELF_URL} target="_blank" rel="noreferrer">ოფიციალური აპლიკაცია ↗</a></footer>

    {activeVideo !== null && <div className={styles.videoModal} role="dialog" aria-modal="true" aria-label={videos[activeVideo].title}><button onClick={() => setActiveVideo(null)} aria-label="ვიდეოს დახურვა"><X /></button><video src={videos[activeVideo].src} controls autoPlay playsInline /></div>}
  </main>;
}
