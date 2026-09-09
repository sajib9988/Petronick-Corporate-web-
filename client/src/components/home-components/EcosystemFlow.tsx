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

interface EcosystemFlowProps {
  companies: Company[];
}

/*
|--------------------------------------------------------------------------
| Radial Layout
|--------------------------------------------------------------------------
|
| These values control how far the company connection points
| are positioned from the center.
|
| Higher value = more space between center and companies.
|
*/

const RADIUS_X = 48;
const RADIUS_Y = 44;

/*
|--------------------------------------------------------------------------
| Get Card Position
|--------------------------------------------------------------------------
|
| The `left/top` position represents the connection point.
|
| The company card is then positioned outward from that point
| depending on which side of the center it belongs to.
|
*/

function getCardTransform(left: number, top: number) {
  let translateX = "-50%";
  let translateY = "-50%";

  /*
   * Right side → card hangs to the LEFT of the point (toward center)
   */
  if (left > 58) {
    translateX = "-100%";
  }

  /*
   * Left side → card hangs to the RIGHT of the point (toward center)
   */
  if (left < 42) {
    translateX = "0%";
  }

  /*
   * Bottom → card sits ABOVE the point (toward center)
   */
  if (top > 66) {
    translateY = "-100%";
  }

  /*
   * Top → card sits BELOW the point (toward center)
   */
  if (top < 34) {
    translateY = "0%";
  }

  return `translate(${translateX}, ${translateY})`;
}

/*
|--------------------------------------------------------------------------
| Company Icon
|--------------------------------------------------------------------------
*/

function CompanyIcon({
  company,
  bg,
  className,
}: {
  company: Company;
  bg: string;
  className: string;
}) {
  /*
   * If an icon/image exists
   */
  if (company.icon) {
    return (
      <div
        className={`flex shrink-0 items-center justify-center overflow-hidden rounded-lg border border-slate-200 bg-white ${className}`}
      >
        <img
          src={company.icon}
          alt={`${company.name} icon`}
          className="h-full w-full object-contain p-1"
        />
      </div>
    );
  }

  /*
   * Fallback:
   * Use first letter of company name.
   */
  return (
    <div
      className={`flex shrink-0 items-center justify-center rounded-lg bg-gradient-to-tr ${bg} font-bold text-white ${className}`}
    >
      {company.name.charAt(0).toUpperCase()}
    </div>
  );
}

/*
|--------------------------------------------------------------------------
| Main Component
|--------------------------------------------------------------------------
*/

