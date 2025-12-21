/* eslint-disable no-unused-vars */
import { motion } from "motion/react";

export function Animate({children, duration})
{
    return (
        <motion.div className="motion-div"
            initial={{ opacity: 0, scale: 0.8 }} // Starting point
            whileInView={{ opacity: 1, scale: 1 }} // End point
             transition={{ duration: duration, ease: "backOut" }}
            viewport={{ once: true, amount: .05 }}>
                {children}
        </motion.div>
    )
}