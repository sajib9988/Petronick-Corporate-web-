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

/*
|--------------------------------------------------------------------------
| RADIAL LAYOUT
|--------------------------------------------------------------------------
|
| Keep companies close to the center,
| but leave enough room so cards do not touch.
|
*/

const RADIUS_X = 39;
const RADIUS_Y = 39;

/*
|--------------------------------------------------------------------------
| CARD POSITION
|--------------------------------------------------------------------------
*/

function getCardTransform(left: number, top: number) {
  let translateX = "-50%";
  let translateY = "-50%";

  /*
   * Right side
   * Card extends toward the center.
   */
  if (left > 58) {
    translateX = "-100%";
  }

  /*
   * Left side
   * Card extends toward the center.
   */
  if (left < 42) {
    translateX = "0%";
  }

  /*
   * Bottom
   * Card sits above the connection point.
   */
  if (top > 66) {
    translateY = "-100%";
  }

  /*
   * Top
   * Card sits below the connection point.
   */
  if (top < 34) {
    translateY = "0%";
  }

  return `translate(${translateX}, ${translateY})`;
}

/*
|--------------------------------------------------------------------------
| COMPANY NAME FONT SIZE
|--------------------------------------------------------------------------
|
| Company names always stay on ONE line.
| Longer names automatically get a smaller font.
|
*/

function getCompanyNameFontSize(name: string) {
  const length = name.trim().length;

  if (length <= 14) return "12px";
  if (length <= 18) return "11px";
  if (length <= 22) return "10px";
  if (length <= 26) return "9px";

  return "8px";
}

/*
|--------------------------------------------------------------------------
| COMPANY ICON
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

/*
|--------------------------------------------------------------------------
| MAIN COMPONENT
|--------------------------------------------------------------------------
*/

export default function EcosystemFlow({
  companies,
}: {
  companies: Company[];
}) {
  const nodes = useMemo(() => {
    const total = companies.length || 1;

    return companies.map((company, index) => {
      /*
       * Start at 12 o'clock
       * and rotate clockwise.
       */
      const angle =
        (index * 2 * Math.PI) / total -
        Math.PI / 2;

      /*
       * Radial connection point.
       */
      const left =
        50 + RADIUS_X * Math.cos(angle);

      const top =
        50 + RADIUS_Y * Math.sin(angle);

      return {
        company,
        index,
        left,
        top,

        cardTransform: getCardTransform(
          left,
          top,
        ),

        iconBg:
          ICON_BG_POOL[
            index % ICON_BG_POOL.length
          ],

        nameColor:
          NAME_COLOR_POOL[
            index % NAME_COLOR_POOL.length
          ],

        nameFontSize:
          getCompanyNameFontSize(
            company.name,
          ),
      };
    });
  }, [companies]);

  return (
    <>
      {/* ================================================================== */}
      {/* DESKTOP RADIAL ECOSYSTEM                                          */}
      {/* ================================================================== */}

      <div
        className="
          relative
          hidden
          h-[520px]
          w-full
          overflow-visible
          xl:block
          xl:h-[550px]
          2xl:h-[580px]
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
            z-0
            h-full
            w-full
            overflow-visible
          "
          aria-hidden="true"
        >
          <defs>
            <marker
              id="ecoArrow"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="5.5"
              markerHeight="5.5"
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
          {/* CENTER → COMPANY                                              */}
          {/* ============================================================ */}

          {nodes.map((node) => {
            /*
             * IMPORTANT:
             *
             * Previously this was 0.80.
             * That made the arrow stop too far from the company.
             *
             * 0.94 brings the arrow very close to
             * the company's connection point.
             */
            const LINE_END_DISTANCE = 0.94;

            const x2 =
              50 +
              (node.left - 50) *
                LINE_END_DISTANCE;

            const y2 =
              50 +
              (node.top - 50) *
                LINE_END_DISTANCE;

            return (
              <line
                key={`line-${node.company.id}`}
                x1="50%"
                y1="50%"
                x2={`${x2}%`}
                y2={`${y2}%`}
                stroke="#f59e0b"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeOpacity="0.72"
                markerEnd="url(#ecoArrow)"
              />
            );
          })}

          {/* Center Dot */}

          <circle
            cx="50%"
            cy="50%"
            r="3.5"
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
            h-32
            w-32
            -translate-x-1/2
            -translate-y-1/2
            xl:h-36
            xl:w-36
            2xl:h-40
            2xl:w-40
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
              px-3
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
                mb-1.5
                flex
                h-7
                w-7
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
                xl:h-8
                xl:w-8
              "
            >
              P
            </div>

            {/* Holding Company Name */}

            <div
              className="
                max-w-[118px]
                text-[8px]
                font-bold
                uppercase
                leading-tight
                tracking-wide
                xl:max-w-[128px]
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
                h-[52px]
                w-full
                items-center
                gap-2
                rounded-xl
                border
                border-slate-200
                bg-white
                px-2
                shadow-sm
                transition-all
                duration-300
                hover:-translate-y-0.5
                hover:shadow-md
                xl:h-[54px]
                xl:px-2.5
              "
            >
              {/* ======================================================== */}
              {/* COMPANY ICON                                               */}
              {/* ======================================================== */}

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
                    fontSize:
                      node.nameFontSize,
                  }}
                  title={node.company.name}
                >
                  {node.index + 1}.{" "}
                  {node.company.name}
                </div>

                {/* Revenue Stage */}

                <div
                  className="
                    mt-1
                    whitespace-nowrap
                    text-[9px]
                    leading-none
                    text-slate-400
                    xl:text-[10px]
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
                  absolute
                  z-10
                  block
                  w-[154px]
                  cursor-pointer
                  xl:w-[162px]
                  2xl:w-[170px]
                "
                style={{
                  left: `${node.left}%`,
                  top: `${node.top}%`,
                  transform:
                    node.cardTransform,
                }}
              >
                {content}
              </a>
            );
          }

          /*
           * No website
           */

          return (
            <div
              key={node.company.id}
              className="
                absolute
                z-10
                w-[154px]
                xl:w-[162px]
                2xl:w-[170px]
              "
              style={{
                left: `${node.left}%`,
                top: `${node.top}%`,
                transform:
                  node.cardTransform,
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

      <div className="xl:hidden">
        {/* ================================================================ */}
        {/* MOBILE CENTER HUB                                               */}
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
        {/* MOBILE COMPANY LIST                                             */}
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

                <div className="min-w-0 flex-1 overflow-hidden">
                  <div
                    className={`
                      whitespace-nowrap
                      font-bold
                      leading-tight
                      ${node.nameColor}
                    `}
                    style={{
                      fontSize:
                        node.nameFontSize,
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