export default function EcosystemFlow({
  companies,
}: EcosystemFlowProps) {
  /*
   * Calculate company positions only when companies change.
   */
  const nodes = useMemo(() => {
    const total = companies.length || 1;

    return companies.map((company, index) => {
      /*
       * Start from top (12 o'clock)
       * and move clockwise.
       */
      const angle =
        (index * 2 * Math.PI) / total - Math.PI / 2;

      /*
       * Connection point position.
       *
       * left/top are percentages relative to
       * the diagram container.
       */
      const left =
        50 + RADIUS_X * Math.cos(angle);

      const top =
        50 + RADIUS_Y * Math.sin(angle);

      return {
        company,
        index,

        /*
         * Connection point
         */
        left,
        top,

        /*
         * Card position relative to connection point
         */
        cardTransform: getCardTransform(left, top),

        /*
         * Colors
         */
        iconBg:
          ICON_BG_POOL[index % ICON_BG_POOL.length],

        nameColor:
          NAME_COLOR_POOL[
            index % NAME_COLOR_POOL.length
          ],
      };
    });
  }, [companies]);

  return (
    <>
      {/* ================================================================== */}
      {/* DESKTOP RADIAL ECOSYSTEM                                          */}
      {/* ================================================================== */}

      <div className="relative hidden h-[560px] w-full overflow-hidden lg:block xl:h-[620px]">
        {/* ================================================================ */}
        {/* CONNECTION LINES                                                */}
        {/* ================================================================ */}

        <svg
          className="pointer-events-none absolute inset-0 z-0 h-full w-full"
          aria-hidden="true"
        >
          {/* Amber arrowhead drawn where each line meets a company */}
          <defs>
            <marker
              id="ecoArrow"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="7"
              markerHeight="7"
              orient="auto"
            >
              <path d="M 0 0 L 10 5 L 0 10 Z" fill="#f59e0b" />
            </marker>
          </defs>

          {/* -------------------------------------------------------------- */}
          {/* Center → Company Lines (arrow points at the company)          */}
          {/* -------------------------------------------------------------- */}

          {nodes.map((node) => {
            // Stop the line short of the card so the arrowhead sits in open space.
            const x2 = 50 + (node.left - 50) * 0.84;
            const y2 = 50 + (node.top - 50) * 0.84;
            return (
              <line
                key={`line-${node.company.id}`}
                x1="50%"
                y1="50%"
                x2={`${x2}%`}
                y2={`${y2}%`}
                stroke="#f59e0b"
                strokeWidth="2"
                strokeLinecap="round"
                strokeOpacity="0.6"
                markerEnd="url(#ecoArrow)"
              />
            );
          })}

          {/* Center origin dot */}
          <circle cx="50%" cy="50%" r="3.5" fill="#f59e0b" />
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
            2xl:h-44
            2xl:w-44
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
                text-lg
                font-bold
                text-slate-950
                xl:h-9
                xl:w-9
              "
            >
              P
            </div>

            {/* Holding Company Name */}
            <div
              className="
                max-w-[120px]
                text-[9px]
                font-bold
                uppercase
                leading-tight
                tracking-wide
                xl:max-w-[135px]
                xl:text-[10px]
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
                items-center
                gap-2
                rounded-xl
                border
                border-slate-200
                bg-white
                p-2
                shadow-sm
                transition-all
                duration-300
                hover:-translate-y-0.5
                hover:shadow-md
                xl:gap-2.5
                xl:p-2.5
              "
            >
              {/* Company Icon */}
              <CompanyIcon
                company={node.company}
                bg={node.iconBg}
                className="
                  h-8
                  w-8
                  text-xs
                  xl:h-9
                  xl:w-9
                "
              />

              {/* Company Information */}
              <div className="min-w-0 flex-1">
                {/* Company Name */}
                <div
                  className={`
                    truncate
                    text-[12px]
                    font-bold
                    leading-tight
                    ${node.nameColor}
                    xl:text-[13px]
                  `}
                  title={node.company.name}
                >
                  {node.index + 1}. {node.company.name}
                </div>

                {/* Revenue Stage */}
                <div
                  className="
                    mt-0.5
                    truncate
                    text-[10px]
                    leading-tight
                    text-slate-400
                    xl:text-[11px]
                  "
                  title={
                    node.company.revenueStage ||
                    "Business Unit"
                  }
                >
                  {node.company.revenueStage ||
                    "Business Unit"}
                </div>
              </div>
            </div>
          );

          /*
           * If company has a website,
           * make the entire card clickable.
           */
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
                  z-10
                  block
                  w-44
                  cursor-pointer
                  xl:w-52
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

          /*
           * Normal non-clickable card
           */
          return (
            <div
              key={node.company.id}
              className="
                absolute
                z-10
                w-44
                xl:w-52
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
      {/* MOBILE / TABLET                                                   */}
      {/* ================================================================== */}

      <div className="lg:hidden">
        {/* ================================================================ */}
        {/* MOBILE CENTER HUB                                               */}
        {/* ================================================================ */}

        <div
          className="
            mx-auto
            mb-5
            flex
            w-fit
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
          {/* P Logo */}
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

          {/* Company Name */}
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
        {/* MOBILE COMPANY LIST                                             */}
        {/* ================================================================ */}

        <div className="space-y-2.5">
          {nodes.map((node) => {
            const content = (
              <>
                {/* Company Icon */}
                <CompanyIcon
                  company={node.company}
                  bg={node.iconBg}
                  className="h-10 w-10 text-sm"
                />

                {/* Company Information */}
                <div className="min-w-0 flex-1">
                  <div
                    className={`
                      truncate
                      text-sm
                      font-bold
                      ${node.nameColor}
                    `}
                  >
                    {node.index + 1}.{" "}
                    {node.company.name}
                  </div>

                  <div
                    className="
                      mt-0.5
                      truncate
                      text-xs
                      text-slate-400
                    "
                  >
                    {node.company.revenueStage ||
                      "Business Unit"}
                  </div>
                </div>

                {/* Amber Connection Dot */}
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

            /*
             * Website available
             */
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

            /*
             * Normal card
             */
            return (
              <div
                key={node.company.id}
                className="
                  flex
                  items-center
                  gap-3
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