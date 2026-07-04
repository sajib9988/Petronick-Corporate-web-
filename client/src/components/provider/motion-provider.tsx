"use client"

import { MotionConfig } from "framer-motion"
import { ReactNode } from "react"


export function MotionProvider({ children }: { children: ReactNode }) {
    return <MotionConfig reducedMotion="user">
{/* it will be used root layout for chlidren pass  */}
    </MotionConfig>
}