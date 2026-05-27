import React from 'react'

function IconBtn({
    text,
    onclick,
    children,
    disabled,
    outline = false,
    customClasses,
    type,
    icon
  }) {
    return (
    <button
      disabled={disabled}
      onClick={onclick}
      className={`flex items-center justify-center gap-x-2 rounded-md py-2 px-5 font-semibold transition-all duration-200
        ${outline ? "border border-[#FFD60A] bg-transparent text-[#FFD60A]" : "bg-[#FFD60A] text-black font-bold"}
        ${disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"}
        ${customClasses}`}
      type={type}
    >
      {children ? (
        <>
          {/* Text and Icon container */}
          <span>{text}</span>
          {/* Icon yahan render hoga (children ke roop mein) */}
          <span className="text-xl">
             {children}
          </span>
        </>
      ) : (
        <span>{text}</span>
      )}
    </button>
  )
}

export default IconBtn