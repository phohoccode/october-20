"use client";

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type MouseEvent,
  type ReactNode,
} from "react";
import { greeting } from "@/config/greeting";
import { Bouquet, Flower, FlowerGarden } from "./botanical";

function Icon({
  name,
  size = 18,
}: {
  name:
    | "arrow"
    | "heart"
    | "music"
    | "settings"
    | "close"
    | "flower"
    | "sparkle";
  size?: number;
}) {
  const paths: Record<typeof name, ReactNode> = {
    arrow: <path d="M4 12h15m-5-5 5 5-5 5" />,
    heart: (
      <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8Z" />
    ),
    music: (
      <>
        <path d="M9 18V5l12-2v13M9 8l12-2" />
        <ellipse cx="6" cy="18" rx="3" ry="3" />
        <ellipse cx="18" cy="16" rx="3" ry="3" />
      </>
    ),
    settings: (
      <>
        <path d="M4 7h16M4 17h16" />
        <circle cx="9" cy="7" r="3" fill="currentColor" />
        <circle cx="15" cy="17" r="3" fill="currentColor" />
      </>
    ),
    close: <path d="m6 6 12 12M6 18 18 6" />,
    flower: (
      <>
        <path d="M12 21V11m0 7c-5 0-7-3-7-3 4-1 7 3 7 3Zm0-3c5 0 7-4 7-4-4 0-7 4-7 4Z" />
        <path d="M7 3c2 0 4 2 5 4 1-2 3-4 5-4 2 6-1 9-5 9S5 9 7 3Z" />
      </>
    ),
    sparkle: (
      <>
        <path d="m12 3 2.6 6.4L21 12l-6.4 2.6L12 21l-2.6-6.4L3 12l6.4-2.6L12 3Z" />
        <path d="m20 2 .7 1.3L22 4l-1.3.7L20 6l-.7-1.3L18 4l1.3-.7L20 2Z" />
      </>
    ),
  };
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[name]}
    </svg>
  );
}

function FallingPetals({ enabled, count = greeting.effects.petalCount }: { enabled: boolean; count?: number }) {
  if (!enabled) return null;
  return (
    <div className="falling-petals" aria-hidden="true">
      {Array.from(
        { length: Math.min(count, 24) },
        (_, i) => (
          <span
            key={i}
            style={
              {
                "--left": `${(i * 37 + 11) % 100}%`,
                "--duration": `${13 + (i % 6) * 2}s`,
                "--delay": `${-i * 2.7}s`,
                "--size": `${7 + (i % 4) * 3}px`,
                "--drift": `${i % 2 === 0 ? 100 : -95}px`,
              } as CSSProperties
            }
          />
        ),
      )}
    </div>
  );
}

function Modal({
  title,
  children,
  onClose,
  className = "",
}: {
  title: string;
  children: ReactNode;
  onClose: () => void;
  className?: string;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const dialog = dialogRef.current;
    const previous = document.activeElement as HTMLElement | null;
    dialog?.showModal();
    return () => {
      dialog?.close();
      previous?.focus();
    };
  }, []);
  return (
    <dialog
      ref={dialogRef}
      className={`gift-dialog ${className}`}
      aria-labelledby="dialog-title"
      onCancel={onClose}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className="dialog-inner">
        <button
          className="icon-button dialog-close"
          aria-label="Đóng"
          onClick={onClose}
        >
          <Icon name="close" />
        </button>
        <h2 id="dialog-title" className="sr-only">
          {title}
        </h2>
        {children}
      </div>
    </dialog>
  );
}

