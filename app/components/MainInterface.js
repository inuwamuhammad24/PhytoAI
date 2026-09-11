import React, { useEffect, useRef } from "react"
import {
  Sparkles,
  Leaf,
  UploadCloud,
  X,
  History,
  Info,
  ShieldCheck,
  PlusCircle,
  Menu,
  ChevronRight,
  AlertCircle,
} from "lucide-react"
import { Link } from "react-router-dom"
import Axios from "axios"
import SmallLoading from "../../SmallLoading"
import UserMessage from "./UserMessage"
import ModelMessage from "./ModelMessage"
import { useImmer } from "use-immer"
import TypeIt from "typeit-react"
import FlashMessage from "./FlashMessage"
import { AnimatePresence, motion } from "framer-motion"

const BACKEND_URL = "http://10.15.252.246:8000"

export default function MainInterface() {
  const chatContainer = useRef(null)
  const fileInput = useRef(null)

  const [state, setState] = useImmer({
    messages: [],
    input: "",
    isGeneratingResponse: false,
    loadingMessage: "Analyzing leaf tissue & patterns…",
    selectedImage: null,
    preview: null,
    isSideBarOpen: false,
    isFlashVisible: false,
    flashMessage: "",
  })

  function handleImageChange(e) {
    const file = e.target?.files?.[0]
    if (!file || !file.type.startsWith("image/")) return

    setState(draft => {
      draft.selectedImage = file
      draft.preview = URL.createObjectURL(file)
    })
  }

  function clearSelectedImage() {
    if (state.preview) URL.revokeObjectURL(state.preview)
    setState(draft => {
      draft.selectedImage = null
      draft.preview = null
    })
    if (fileInput.current) fileInput.current.value = ""
  }

  function handleResetChat() {
    clearSelectedImage()
    setState(draft => {
      draft.messages = []
      draft.isGeneratingResponse = false
    })
  }

  async function handleDetectDisease(e) {
    e.preventDefault()
    if (!state.selectedImage || state.isGeneratingResponse) return

    const currentPreview = state.preview

    setState(draft => {
      draft.isGeneratingResponse = true
      draft.messages.push({
        role: "user",
        content: "Submitted specimen for pathology diagnosis",
        imagePreview: currentPreview,
      })
      draft.messages.push({ role: "assistant", status: "loading" })
    })

    try {
      const formData = new FormData()
      formData.append("image", state.selectedImage)

      const res = await Axios.post(`${BACKEND_URL}/detect-disease`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })

      const { disease, confidence, treatments } = res.data

      let reply = `### Pathology Assessment\n\n**Detected Condition:** ${disease || "Unknown Specimen"}\n`
      if (confidence !== undefined) {
        reply += `**Confidence Score:** ${(confidence * 100).toFixed(1)}%\n\n`
      }

      if (Array.isArray(treatments) && treatments.length > 0) {
        reply += `**Recommended Treatment Plan:**\n`
        treatments.forEach((step, idx) => {
          reply += `${idx + 1}. ${step}\n`
        })
      } else {
        reply += `*No immediate chemical or cultural treatment required. Continue monitoring leaf foliage.*`
      }

      setState(draft => {
        draft.messages.pop()
        draft.messages.push({ role: "assistant", content: reply })
        draft.isGeneratingResponse = false
        draft.selectedImage = null
        draft.preview = null
      })
    } catch (err) {
      setState(draft => {
        draft.messages.pop()
        draft.messages.push({
          role: "assistant",
          content:
            "⚠️ Analysis Interrupted: Unable to process image scan. Please verify backend connection.",
        })
        draft.isGeneratingResponse = false
      })
    }
  }

  useEffect(() => {
    chatContainer.current?.scrollTo({
      top: chatContainer.current.scrollHeight,
      behavior: "smooth",
    })
  }, [state.messages])

  return (
    <>
      <FlashMessage
        isFlashVisible={state.isFlashVisible}
        setState={setState}
        message={state.flashMessage}
      />

      {/* Root Container */}
      <div
        className="flex h-[100dvh] w-full overflow-hidden text-zinc-100 font-sans"
        style={{ backgroundColor: "#0b0e0c" }}
      >
        {/* Mobile Backdrop */}
        <AnimatePresence>
          {state.isSideBarOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() =>
                setState(d => {
                  d.isSideBarOpen = false
                })
              }
              className="fixed inset-0 z-40 bg-black/80 backdrop-blur-sm lg:hidden"
            />
          )}
        </AnimatePresence>

        {/* Sidebar */}
        <aside
          className={`fixed inset-y-0 left-0 z-50 flex w-72 flex-col justify-between border-r border-zinc-800/80 p-5 transition-transform duration-300 lg:static lg:translate-x-0 ${
            state.isSideBarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
          style={{ backgroundColor: "#111512" }}
        >
          <div className="space-y-6">
            {/* Logo */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500 shadow-md shadow-emerald-950/40">
                  <Leaf className="h-5 w-5 text-black stroke-[2.5]" />
                </div>
                <div>
                  <h1 className="text-base font-bold tracking-tight text-white flex items-center gap-1.5">
                    Phyto AI
                    <span className="rounded-full bg-emerald-950/80 border border-emerald-500/50 px-2 py-0.5 text-[10px] font-semibold text-emerald-400">
                      v2.4
                    </span>
                  </h1>
                  <p className="text-xs text-zinc-400 font-medium">
                    Agronomic Diagnostics
                  </p>
                </div>
              </div>
              <button
                onClick={() =>
                  setState(d => {
                    d.isSideBarOpen = false
                  })
                }
                className="text-zinc-400 hover:text-white lg:hidden"
              >
                <X size={20} />
              </button>
            </div>

            {/* New scan button */}
            <button
              onClick={handleResetChat}
              className="flex w-full items-center justify-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-950/40 px-4 py-2.5 text-sm font-medium text-emerald-300 hover:bg-emerald-900/50 transition shadow-sm"
            >
              <PlusCircle size={16} />
              New Diagnosis
            </button>

            {/* Navigation links */}
            <nav className="space-y-1">
              <span className="px-3 text-[11px] font-semibold uppercase tracking-wider text-zinc-500">
                Workspace
              </span>
              <button
                onClick={handleResetChat}
                className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm font-medium text-zinc-300 hover:bg-zinc-800/60 hover:text-white transition"
              >
                <div className="flex items-center gap-3">
                  <History size={16} className="text-zinc-400" />
                  Recent Scans
                </div>
                <span className="text-xs text-zinc-500">0</span>
              </button>
              <Link
                to="/about"
                className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm font-medium text-zinc-300 hover:bg-zinc-800/60 hover:text-white transition"
              >
                <div className="flex items-center gap-3">
                  <Info size={16} className="text-zinc-400" />
                  Pathology Models
                </div>
                <ChevronRight size={14} className="text-zinc-500" />
              </Link>
            </nav>
          </div>

          {/* Model Status Card */}
          <div
            className="rounded-xl border border-zinc-800/90 p-3.5 text-xs text-zinc-400"
            style={{ backgroundColor: "#0b0e0c" }}
          >
            <div className="flex items-center gap-2 font-medium text-emerald-400 mb-1">
              <ShieldCheck size={14} />
              Model Active & Calibrated
            </div>
            <p className="leading-relaxed text-zinc-500">
              Trained on multi-class crop datasets for blight, chlorosis, and
              rust detection.
            </p>
          </div>
        </aside>

        {/* Main Work Area */}
        <main
          className="flex flex-1 flex-col h-full overflow-hidden"
          style={{ backgroundColor: "#0e120f" }}
        >
          {/* Header Bar */}
          <header
            className="flex h-14 shrink-0 items-center justify-between border-b border-zinc-800/80 px-6 backdrop-blur-md"
            style={{ backgroundColor: "#111512" }}
          >
            <div className="flex items-center gap-3">
              <button
                onClick={() =>
                  setState(d => {
                    d.isSideBarOpen = true
                  })
                }
                className="text-zinc-400 hover:text-white lg:hidden"
              >
                <Menu size={20} />
              </button>
              <span className="text-xs font-semibold uppercase tracking-widest text-zinc-400 flex items-center gap-1.5">
                <Sparkles size={13} className="text-emerald-400" />
                Diagnostic Console
              </span>
            </div>
            <div className="flex items-center gap-2 text-xs text-zinc-400">
              <span className="inline-block h-2 w-2 rounded-full bg-emerald-400" />
              Node:{" "}
              <span className="font-mono text-zinc-300">192.168.159.246</span>
            </div>
          </header>

          {/* Chat / Content Scroll Container */}
          <div
            ref={chatContainer}
            className="flex-1 overflow-y-auto px-4 py-8 lg:px-12 space-y-6"
            style={{ backgroundColor: "#0e120f" }}
          >
            {state.messages.length === 0 ? (
              <div className="flex h-full flex-col items-center justify-center text-center max-w-lg mx-auto">
                <div
                  className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-emerald-700/60 shadow-inner"
                  style={{ backgroundColor: "#141c16" }}
                >
                  <Leaf className="h-8 w-8 text-emerald-400" />
                </div>
                <div className="min-h-[40px] text-xl lg:text-2xl font-semibold tracking-tight text-white">
                  <TypeIt
                    options={{
                      strings: [
                        "Upload a leaf specimen to begin.",
                        "Detect foliar diseases with Phyto AI.",
                      ],
                      speed: 40,
                      breakLines: false,
                      loop: true,
                      nextStringDelay: 2500,
                    }}
                  />
                </div>
                <p className="mt-2 text-sm text-zinc-400 leading-relaxed">
                  Provide high-resolution photos displaying leaf symptoms,
                  discoloration, or lesions for accurate pathological
                  assessment.
                </p>

                {/* Hints */}
                <div className="mt-8 grid grid-cols-2 gap-3 text-left w-full">
                  <div
                    className="rounded-lg border border-zinc-800/80 p-3"
                    style={{ backgroundColor: "#121713" }}
                  >
                    <p className="text-xs font-semibold text-zinc-200">
                      High Contrast
                    </p>
                    <p className="text-[11px] text-zinc-400 mt-0.5">
                      Place leaf against a neutral background
                    </p>
                  </div>
                  <div
                    className="rounded-lg border border-zinc-800/80 p-3"
                    style={{ backgroundColor: "#121713" }}
                  >
                    <p className="text-xs font-semibold text-zinc-200">
                      Focus on Margins
                    </p>
                    <p className="text-[11px] text-zinc-400 mt-0.5">
                      Capture lesions and vein transitions
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              state.messages.map((msg, i) =>
                msg.role === "user" ? (
                  <UserMessage
                    key={i}
                    message={msg.content}
                    imagePreview={msg.imagePreview}
                  />
                ) : (
                  <ModelMessage
                    key={i}
                    status={msg.status}
                    message={msg.content}
                    loadingMessage={state.loadingMessage}
                  />
                ),
              )
            )}
          </div>

          {/* Bottom Action Footer */}
          <footer
            className="border-t border-zinc-800/80 p-4"
            style={{ backgroundColor: "#111512" }}
          >
            <form
              onSubmit={handleDetectDisease}
              className="max-w-3xl mx-auto space-y-3"
            >
              {/* Selected Preview Pill */}
              <AnimatePresence>
                {state.preview && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    className="flex items-center justify-between rounded-xl border border-emerald-700/60 p-2.5 shadow-md"
                    style={{ backgroundColor: "#141c16" }}
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={state.preview}
                        alt="Specimen preview"
                        className="h-12 w-12 rounded-lg object-cover border border-emerald-500/60"
                      />
                      <div>
                        <p className="text-xs font-medium text-emerald-200 truncate max-w-xs">
                          {state.selectedImage?.name || "Leaf_Sample.jpg"}
                        </p>
                        <p className="text-[11px] text-zinc-400">
                          {(state.selectedImage?.size / (1024 * 1024)).toFixed(
                            2,
                          )}{" "}
                          MB • Ready for inference
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={clearSelectedImage}
                      className="rounded-lg p-1.5 text-zinc-400 hover:bg-zinc-800 hover:text-white transition"
                    >
                      <X size={16} />
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Action Bar */}
              <div className="flex items-center gap-3">
                <input
                  ref={fileInput}
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={handleImageChange}
                />

                <button
                  type="button"
                  onClick={() => fileInput.current?.click()}
                  className="flex items-center gap-2 rounded-xl border border-zinc-700/80 px-4 py-3 text-xs font-medium text-zinc-200 hover:border-emerald-500 hover:bg-zinc-800 transition shadow-inner"
                  style={{ backgroundColor: "#171d18" }}
                >
                  <UploadCloud size={16} className="text-emerald-400" />
                  <span>Choose Specimen</span>
                </button>

                <div className="flex-1 flex items-center px-3 text-xs text-zinc-400 italic">
                  {!state.selectedImage && (
                    <span className="flex items-center gap-1.5">
                      <AlertCircle size={13} /> Select an image to initialize AI
                      inference
                    </span>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={!state.selectedImage || state.isGeneratingResponse}
                  className="flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 text-xs font-semibold text-white shadow-lg hover:bg-emerald-500 transition disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  {state.isGeneratingResponse ? (
                    <>
                      <SmallLoading
                        width={16}
                        height={16}
                        border={"2px solid #fff"}
                        borderBottom={"2px solid transparent"}
                      />
                      <span>Analyzing...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles size={15} />
                      <span>Run Diagnostics</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </footer>
        </main>
      </div>
    </>
  )
}
