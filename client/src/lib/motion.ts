import { delay, Variants } from "framer-motion";


export const DURATION = 0.6


export const fadeUp = (delay = 0, duration = DURATION): Variants => ({
    hidden: { opacity: 0, y: 28 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration, delay, ease: "easeOut"
        }
    }
})

export const fadeSlide = (direction: "left" | "right", delay = 0, distance = 60, duration = DURATION): Variants => ({
    hidden: {
        opacity: 0,
        x: direction === "left" ? -distance : distance,
    },
    visible: {
        opacity: 1,
        x: 0,
        transition: {
            duration,
            delay,
            ease: "easeOut",
        },
    },
});

export const staggerContainer = (staggerChildren =0.12, delayChildren= 0 ):Variants=>({
    hidden :{},
    visible: {
        transition :{
            staggerChildren, delayChildren
        }
    }

})