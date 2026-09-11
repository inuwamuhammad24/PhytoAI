import React, { useEffect } from "react"
import { AnimatePresence, easeInOut, motion } from "framer-motion"

function FlashMessage(props) {
  useEffect(() => {
    const timer = setTimeout(() => {
      props.setState(draft => {
        draft.isFlashVisible = false
      })
    }, 6000)
    return () => clearTimeout(timer)
  }, [props.isFlashVisible])
  return (
    <AnimatePresence>
      {props.isFlashVisible && (
        <motion.div
          initial={{ x: 300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 300, opacity: 0 }}
          transition={{ duration: 0.33, ease: easeInOut }}
          className="fixed top-8 right-4 rounded-md border px-4 py-4 z-5 flex items-center gap-2 max-w-3/4 lg:max-w-1/3 bg-gradient-to-r from-rose-500 to-red-600 text-white border-none"
        >
          <i className="bx  bxs-info-circle text-lg bg-white/20 text-white rounded-full"></i>
          <p className="">{props.message}</p>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default FlashMessage
