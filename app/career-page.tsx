"use client";

import { useEffect, useState } from "react";
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  BriefcaseBusiness,
  ChevronRight,
  CirclePlay,
  Clock3,
  Coffee,
  HeartHandshake,
  MapPin,
  Menu,
  ShieldCheck,
  Sparkles,
  X,
} from "lucide-react";
import styles from "./career.module.css";

const SELF_URL =
  "https://waymart.selfrecruit.ge/e8e7ca79-c3fc-475c-9c01-bfde96354572";

const locations = [
  {
    city: "თბილისი",
    title: "გულია",
    address: "გულიას მოედანი #12",
    tag: "მაღაზია • SOCAR",
  },
  {
    city: "თბილისი",
    title: "კახეთის გზატკეცილი",
    address: "კახეთის გზატკეცილი #44",
    tag: "მაღაზია • SOCAR",
  },
  {
    city: "თბილისი",
    title: "მოსკოვის გამზირი",
    address: "ისანი–სამგორი, მოსკოვის გამზირი #10",
    tag: "მაღაზია • SOCAR",
  },
  {
    city: "თბილისი",
    title: "შეშელიძე",
    address: "შეშელიძის ქუჩა #34",
    tag: "მაღაზია • SOCAR",
  },
  {
    city: "ბათუმი",
    title: "ბარცხანა",
    address: "თამარ მეფის გამზირი",
    tag: "მაღაზია • SOCAR",
  },
  {
    city: "ბათუმი",
    title: "ანგისა",
    address: "აეროპორტის გზატკეცილი #45",
    tag: "მაღაზია • SOCAR",
  },
  {
    city: "ქუთაისი",
    title: "ნიკეა",
    address: "ნიკეას ქუჩა #8",
    tag: "მაღაზია • SOCAR",
  },
  {
    city: "ზუგდიდი",
    title: "ჭითაწყარი",
    address: "ჭითაწყარის სოფელი",
    tag: "მაღაზია • SOCAR",
  },
  {
    city: "ფოთი",
    title: "ლარნაკა",
    address: "ლარნაკას ქუჩა",
    tag: "მაღაზია • SOCAR",
  },
  {
    city: "ბაკურიანი",
    title: "ბორჯომის ქუჩა",
    address: "ბორჯომის ქ. #55",
    tag: "მაღაზია • SOCAR",
  },
];

const regions = ["ყველა", "თბილისი", "ბათუმი", "რეგიონები"];

const videos = [
  {
    src: "/media/waymart-moment-01.mp4",
    title: "დილა Way Mart-ში",
  },
  {
    src: "/media/waymart-moment-02.mp4",
    title: "ერთი ცვლა — ბევრი ამბავი",
  },
  {
    src: "/media/waymart-moment-03.mp4",
    title: "ყავა, თაროები და ყოველდღიური ტემპი",
  },
  {
    src: "/media/waymart-moment-04.mp4",
    title: "Way Mart შენს ქალაქში",
  },
];

type Vacancy = { title: string; detail: string; url: string };

const fallbackVacancies: Vacancy[] = [
  { title: "მოლარე-კონსულტანტი", detail: "თბილისი • სრული განაკვეთი", url: SELF_URL },
  { title: "მოლარე-კონსულტანტი", detail: "რეგიონები • სრული განაკვეთი", url: SELF_URL },
];