function MusicToggle() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [notice, setNotice] = useState("");
  useEffect(
    () => () => {
      audioRef.current?.pause();
    },
    [],
  );
  async function toggleMusic() {
    if (!greeting.music.src) {
      setNotice("Món quà đang ở chế độ yên tĩnh. Em chưa thêm nhạc nền.");
      return;
    }
    if (!audioRef.current) {
      audioRef.current = new Audio(greeting.music.src);
      audioRef.current.loop = true;
      audioRef.current.volume = Math.max(0, Math.min(greeting.music.volume, 1));
      audioRef.current.addEventListener("error", () => {
        setPlaying(false);
        setNotice("Chưa tải được nhạc. Chị vẫn có thể xem món quà nhé.");
      });
    }
    if (playing) {
      audioRef.current.pause();
      setPlaying(false);
    } else {
      try {
        await audioRef.current.play();
        setPlaying(true);
        setNotice("");
      } catch {
        setPlaying(false);
        setNotice("Chưa phát được nhạc. Chị thử lại sau nhé.");
      }
    }
  }
  return (
    <div className="music-control">
      <button
        className="utility-button"
        onClick={toggleMusic}
        aria-pressed={playing}
      >
        <Icon name="music" />
        <span>{playing ? "Nhạc: đang phát" : "Nhạc: tắt"}</span>
      </button>
      {notice && (
        <div className="music-notice" role="status">
          <p>{notice}</p>
          <button
            onClick={() => setNotice("")}
            aria-label="Đóng thông báo nhạc"
          >
            <Icon name="close" size={14} />
          </button>
        </div>
      )}
    </div>
  );
}

