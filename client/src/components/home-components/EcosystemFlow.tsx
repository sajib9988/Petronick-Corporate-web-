"use client";

import { useMemo } from "react";

type Company = {
  id: string;
  name: string;
  description: string;
  logo: string;
  icon: string | null;
  website: string | null;
  revenueStage: string | null;
  order: number;
  isVisible: boolean;
};

const ICON_BG_POOL = [
  "from-blue-500 to-blue-700",
  "from-pink-500 to-pink-700",
  "from-emerald-500 to-emerald-700",
  "from-orange-500 to-orange-700",
  "from-amber-500 to-amber-700",
  "from-teal-500 to-teal-700",
  "from-rose-500 to-rose-700",
  "from-violet-500 to-violet-700",
];

const NAME_COLOR_POOL = [
  "text-blue-700",
  "text-pink-600",
  "text-emerald-700",
  "text-orange-600",
  "text-amber-700",
  "text-teal-700",
  "text-rose-600",
  "text-violet-700",
];

/* -------------------------------------------------------------------------- */
/* RADIAL SETTINGS                                                            */
/* -------------------------------------------------------------------------- */

/*
 * 10 companies-er jonno 39% radius beshi crowded chilo.
 *
 * Ekhon companies ke center theke aro baire niye jawa hocche.
 */
const RADIUS_X = 46;
const RADIUS_Y = 45;

/*
 * Center hub-er size.
 */
const CENTER_SIZE = 160;

/*
 * Company card size.
 *
 * 190px width rakha hocche jate long company name
 * unnecessarily tiny font-e na jay.
 */
const CARD_WIDTH = 188;

/* -------------------------------------------------------------------------- */
/* COMPANY NAME FONT SIZE                                                     */
/* -------------------------------------------------------------------------- */

function getCompanyNameFontSize(name: string) {
  const length = name.trim().length;

  if (length <= 15) return "12px";
  if (length <= 19) return "11.5px";
  if (length <= 24) return "10.5px";
  if (length <= 29) return "10px";
  return "9.5px";
}

/* -------------------------------------------------------------------------- */
/* CARD POSITION                                                               */
/* -------------------------------------------------------------------------- */

function getCardTransform(left: number, top: number) {
  let translateX = "-50%";
  let translateY = "-50%";

  /*
   * Right side:
   * card-er right edge anchor point-er sathe align hobe.
   */
  if (left > 58) {
    translateX = "-100%";
  }

  /*
   * Left side:
   * card-er left edge anchor point-er sathe align hobe.
   */
  if (left < 42) {
    translateX = "0%";
  }

  /*
   * Bottom:
   * card connection point-er upore thakbe.
   */
  if (top > 67) {
    translateY = "-100%";
  }

  /*
   * Top:
   * card connection point-er niche thakbe.
   */
  if (top < 33) {
    translateY = "0%";
  }

  return `translate(${translateX}, ${translateY})`;
}

/* -------------------------------------------------------------------------- */
/* COMPANY ICON                                                                */
/* -------------------------------------------------------------------------- */

