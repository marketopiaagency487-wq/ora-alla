"use client";

import { useState } from "react";
import { site, products, waLink } from "@/lib/site";
import { track } from "@/lib/track";
import { Reveal, Heading } from "./ui";

const interests = [
  "شقة غرفة",
  "شقة غرفتين",
  "شقة 3 غرف",
  "عيادة",
];

const WaIcon = () => (
  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
    <path d="M17.5 14.4c-.3-.1-1.8-.9-2-1s-.5-.1-.7.1-.8 1-1 1.2-.4.2-.6.1a8 8 0 0 1-2.4-1.5 9 9 0 0 1-1.6-2.1c-.2-.3 0-.5.1-.6l.5-.5.3-.5a.6.6 0 0 0 0-.5l-.9-2.2c-.2-.6-.5-.5-.7-.5h-.6a1.1 1.1 0 0 0-.8.4 3.4 3.4 0 0 0-1.1 2.5 5.9 5.9 0 0 0 1.2 3.1 13.5 13.5 0 0 0 5.2 4.6c1.9.8 2.7.9 3.6.7a3.1 3.1 0 0 0 2-1.4 2.5 2.5 0 0 0 .2-1.4c-.1-.2-.3-.3-.6-.4ZM12 21.8a9.9 9.9 0 0 1-5-1.4l-.4-.2-3.7 1 1-3.6-.2-.4A9.8 9.8 0 1 1 12 21.8Zm8.4-18.2A11.8 11.8 0 0 0 1.8 17.8L.1 24l6.3-1.7a11.8 11.8 0 0 0 5.6 1.4A11.8 11.8 0 0 0 20.4 3.6Z" />
  </svg>
);
const PhoneIcon = () => (
  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2Z" />
  </svg>
);

/** صندوق التواصل: واتساب أو مكالمة فقط — بدون فورم */
export default function LeadForm({ compact = false }: { compact?: boolean }) {
  const [pick, setPick] = useState<string | null>(null);

  const msg = pick
    ? `مهتم بـ ${pick} في سولانا إيست لين من أورا على التسعين الجنوبي. برجاء إرسال الأسعار والمتاح.`
    : "مهتم بسولانا إيست لين من أورا على التسعين الجنوبي. برجاء إرسال الأسعار والمتاح.";

  const box = (
    <div>
      <p className="text-sm text-ink/70">مهتم بإيه؟ (اختياري)</p>
      <div className="mt-3 grid grid-cols-2 gap-2">
        {interests.map((i) => (
          <button
            key={i}
            type="button"
            aria-pressed={pick === i}
            onClick={() => setPick(pick === i ? null : i)}
            className={`rounded-full px-3 py-2.5 text-sm transition ${
              pick === i
                ? "bg-ink text-paper"
                : "border border-sand-2 bg-white text-ink/75 hover:border-brass"
            }`}
          >
            {i}
          </button>
        ))}
      </div>

      <a
        href={waLink(msg)}
        target="_blank"
        rel="noopener"
        onClick={() => track("whatsapp")}
        className="mt-5 flex w-full items-center justify-center gap-2.5 rounded-full bg-[#1f9d55] py-3.5 font-semibold text-white transition hover:bg-[#1a8a4a]"
      >
        <WaIcon />
        كلمنا واتساب
      </a>
      <a
        href={`tel:${site.phoneIntl}`}
        onClick={() => track("call")}
        className="mt-3 flex w-full items-center justify-center gap-2.5 rounded-full bg-ink py-3.5 font-semibold text-paper transition hover:bg-ink-2"
      >
        <PhoneIcon />
        اتصل الآن <span className="num">{site.phoneDisplay}</span>
      </a>

      <p className="mt-4 text-xs leading-6 text-ink/50">
        فريق {site.agency} — وسيط عقاري معتمد ولسنا الموقع الرسمي للمطور.
      </p>
    </div>
  );

  if (compact) return box;

  return (
    <section id="lead" className="bg-sand/40 py-20">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 lg:grid-cols-2">
        <Reveal>
          <Heading
            eyebrow="Contact Us"
            title="كلمنا واستلم أسعار الإطلاق"
            sub="ابعتلنا واتساب أو كلمنا مباشرة، وهنبعتلك أسعار الإطلاق والمساحات المتاحة وخطوات دفع جدية الحجز."
          />
          <ul className="mt-8 space-y-3 text-[15px] text-ink/75">
            {products.map((p) => (
              <li key={p.slug} className="flex gap-3">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brass" />
                {p.name}: {p.scarcity}
              </li>
            ))}
            <li className="flex gap-3">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brass" />
              جدية حجز 5% — طرح جديد والمتاح محدود
            </li>
          </ul>
          <p className="mt-8 text-sm text-ink/55">رقم المبيعات</p>
          <a
            href={`tel:${site.phoneIntl}`}
            onClick={() => track("call")}
            className="num mt-1 inline-block text-3xl text-ink transition hover:text-brass"
          >
            {site.phoneDisplay}
          </a>
        </Reveal>

        <Reveal delay={70}>
          <div className="slab p-7 shadow-sm">{box}</div>
        </Reveal>
      </div>
    </section>
  );
}
