import { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { FiUploadCloud } from "react-icons/fi";

const Upload = ({
  name,
  label,
  register,
  setValue,
  errors,
  video = false,
  viewData = null,
  editData = null,
}) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewSource, setPreviewSource] = useState(viewData || editData || "");

  // 1. Handle File Selection/Drop
  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      previewFile(file);
      setSelectedFile(file);
    }
  };

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };

  // 2. Initialize Dropzone
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: video
      ? { "video/mp4": [".mp4"] }
      : { "image/jpeg": [".jpg", ".jpeg"], "image/png": [".png"] },
    onDrop,
  });

  // 3. Register the field manually on mount
  useEffect(() => {
    register(name, { required: !viewData }); // Only required if not viewing existing data
  }, [register, name, viewData]);

  // 4. Update the form value whenever selectedFile changes
  useEffect(() => {
    setValue(name, selectedFile, { shouldValidate: true });
  }, [selectedFile, setValue, name]);

  const handleCancel = () => {
    setPreviewSource("");
    setSelectedFile(null);
    setValue(name, null);
  };

  return (
    <div className="flex flex-col space-y-2">
      <label className="text-sm text-[#AFB2BF]" htmlFor={name}>
        {label} {!viewData && <sup className="text-pink-600">*</sup>}
      </label>

      <div
        className={`${
          isDragActive ? "bg-[#424854]" : "bg-[#2C333F]"
        } flex min-h-62.5 cursor-pointer items-center justify-center rounded-md border-2 border-dotted border-[#585D69]`}
      >
        {previewSource ? (
          <div className="flex w-full flex-col p-6">
            {!video ? (
              <img
                src={previewSource}
                alt="Preview"
                className="h-full w-full rounded-md object-cover"
              />
            ) : (
              <video
                src={previewSource}
                controls
                className="w-full rounded-md"
              />
            )}
            {!viewData && (
              <button
                type="button"
                onClick={handleCancel}
                className="mt-3 text-[#6E727F] underline"
              >
                Cancel
              </button>
            )}
          </div>
        ) : (
          <div
            className="flex w-full flex-col items-center p-6"
            {...getRootProps()}
          >
            <input {...getInputProps()} />
            <div className="grid aspect-square w-14 place-items-center rounded-full bg-[#171717]">
              <FiUploadCloud className="text-2xl text-yellow-400" />
            </div>
            <p className="mt-2 max-w-50 text-center text-sm text-[#999DAA]">
              Drag & drop an {!video ? "image" : "video"}, or{" "}
              <span className="font-semibold text-yellow-400">Browse</span> a file
            </p>
            <ul className="mt-10 flex list-disc justify-between space-x-12 text-center text-xs text-[#999DAA]">
              <li>Aspect ratio 16:9</li>
              <li>Recommended size 1024x576</li>
            </ul>
          </div>
        )}
      </div>
      {errors[name] && (
        <span className="ml-2 text-xs tracking-wide text-pink-400">
          {label} is required
        </span>
      )}
    </div>
  );
};

export default Upload;