export default function CareerPage() {
  const [region, setRegion] = useState("ყველა");
  const [activeVideo, setActiveVideo] = useState<number | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [vacancies, setVacancies] = useState<Vacancy[]>(fallbackVacancies);

  useEffect(() => {
    let active = true;
    const updateVacancies = async () => {
      try {
        const response = await fetch("/api/jobs", { cache: "no-store" });
        const data = await response.json() as { vacancies?: Vacancy[] };
        if (active && Array.isArray(data.vacancies) && data.vacancies.length) setVacancies(data.vacancies);
      } catch {
        // Keep the useful fallback list visible while Selfrecruit is unavailable.
      }
    };
    updateVacancies();
    const timer = window.setInterval(updateVacancies, 300000);
    return () => { active = false; window.clearInterval(timer); };
  }, []);

  const shownLocations = locations.filter(
    (location) =>
      region === "ყველა" ||
      (region === "რეგიონები"
        ? !["თბილისი", "ბათუმი"].includes(location.city)
        : location.city === region)
  );

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <a href="#top" className={styles.brand} aria-label="Way Mart Careers">
          <img src="/waymart-logo.jpg" alt="Way Mart" />
          <span>CAREERS</span>
        </a>

        <nav
          className={`${styles.nav} ${menuOpen ? styles.navOpen : ""}`}
          aria-label="მთავარი ნავიგაცია"
        >
          <a onClick={() => setMenuOpen(false)} href="#story">
            ჩვენი ამბავი
          </a>

          <a onClick={() => setMenuOpen(false)} href="#moments">
            გუნდის მომენტები
          </a>

          <a onClick={() => setMenuOpen(false)} href="#locations">
            ლოკაციები
          </a>

          <a onClick={() => setMenuOpen(false)} href="#roles">
            ვაკანსიები
          </a>
        </nav>

        <a
          className={styles.applyTop}
          href={SELF_URL}
          target="_blank"
          rel="noreferrer"
        >
          შეავსე განაცხადი <ArrowUpRight size={16} />
        </a>

        <button
          className={styles.menuButton}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="მენიუ"
        >
          {menuOpen ? <X /> : <Menu />}
        </button>
      </header>

      <section className={styles.hero} id="top">
        <div className={styles.heroWords}>
          <div className={styles.kicker}>
            <span /> SOCAR-ის გზაზე • WAY MART
          </div>

          <h1>
            კარგი სამსახური კარგი
            <br />
            <i>გუნდით</i> იწყება.
          </h1>

          <p>
            Way Mart-ში დღე სწრაფად გადის — ბევრი მომხმარებელი,საქმე
            და გუნდი, რომელიც ყველაფერს ერთად უმკლავდება. თუ ეს ტემპი შენია,
            შემოგვიერთდი.
          </p>

          <div className={styles.heroActions}>
            <a className={styles.primary} href="#roles">
              იპოვე შენი პოზიცია <ArrowRight size={18} />
            </a>

            <a className={styles.textLink} href="#story">
              გაიცანი Way Mart <ArrowDownRight size={18} />
            </a>
          </div>

          <div className={styles.heroFact}>
            <MapPin size={18} />

            <span>
              Way Mart-ის მაღაზიები SOCAR-ის სადგურებზე
              <br />
              <b>თბილისი • ბათუმი • რეგიონები</b>
            </span>
          </div>
        </div>

        <div className={styles.heroMedia}>
          <img
            src="/media/waymart-hero.png"
            alt="Way Mart-ის მომხმარებლები მაღაზიის წინ"
          />

          <div className={styles.photoCaption}>
            <span>WAY MART</span>

            <b>
              შენი მეგობარი
              <br />
              გზაზე.
            </b>
          </div>

          <div className={styles.orangeTag}>
            ერთი ცვლა.
            <br />
            ბევრი მომენტი. ✦
          </div>
        </div>
      </section>

      <div className={styles.marquee} aria-hidden="true">
        <div>
          ყავა <i>✦</i> მოძრაობა <i>✦</i> ადამიანები <i>✦</i> გუნდი{" "}
          <i>✦</i> ყავა <i>✦</i> მოძრაობა <i>✦</i> ადამიანები <i>✦</i>{" "}
          გუნდი <i>✦</i>
        </div>
      </div>

      <section className={styles.roles} id="roles">
        <div>
          <span>01 / შემოუერთდი გუნდს</span>
          <h2>სად აგრძელებ შენს<br />კარიერულ <em>გზას?</em></h2>
          <p className={styles.liveJobs}>ვაკანსიები ავტომატურად ახლდება Way Mart-ის ოფიციალური გვერდიდან.</p>
          <a
            className={`${styles.wheelInvite} ${styles.rolesWheel}`}
            href="/recruit-win?mode=demo"
            aria-label="დაატრიალე Recruit and Win-ის ბორბალი"
          >
            <span className={styles.wheelInviteLabel}>RECRUIT &amp; WIN</span>
            <span className={styles.wheelPointer} />
            <span className={styles.wheelPreview}>
              <span>50₾<small>ვაუჩერი</small></span>
              <b>დაატრიალე<small>3 ცდა</small></b>
            </span>
            <span className={styles.wheelInviteCta}>
              ბორბლის დატრიალება <ArrowUpRight size={15} />
            </span>
          </a>
        </div>

        <div className={styles.roleList}>
          {vacancies.map((vacancy, index) => (
            <a href={vacancy.url} target="_blank" rel="noreferrer" key={vacancy.url}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <div><b>{vacancy.title}</b><small>{vacancy.detail}</small></div>
              <ArrowUpRight />
            </a>
          ))}
          <a href="/recruit-win">
            <span>{String(vacancies.length + 1).padStart(2, "0")}</span>
            <div><b>Recruit &amp; Win</b><small>გაუზიარე ვაკანსია მეგობარს და გაიგე მეტი</small></div>
            <ArrowRight />
          </a>
        </div>
      </section>

      <section className={styles.story} id="story">
        <div className={styles.sectionIntro}>
          <span>01 / მეტი ვიდრე "მარკეტების სქელი"</span>

          <h2>
            ადგილი, სადაც
            <br />
            დღეს თავისი <em>ტემპი აქვს.</em>
          </h2>

          <p>
            Way Mart არის SOCAR-ის სადგურებზე არსებული თანამედროვე convenience
            store — ყავა, ჰოთდოგი და ყველაზე განსხვავებული პროდუქტები ერთ სივრცეში.
            აქ დღე შეიძლება მშვიდად დაიწყოს და რამდენიმე წუთში 
            აჩქარდეს.
          </p>
        </div>

        <div className={styles.storyGrid}>
          <article className={`${styles.imageCard} ${styles.interiorCard}`}>
            <img
              src="/media/waymart-socar-interior.png"
              alt="SOCAR Way Mart-ის ინტერიერი"
            />

            <div>
              <small>ყოველდღიური ტემპი</small>

              <b>
                კარგი მომსახურება
                <br />
                პატარა დეტალებით იწყება.
              </b>
            </div>
          </article>

          <article className={styles.statementCard}>
            <Coffee size={33} />

            <p>
              „ყველაზე დატვირთულ დღესაც მნიშვნელოვანია, როგორ ხვდები მომხმარებელს.“
            </p>

            <span>WAY MART</span>
          </article>

          <article className={`${styles.imageCard} ${styles.loungeCard}`}>
            <img
              src="/media/waymart-lounge.png"
              alt="Way Mart-ის კომფორტული სივრცე"
            />

            <div>
              <small>ჩვენი სივრცე</small>

              <b>
                მცირე პაუზა
                <br />
                გზაში.
              </b>
            </div>
          </article>
        </div>
      </section>

      <section className={styles.moments} id="moments">
        <div className={styles.momentHead}>
          <div>
            <span>02 / გუნდის მომენტები</span>

            <h2>
              ნახე, როგორია
              <br />
              ერთი დღე Way Mart-ში.
            </h2>
          </div>

          <p>
            აქ ყოველთვის რაღაც ხდება.
            <br />
            <br />
            ვიღაც ყავას ელოდება.
            <br />
            ვიღაცა არჩევანს ვერ აკეთებს.
            <br />
            ვიღაც უკვე ნაცნობი მომხმარებელია.
            <br />
            ვიღაცისთვის კი ეს შეიძლება პირველი სამუშაო დღე იყოს.
            <br />
            <br />
            ამ ყველაფერს კი შგუნდი ამოძრავებს — ადამიანები, რომლებიც ერთმანეთს
            ეხმარებიან და დღის ტემპს ერთად მიჰყვებიან.
          </p>
        </div>

        <div className={styles.videoRail}>
          {videos.map((video, index) => (
            <button
              onClick={() => setActiveVideo(index)}
              className={styles.videoCard}
              key={video.src}
            >
              <video
                src={video.src}
                muted
                autoPlay
                loop
                playsInline
                preload="metadata"
              />

              <span className={styles.play}>
                <CirclePlay size={25} />
              </span>

              <div>
                <small>VIDEO 0{index + 1}</small>
                <b>{video.title}</b>
              </div>
            </button>
          ))}
        </div>
      </section>

      <section className={styles.conditions}>
        <div className={styles.conditionsPhoto}>
          <img
            src="/media/waymart-night.png"
            alt="Way Mart-ის ღამის ფილიალი"
          />

          <div>
            ბევრი
            <br />
            მოძრაობა.
            <br />
            <i>ერთი გუნდი.</i>
          </div>
        </div>

        <div className={styles.conditionsCopy}>
          <span>03 / რას გთავაზობთ</span>

          <h2>
            ყველაფერი, რაც
            <br />
            სამუშაო დღეს <em>ამარტივებს.</em>
          </h2>

          <div className={styles.benefits}>
            <div>
              <HeartHandshake />

              <b>ჯანმრთელობის დაზღვევა</b>

              <p>
                ჯანმრთელობის დაზღვევა — ვაკანსიის პირობების მიხედვით.
              </p>
            </div>

            <div>
              <Clock3 />

              <b>გრაფიკის შეთანხმება</b>

              <p>
                სამუშაო საათებისა და დღეების შეთანხმების შესაძლებლობა.
              </p>
            </div>

            <div>
              <Sparkles />

              <b>შვებულება და ბონუსები</b>

              <p>
                ანაზღაურებადი შვებულება, ბიულეტენი და შესაბამისი ბონუსები.
              </p>
            </div>

            <div>
              <MapPin />

              <b>ტრანსპორტის ბარათი</b>

              <p>
                თბილისში — საზოგადოებრივი ტრანსპორტის ულიმიტო ბარათი,
                ვაკანსიის პირობების მიხედვით.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.locationSection} id="locations">
        <div className={styles.locationIntro}>
          <div>
            <span>04 / სად იმუშავებ</span>

            <h2>
              შენი ქალაქი.
              <br />
              <em>შენი Way Mart.</em>
            </h2>
          </div>

          <p>
            Way Mart-ის მაღაზიები SOCAR-ის სადგურებზე თბილისსა და საქართველოს
            სხვადასხვა ქალაქშია.
            <br />
            <br />
            ნახე სად ვართ და აირჩიე შენთვის მოსახერხებელი ადგილი.
          </p>
        </div>

        <div className={styles.locationControls}>
          {regions.map((item) => (
            <button
              onClick={() => setRegion(item)}
              className={item === region ? styles.activeFilter : ""}
              key={item}
            >
              {item}
            </button>
          ))}

          <a
            href="https://sgp.ge/en/service-centers"
            target="_blank"
            rel="noreferrer"
          >
            სრული რუკა <ArrowUpRight size={16} />
          </a>
        </div>

        <div className={styles.locationCards}>
          {shownLocations.map((location, index) => (
            <article key={location.title}>
              <span>0{index + 1}</span>

              <MapPin />

              <div>
                <small>{location.tag}</small>

                <h3>
                  {location.city} — {location.title}
                </h3>

                <p>{location.address}</p>
              </div>

              <ChevronRight />
            </article>
          ))}
        </div>

        <p className={styles.sourceNote}>
          ლოკაციების სრული ჩამონათვალი იხილე{" "}
          <a
            href="https://sgp.ge/en/service-centers"
            target="_blank"
            rel="noreferrer"
          >
            SOCAR-ის ოფიციალურ რუკაზე
          </a>
          .
        </p>
      </section>

      <section className={styles.cta}>
        <img
          src="/media/waymart-station.png"
          alt="SOCAR-ის სადგური და Way Mart"
        />

        <div>
          <span>შემოგვიერთდი</span>

          <h2>
            იქნებ შემდეგი ცვლა
            <br />
            უკვე შენია.
          </h2>

          <p>
            ნახე მიმდინარე ვაკანსიები, აირჩიე შენთვის მოსახერხებელი ლოკაცია და
            შეავსე განაცხადი.
          </p>

          <a
            className={styles.primary}
            href={SELF_URL}
            target="_blank"
            rel="noreferrer"
          >
            შეავსე განაცხადი <ArrowUpRight size={18} />
          </a>
        </div>
      </section>

      <footer className={styles.footer}>
        <div className={styles.brand}>
          <img src="/waymart-logo.jpg" alt="Way Mart" />
          <span>CAREERS</span>
        </div>

        <p>Way Mart — ადგილი, სადაც კარგი დღე გუნდით იწყება.</p>

        <a href={SELF_URL} target="_blank" rel="noreferrer">
          შეავსე განაცხადი ↗
        </a>
      </footer>

      {activeVideo !== null && (
        <div
          className={styles.videoModal}
          role="dialog"
          aria-modal="true"
          aria-label={videos[activeVideo].title}
        >
          <button
            onClick={() => setActiveVideo(null)}
            aria-label="ვიდეოს დახურვა"
          >
            <X />
          </button>

          <video
            src={videos[activeVideo].src}
            controls
            autoPlay
            playsInline
          />
        </div>
      )}
    </main>
  );
}
