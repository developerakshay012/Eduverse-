import { useEffect, useRef, useState } from "react"
import { MdClose } from "react-icons/md"
import { useSelector } from "react-redux"

export default function ChipInput({
  label,
  name,
  placeholder,
  register,
  errors,
  setValue,
  getValues,
}) {
  const { editCourse, course } = useSelector((state) => state.course)

  const [chips, setChips] = useState([])
  const inputRef = useRef(null)

  useEffect(() => {
    if (editCourse) {
      setChips(course?.tag || [])
    }

    register(name, {
      required: true,
      validate: (value) => value.length > 0,
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    setValue(name, chips)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chips])

  // Add chip function
  const handleAddChip = (value) => {
    const chipValue = value.trim()

    if (chipValue && !chips.includes(chipValue)) {
      setChips([...chips, chipValue])
      return true
    }

    return false
  }

  // Enter or comma key support
  const handleKeyDown = (event) => {
    if (event.key === "Enter" || event.key === ",") {
      event.preventDefault()

      if (handleAddChip(event.target.value)) {
        event.target.value = ""
      }
    }
  }

  // Add button support
  const handleAddButtonClick = () => {
    if (!inputRef.current) return

    if (handleAddChip(inputRef.current.value)) {
      inputRef.current.value = ""
      inputRef.current.focus()
    }
  }

  // Delete chip
  const handleDeleteChip = (chipIndex) => {
    const newChips = chips.filter((_, index) => index !== chipIndex)
    setChips(newChips)
  }

  return (
    <div className="flex flex-col space-y-2">
      {/* Label */}
      <label className="text-sm text-[#AFB2BF]" htmlFor={name}>
        {label} <sup className="text-pink-600">*</sup>
      </label>

      {/* Chips */}
      <div className="flex flex-wrap gap-2">
        {chips.map((chip, index) => (
          <div
            key={index}
            className="flex items-center rounded-full bg-yellow-400 px-3 py-1 text-sm text-white"
          >
            <span>{chip}</span>

            <button
              type="button"
              className="ml-2 focus:outline-none"
              onClick={() => handleDeleteChip(index)}
            >
              <MdClose className="text-sm" />
            </button>
          </div>
        ))}
      </div>

      {/* Input + Add Button */}
      <div className="flex flex-col gap-2 sm:flex-row">
        <input
          ref={inputRef}
          id={name}
          name={name}
          type="text"
          placeholder={placeholder}
          onKeyDown={handleKeyDown}
          className="form-style flex-1"
        />

        <button
          type="button"
          onClick={handleAddButtonClick}
          className="rounded-md bg-yellow-400 px-4 py-2 font-medium text-white transition-all duration-200 hover:bg-yellow-500"
        >
          Add
        </button>
      </div>

      {/* Error */}
      {errors[name] && (
        <span className="ml-2 text-xs tracking-wide text-pink-600">
          {label} is required
        </span>
      )}
    </div>
  )
}