function CompanyIcon({
  company,
  bg,
  className,
}: {
  company: Company;
  bg: string;
  className: string;
}) {
  if (company.icon) {
    return (
      <div
        className={`
          flex
          shrink-0
          items-center
          justify-center
          overflow-hidden
          rounded-lg
          border
          border-slate-200
          bg-white
          ${className}
        `}
      >
        <img
          src={company.icon}
          alt={`${company.name} icon`}
          className="h-full w-full object-contain p-1"
        />
      </div>
    );
  }

  return (
    <div
      className={`
        flex
        shrink-0
        items-center
        justify-center
        rounded-lg
        bg-gradient-to-tr
        ${bg}
        font-bold
        text-white
        ${className}
      `}
    >
      {company.name.charAt(0).toUpperCase()}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* MAIN COMPONENT                                                              */
/* -------------------------------------------------------------------------- */

export default function EcosystemFlow({
  companies,
}: {
  companies: Company[];
}) {
  const nodes = useMemo(() => {
    const total = companies.length || 1;

    return companies.map((company, index) => {
      /*
       * 12 o'clock theke start.
       *
       * Every company equal angle-e distribute hobe.
       */
      const angle =
        (index * 2 * Math.PI) / total - Math.PI / 2;

      /*
       * Company anchor point.
       */
      const left =
        50 + RADIUS_X * Math.cos(angle);

      const top =
        50 + RADIUS_Y * Math.sin(angle);

      /*
       * Direction vector.
       *
       * Eta use kore line center theke card-er dike
       * naturally point korbe.
       */
      const dx = Math.cos(angle);
      const dy = Math.sin(angle);

      /*
       * Arrow/card gap.
       *
       * Arrowhead card-er vitore dhukbe na.
       */
      const lineEndDistance = 0.91;

      const lineEndX =
        50 + (left - 50) * lineEndDistance;

      const lineEndY =
        50 + (top - 50) * lineEndDistance;

      /*
       * Center hub-er edge theke line start.
       *
       * 50% center theke hub radius বাদ দেওয়া হচ্ছে।
       */
      const centerRadiusPercent = 14;

      const lineStartX =
        50 + dx * centerRadiusPercent;

      const lineStartY =
        50 + dy * centerRadiusPercent;

      return {
        company,
        index,
        angle,
        left,
        top,
        lineStartX,
        lineStartY,
        lineEndX,
        lineEndY,
        cardTransform: getCardTransform(left, top),

        iconBg:
          ICON_BG_POOL[
            index % ICON_BG_POOL.length
          ],

        nameColor:
          NAME_COLOR_POOL[
            index % NAME_COLOR_POOL.length
          ],

        nameFontSize:
          getCompanyNameFontSize(company.name),
      };
    });
  }, [companies]);

  return (
    <>
      {/* ================================================================== */}
      {/* DESKTOP RADIAL ECOSYSTEM                                           */}
      {/* ================================================================== */}

      <div
        className="
          relative
          hidden
          h-[570px]
          w-full
          overflow-visible
          xl:block
          xl:h-[590px]
          2xl:h-[620px]
        "
      >
        {/* ================================================================ */}
        {/* CONNECTION LINES                                                 */}
        {/* ================================================================ */}

        <svg
          className="
            pointer-events-none
            absolute
            inset-0
            z-10
            h-full
            w-full
            overflow-visible
          "
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <defs>
            {/* ============================================================ */}
            {/* AMBER ARROW                                                   */}
            {/* ============================================================ */}

            <marker
              id="ecoArrow"
              viewBox="0 0 10 10"
              refX="8.5"
              refY="5"
              markerWidth="4.5"
              markerHeight="4.5"
              orient="auto"
              markerUnits="strokeWidth"
            >
              <path
                d="M 0 0 L 10 5 L 0 10 Z"
                fill="#f59e0b"
              />
            </marker>
          </defs>

          {/* ============================================================ */}
          {/* CENTER → COMPANY                                               */}
          {/* ============================================================ */}

          {nodes.map((node) => (
            <g key={`connection-${node.company.id}`}>
              {/* Main amber line */}

              <line
                x1={node.lineStartX}
                y1={node.lineStartY}
                x2={node.lineEndX}
                y2={node.lineEndY}
                stroke="#f59e0b"
                strokeWidth="0.28"
                strokeLinecap="round"
                strokeOpacity="0.75"
                vectorEffect="non-scaling-stroke"
                markerEnd="url(#ecoArrow)"
              />

              {/* Small dot near company connection */}

              <circle
                cx={node.lineEndX}
                cy={node.lineEndY}
                r="0.75"
                fill="#f59e0b"
              />
            </g>
          ))}

          {/* ============================================================ */}
          {/* CENTER DOT                                                     */}
          {/* ============================================================ */}

          <circle
            cx="50"
            cy="50"
            r="1.5"
            fill="#f59e0b"
          />
        </svg>

        {/* ================================================================ */}
        {/* CENTER HUB                                                       */}
        {/* ================================================================ */}

        <div
          className="
            absolute
            left-1/2
            top-1/2
            z-20
            h-36
            w-36
            -translate-x-1/2
            -translate-y-1/2
            xl:h-40
            xl:w-40
          "
        >
          <div
            className="
              flex
              h-full
              w-full
              flex-col
              items-center
              justify-center
              rounded-full
              bg-slate-950
              px-4
              text-center
              text-white
              shadow-xl
              shadow-slate-900/25
              ring-1
              ring-amber-500/40
            "
          >
            {/* P Logo */}

            <div
              className="
                mb-2
                flex
                h-8
                w-8
                items-center
                justify-center
                rounded-lg
                bg-gradient-to-tr
                from-amber-400
                to-amber-600
                font-serif
                text-base
                font-bold
                text-slate-950
              "
            >
              P
            </div>

            {/* Holding Company Name */}

            <div
              className="
                max-w-[130px]
                text-[8px]
                font-bold
                uppercase
                leading-tight
                tracking-wide
                xl:text-[9px]
              "
            >
              Petronick Corporate Holdings LLC
            </div>
          </div>
        </div>

        {/* ================================================================ */}
        {/* COMPANY CARDS                                                    */}
        {/* ================================================================ */}

        {nodes.map((node) => {
          const content = (
            <div
              className="
                flex
                h-[58px]
                w-full
                items-center
                gap-2.5
                rounded-xl
                border
                border-slate-200
                bg-white
                px-2.5
                shadow-sm
                transition-all
                duration-300
                hover:-translate-y-0.5
                hover:shadow-md
                xl:h-[60px]
                xl:px-3
              "
            >
              {/* ======================================================== */}
              {/* COMPANY ICON                                               */}
              {/* ======================================================== */}

              <CompanyIcon
                company={node.company}
                bg={node.iconBg}
                className="
                  h-9
                  w-9
                  text-xs
                  xl:h-10
                  xl:w-10
                "
              />

              {/* ======================================================== */}
              {/* COMPANY INFORMATION                                        */}
              {/* ======================================================== */}

              <div
                className="
                  min-w-0
                  flex-1
                  overflow-hidden
                "
              >
                {/* Company Name */}

                <div
                  className={`
                    whitespace-nowrap
                    font-bold
                    leading-none
                    tracking-[-0.015em]
                    ${node.nameColor}
                  `}
                  style={{
                    fontSize: node.nameFontSize,
                  }}
                  title={node.company.name}
                >
                  {node.index + 1}.{" "}
                  {node.company.name}
                </div>

                {/* Revenue Stage */}

                <div
                  className="
                    mt-1.5
                    whitespace-nowrap
                    text-[9px]
                    leading-none
                    text-slate-400
                    xl:text-[10px]
                  "
                >
                  {node.company.revenueStage ||
                    "Business Unit"}
                </div>
              </div>
            </div>
          );

          /* ============================================================== */
          /* WEBSITE AVAILABLE                                              */
          /* ============================================================== */

          if (node.company.website) {
            return (
              <a
                key={node.company.id}
                href={node.company.website}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Visit ${node.company.name}`}
                className="
                  absolute
                  z-30
                  block
                  w-[188px]
                  cursor-pointer
                  xl:w-[192px]
                "
                style={{
                  left: `${node.left}%`,
                  top: `${node.top}%`,
                  transform: node.cardTransform,
                }}
              >
                {content}
              </a>
            );
          }

          /* ============================================================== */
          /* NO WEBSITE                                                      */
          /* ============================================================== */

          return (
            <div
              key={node.company.id}
              className="
                absolute
                z-30
                w-[188px]
                xl:w-[192px]
              "
              style={{
                left: `${node.left}%`,
                top: `${node.top}%`,
                transform: node.cardTransform,
              }}
            >
              {content}
            </div>
          );
        })}
      </div>

      {/* ================================================================== */}
      {/* MOBILE / TABLET                                                    */}
      {/* ================================================================== */}

      <div className="xl:hidden">
        {/* ================================================================ */}
        {/* MOBILE CENTER HUB                                                */}
        {/* ================================================================ */}

        <div
          className="
            mx-auto
            mb-5
            flex
            w-fit
            max-w-full
            flex-col
            items-center
            rounded-2xl
            bg-slate-950
            px-6
            py-4
            text-center
            text-white
            shadow-lg
            ring-1
            ring-amber-500/40
          "
        >
          <div
            className="
              mb-1.5
              flex
              h-8
              w-8
              items-center
              justify-center
              rounded-lg
              bg-gradient-to-tr
              from-amber-400
              to-amber-600
              font-serif
              text-base
              font-bold
              text-slate-950
            "
          >
            P
          </div>

          <div
            className="
              text-[10px]
              font-bold
              uppercase
              tracking-wide
            "
          >
            Petronick Corporate Holdings LLC
          </div>
        </div>

        {/* ================================================================ */}
        {/* MOBILE COMPANY LIST                                              */}
        {/* ================================================================ */}

        <div className="space-y-2.5">
          {nodes.map((node) => {
            const content = (
              <>
                <CompanyIcon
                  company={node.company}
                  bg={node.iconBg}
                  className="
                    h-10
                    w-10
                    text-sm
                  "
                />

                <div
                  className="
                    min-w-0
                    flex-1
                    overflow-hidden
                  "
                >
                  <div
                    className={`
                      whitespace-nowrap
                      font-bold
                      leading-tight
                      ${node.nameColor}
                    `}
                    style={{
                      fontSize: node.nameFontSize,
                    }}
                  >
                    {node.index + 1}.{" "}
                    {node.company.name}
                  </div>

                  <div
                    className="
                      mt-1
                      whitespace-nowrap
                      text-[10px]
                      text-slate-400
                    "
                  >
                    {node.company.revenueStage ||
                      "Business Unit"}
                  </div>
                </div>

                {/* Amber connection dot */}

                <div
                  className="
                    h-2
                    w-2
                    shrink-0
                    rounded-full
                    bg-amber-500
                    ring-2
                    ring-amber-100
                  "
                />
              </>
            );

            if (node.company.website) {
              return (
                <a
                  key={node.company.id}
                  href={node.company.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Visit ${node.company.name}`}
                  className="
                    flex
                    items-center
                    gap-3
                    overflow-hidden
                    rounded-xl
                    border
                    border-slate-200
                    bg-white
                    p-3
                    shadow-sm
                    transition-all
                    duration-300
                    hover:-translate-y-0.5
                    hover:shadow-md
                  "
                >
                  {content}
                </a>
              );
            }

            return (
              <div
                key={node.company.id}
                className="
                  flex
                  items-center
                  gap-3
                  overflow-hidden
                  rounded-xl
                  border
                  border-slate-200
                  bg-white
                  p-3
                  shadow-sm
                "
              >
                {content}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}