export default function GiftExperience() {
  const [opened, setOpened] = useState(false);
  const [opening, setOpening] = useState(false);
  const [readAll, setReadAll] = useState(false);
  const [petals, setPetals] = useState(greeting.effects.petals);
  const [cursor, setCursor] = useState(greeting.effects.cursor);
  const [settings, setSettings] = useState(false);
  const [modal, setModal] = useState<"card" | "bouquet" | "final" | null>(null);
  const [wish, setWish] = useState(-1);
  const [flowerMessage, setFlowerMessage] = useState("");
  const [hearts, setHearts] = useState<{ id: number; x: number; y: number }[]>(
    [],
  );
  const mainRef = useRef<HTMLElement>(null);
  const introTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const heartsTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const messageTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const heartId = useRef(0);

  useEffect(
    () => () => {
      if (introTimer.current) clearTimeout(introTimer.current);
      if (heartsTimer.current) clearTimeout(heartsTimer.current);
      if (messageTimer.current) clearTimeout(messageTimer.current);
    },
    [],
  );

  useEffect(() => {
    if (opened) mainRef.current?.focus();
  }, [opened]);

  function openGift() {
    setOpening(true);
    introTimer.current = setTimeout(
      () => {
        setOpened(true);
        window.scrollTo({ top: 0 });
      },
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 550,
    );
  }
  function randomWish() {
    setWish((current) => {
      const count = greeting.wishes.length;
      if (count <= 1) return 0;
      return (
        (Math.max(current, 0) + 1 + Math.floor(Math.random() * (count - 1))) %
        count
      );
    });
  }
  function showFlowerMessage(index: number) {
    setFlowerMessage(greeting.wishes[index % greeting.wishes.length]);
    if (messageTimer.current) clearTimeout(messageTimer.current);
    messageTimer.current = setTimeout(() => setFlowerMessage(""), 5500);
  }
  function touchGarden(event: MouseEvent<HTMLDivElement>) {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const id = ++heartId.current;
    setHearts([
      { id, x: event.clientX - bounds.left, y: event.clientY - bounds.top },
    ]);
    if (heartsTimer.current) clearTimeout(heartsTimer.current);
    heartsTimer.current = setTimeout(() => setHearts([]), 1500);
  }
  function parallax(event: MouseEvent<HTMLDivElement>) {
    if (
      !cursor ||
      !window.matchMedia(
        "(pointer: fine) and (prefers-reduced-motion: no-preference)",
      ).matches
    )
      return;
    const bounds = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty(
      "--px",
      `${(event.clientX - bounds.left - bounds.width / 2) / 55}px`,
    );
    event.currentTarget.style.setProperty(
      "--py",
      `${(event.clientY - bounds.top - bounds.height / 2) / 75}px`,
    );
  }

  return (
    <div className={`experience ${opened ? "is-open" : ""}`}>
      <FallingPetals enabled={petals} />
      <header className="site-header">
        <a
          className="wordmark"
          href="#top"
          aria-label="Tháng Mười — về đầu trang"
        >
          <Icon name="flower" size={25} />
          <span>
            tháng Mười<span className="wordmark-dot">.</span>
          </span>
        </a>
        <span className="header-dedication">
          MỘT MÓN QUÀ, DÀNH RIÊNG CHO{" "}
          {greeting.recipient.toLocaleUpperCase("vi")}
        </span>
        <div className="header-controls">
          <MusicToggle />
          <div className="settings-control">
            <button
              className="utility-button settings-toggle"
              onClick={() => setSettings(!settings)}
              aria-expanded={settings}
              aria-controls="effect-settings"
              aria-label="Cài đặt hiệu ứng"
            >
              <Icon name="settings" />
              <span>Hiệu ứng</span>
            </button>
            {settings && (
              <div className="settings-panel" id="effect-settings">
                <p>Một chút nhẹ nhàng</p>
                <button
                  role="switch"
                  aria-checked={petals}
                  onClick={() => setPetals(!petals)}
                >
                  <span>Cánh hoa bay</span>
                  <span className={`switch ${petals ? "on" : ""}`}>
                    {petals ? "Bật" : "Tắt"}
                  </span>
                </button>
                <button
                  role="switch"
                  aria-checked={cursor}
                  onClick={() => setCursor(!cursor)}
                >
                  <span>Gió theo con trỏ</span>
                  <span className={`switch ${cursor ? "on" : ""}`}>
                    {cursor ? "Bật" : "Tắt"}
                  </span>
                </button>
                <small>Chuyển động tự giảm theo cài đặt thiết bị.</small>
              </div>
            )}
          </div>
        </div>
      </header>

      {!opened ? (
        <main
          id="top"
          className={`intro-screen ${opening ? "intro-opening" : ""}`}
        >
          <span className="intro-date">
            20 <span>♡</span> 10
          </span>
          <div className="intro-art">
            <div className="art-oval" />
            <span className="art-note">a little love, just for you</span>
            <Bouquet />
            <span className="art-sparkle sparkle-one">✧</span>
            <span className="art-sparkle sparkle-two">✧</span>
          </div>
          <div className="intro-copy">
            <p className="eyebrow">GỬI CHỊ, NHÂN MỘT NGÀY THẬT ĐẶC BIỆT</p>
            <h1>{greeting.intro}</h1>
            <p className="intro-subtitle">{greeting.introSubtitle}</p>
            <button
              className="button primary"
              onClick={openGift}
              disabled={opening}
            >
              Mở món quà <span className="beating-heart">♡</span>
              <Icon name="arrow" />
            </button>
            <p className="intro-footnote">
              Được gói bằng tất cả sự chân thành.
            </p>
          </div>
          <span className="intro-bottom">HAPPY VIETNAMESE WOMEN’S DAY</span>
        </main>
      ) : (
        <main id="top" ref={mainRef} tabIndex={-1} className="main-content">
          <section className="greeting-hero" aria-labelledby="hero-title">
            <div className="hero-copy">
              <p className="eyebrow">
                <span className="tiny-line" />
                20 THÁNG 10 · NGÀY CỦA CHỊ
              </p>
              <h1 id="hero-title">
                {greeting.heroTitle.before}
                <br />
                <em>{greeting.heroTitle.emphasis}</em>
                <br />
                {greeting.heroTitle.after}<span className="title-star">✧</span>
              </h1>
              <p className="hero-description">
                Có những điều đẹp đẽ chẳng cần thật lớn lao.
                <br className="desktop-break" /> Như một bông hoa. Một lời chúc.
                Và chị.
              </p>
              <button
                className="button primary"
                onClick={() => {
                  setReadAll(true);
                  document
                    .getElementById("loi-chuc")
                    ?.scrollIntoView({
                      behavior: window.matchMedia(
                        "(prefers-reduced-motion: reduce)",
                      ).matches
                        ? "instant"
                        : "smooth",
                      block: "start",
                    });
                }}
              >
                Đọc lời chúc <Icon name="arrow" />
              </button>
              <p className="hero-signoff">
                <span className="small-heart">♡</span> Từ em, với thật nhiều yêu
                thương
              </p>
            </div>
            <div
              className="hero-art"
              onMouseMove={parallax}
              onMouseLeave={(event) => {
                event.currentTarget.style.setProperty("--px", "0px");
                event.currentTarget.style.setProperty("--py", "0px");
              }}
            >
              <div className="hero-oval" />
              <span className="hero-date">
                20<span>·</span>10
              </span>
              <div
                className="parallax-bouquet"
                style={cursor ? undefined : { transform: "none" }}
              >
                <Bouquet />
              </div>
              <div className="flower-tag">
                <Icon name="heart" size={14} />
                <span>Một bó dịu dàng, gửi chị.</span>
              </div>
              <span className="hero-side-note">
                FLOWERS FADE, KINDNESS STAYS.
              </span>
            </div>
          </section>

          <section
            className="greeting-section"
            id="loi-chuc"
            aria-labelledby="greeting-title"
          >
            <div className="section-marker">
              <span>01</span>
              <div />
              <span>MẤY LỜI EM MUỐN NÓI</span>
            </div>
            <div className="greeting-layout">
              <div className="greeting-heading">
                <p className="eyebrow">CHÚC MỪNG NGÀY</p>
                <h2 id="greeting-title">
                  Phụ nữ Việt Nam
                  <br />
                  <em>20/10</em>
                </h2>
                <p className="english-note">{greeting.subtitle}</p>
                <div className="small-flower">
                  <Flower kind="tulip" color="pink" />
                </div>
              </div>
              <div className={`greeting-letter ${readAll ? "show-all" : ""}`}>
                {greeting.greeting.map((paragraph, i) => (
                  <p
                    key={i}
                    style={{ "--delay": `${i * 0.18}s` } as CSSProperties}
                  >
                    {i === 0 && (
                      <span className="letter-salutation">
                        Gửi {greeting.recipient} thân mến,
                      </span>
                    )}
                    {paragraph}
                  </p>
                ))}
                <p className="letter-ending">
                  Chị xứng đáng với những điều dịu dàng nhất. <span>♡</span>
                </p>
              </div>
            </div>
          </section>

          <section className="garden-section" aria-labelledby="garden-title">
            <div className="section-marker">
              <span>02</span>
              <div />
              <span>MỘT KHU VƯỜN NHỎ, MỘT TẤM LÒNG TO</span>
            </div>
            <div className="section-heading">
              <p className="eyebrow">ĐỂ HOA THAY EM NÓI</p>
              <h2 id="garden-title">
                Có một khu vườn <em>dành cho chị</em>
              </h2>
              <p>Mỗi bông hoa là một lời chúc. Chị thử chạm vào nhé.</p>
            </div>
            <div className="garden-scene" onClick={touchGarden}>
              <div className="garden-glow" />
              <span className="garden-light light-one" />
              <span className="garden-light light-two" />
              <span className="garden-light light-three" />
              <div className="greeting-card">
                <div className="card-topline">
                  <span>GỬI CHỊ</span>
                  <Icon name="heart" size={16} />
                  <span>20.10</span>
                </div>
                <div className="card-flower">
                  <Flower kind="rose" color="pink" />
                </div>
                <p className="card-headline">
                  Một chút dịu dàng
                  <br />
                  của <em>tháng Mười</em>
                </p>
                <p className="card-description">
                  Có những lời em muốn viết riêng cho chị…
                </p>
                <button
                  className="button card-button"
                  onClick={() => setModal("card")}
                >
                  Mở tấm thiệp <Icon name="arrow" />
                </button>
                <span className="card-stamp">with love</span>
              </div>
              <FlowerGarden onFlower={showFlowerMessage} />
              {hearts.map((heart) => (
                <div
                  key={heart.id}
                  className="heart-burst"
                  style={{ left: heart.x, top: heart.y }}
                  aria-hidden="true"
                >
                  <span>♡</span>
                  <span>♡</span>
                  <span>♡</span>
                </div>
              ))}
            </div>
            <div className="flower-message" role="status" aria-live="polite">
              {flowerMessage || "Một bông hoa nhỏ, một niềm vui vừa đủ."}
            </div>
          </section>

          <section className="little-gifts" aria-labelledby="gifts-title">
            <div className="gifts-intro">
              <p className="eyebrow">YÊU THƯƠNG THÌ CHẲNG BAO GIỜ THỪA</p>
              <h2 id="gifts-title">
                Và thêm một chút <em>niềm vui…</em>
              </h2>
            </div>
            <div className="gifts-actions">
              <button
                className="button primary"
                onClick={() => setModal("bouquet")}
              >
                <Icon name="flower" />
                Tặng chị một bó hoa
                <Icon name="arrow" />
              </button>
              <button className="button secondary" onClick={randomWish}>
                <Icon name="heart" />
                Một lời chúc nhỏ
              </button>
            </div>
            <div className="random-wish" role="status" aria-live="polite">
              <span className="quote-mark">“</span>
              <p key={wish}>
                {wish < 0
                  ? "Một lời chúc đang đợi chị ở đây."
                  : greeting.wishes[wish]}
              </p>
              <span className="wish-dots" aria-hidden="true">
                · · ·
              </span>
            </div>
          </section>

          <section className="final-invitation">
            <Icon name="sparkle" size={26} />
            <p>Trước khi chị rời khu vườn nhỏ này…</p>
            <button className="text-button" onClick={() => setModal("final")}>
              Còn một điều em muốn gửi chị <Icon name="arrow" />
            </button>
          </section>
          <footer className="site-footer">
            <a className="wordmark" href="#top">
              <Icon name="flower" size={22} />
              <span>tháng Mười.</span>
            </a>
            <p>
              Made with love, dành riêng cho {greeting.recipient} <span>♡</span>
            </p>
            <span>20 / 10</span>
          </footer>
        </main>
      )}

      {modal === "card" && (
        <Modal
          title="Tấm thiệp dành riêng cho chị"
          onClose={() => setModal(null)}
          className="letter-dialog"
        >
          <p className="eyebrow">MỘT TẤM THIỆP, THẬT NHIỀU YÊU THƯƠNG</p>
          <div className="letter-flower">
            <Flower kind="tulip" />
          </div>
          <h3>{greeting.card.title}</h3>
          {greeting.card.paragraphs.map((p) => (
            <p className="card-paragraph" key={p}>
              {p}
            </p>
          ))}
          <p className="card-signature">{greeting.card.signature}</p>
          <button className="button secondary" onClick={() => setModal(null)}>
            Đóng tấm thiệp <Icon name="heart" />
          </button>
        </Modal>
      )}
      {modal === "bouquet" && (
        <Modal
          title="Bó hoa em tặng chị"
          onClose={() => setModal(null)}
          className="bouquet-dialog"
        >
          <FallingPetals enabled={petals} count={7} />
          <p className="eyebrow">MỘT BÓ HOA, THAY NGÀN LỜI CHÚC</p>
          <Bouquet />
          <h3>Hoa đẹp, dành cho {greeting.recipient}.</h3>
          <p>{greeting.bouquetMessage}</p>
          <button className="button primary" onClick={() => setModal(null)}>
            Chị nhận hoa nhé <Icon name="heart" />
          </button>
        </Modal>
      )}
      {modal === "final" && (
        <Modal
          title="Điều cuối cùng em muốn gửi chị"
          onClose={() => setModal(null)}
          className="final-dialog"
        >
          <FallingPetals enabled={petals} count={7} />
          <span className="final-date">20.10</span>
          <p className="eyebrow">HÔM NAY, VÀ CẢ NHỮNG NGÀY SAU</p>
          <h3>
            Mong chị luôn
            <br />
            <em>hạnh phúc.</em>
          </h3>
          <p className="final-message">{greeting.finalMessage}</p>
          <div className="final-flowers" aria-hidden="true">
            <Flower kind="tulip" color="cream" />
            <Flower kind="rose" />
            <Flower kind="tulip" />
          </div>
          <button className="button primary" onClick={() => setModal(null)}>
            Quay lại khu vườn <Icon name="arrow" />
          </button>
        </Modal>
      )}
      <noscript>
        <p className="noscript-message">
          Chị bật JavaScript để mở món quà tương tác nhé.{" "}
          {greeting.greeting.join(" ")}
        </p>
      </noscript>
    </div>
  );
}
