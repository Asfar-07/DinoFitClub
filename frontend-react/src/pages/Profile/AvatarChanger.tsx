import { useEffect, useRef, useState } from "react";
import { X, ImagePlus } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "react-toastify";
import { handleUser } from "@/features/user/userService";
import { pickAvatar } from "@/utils/avatarHandle";


export interface ChangeAvatarModalProps {
  open?: boolean;
  currentAvatar?: string;
  avatars?: string[];
  onClose?: () => void;
  onSelectDefault?: (id: string) => void;
  onUploadImage?: (file: File) => void;
}

const ALLOWED_TYPES = ["image/png", "image/jpeg", "image/jpg", "image/webp"];
const MAX_SIZE_MB = 1.5;
const MAX_SIZE_BYTES = MAX_SIZE_MB * 1024 * 1024;

// "profile resolution" limits 
const MAX_WIDTH = 2000;
const MAX_HEIGHT = 2000;
const MIN_WIDTH = 100;
const MIN_HEIGHT = 100;

export default function AvatarChanger({
  open = true,
  currentAvatar,
  avatars = [],
  onClose = () => { },
  onSelectDefault = () => { }
}: ChangeAvatarModalProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  // const [error, setError] = useState<string | null>(null);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (open && currentAvatar) setSelectedId(currentAvatar);
  }, [open]);

  if (!open) return null;

  const handlePick = (id: string): void => {
    setSelectedId(id);
    onSelectDefault(id);
  };

  const uploadFile = async (file: File | null) => {
    if(!file) return;
    setUploading(true);
    // setError(null);

    const formData = new FormData();
    formData.append("file", file);
    
    handleUser.customAvatar(formData).then(() => {
      toast.success("Avatar uploaded successfully!");
    }).catch((err) => {
       console.error(err);
       toast.error("Upload failed. Please try again.");
    }).finally(() => {
      setUploading(false);
      setPreview(null);
      setAvatarFile(null);
    })
  };

  //read image dimensions before accepting the file
  const getImageDimensions = (file: File): Promise<{ width: number; height: number }> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      const objectUrl = URL.createObjectURL(file);
      img.onload = () => {
        resolve({ width: img.width, height: img.height });
        URL.revokeObjectURL(objectUrl);
      };
      img.onerror = () => {
        URL.revokeObjectURL(objectUrl);
        reject(new Error("Invalid image file"));
      };
      img.src = objectUrl;
    });
  };

  const validateFile = async (file: File): Promise<string | null> => {
    //Format check
    if (!ALLOWED_TYPES.includes(file.type)) {
      return "Only PNG, JPG, or WEBP images are allowed.";
    }

    //Size check
    if (file.size > MAX_SIZE_BYTES) {
      return `File size must be under ${MAX_SIZE_MB}MB.`;
    }

    //Resolution check
    try {
      const { width, height } = await getImageDimensions(file);
      if (width > MAX_WIDTH || height > MAX_HEIGHT) {
        return `Image resolution must not exceed ${MAX_WIDTH}x${MAX_HEIGHT}px.`;
      }
      if (width < MIN_WIDTH || height < MIN_HEIGHT) {
        return `Image resolution must be at least ${MIN_WIDTH}x${MIN_HEIGHT}px.`;
      }
    } catch {
      return "Could not read image dimensions. Please try another file.";
    }

    return null; // no errors
  };

  const handleUploadClick = (): void => fileInputRef.current?.click();

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // setError(null);

    const validationError = await validateFile(file);
    if (validationError) {
      // setError(validationError);
      toast.error(validationError, { position: "top-right", autoClose: 5000 });
      e.target.value = "";
      return;
    }

    setPreview(URL.createObjectURL(file));

    setAvatarFile(file);

    // await uploadFile(file);

    e.target.value = "";
  };

  function cancelUploading() {
    setPreview(null);
    setUploading(false);
    // setError(null);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-md p-4">
      {preview && (
        <div className="absolute inset-0 z-50 flex items-center justify-center flex-col bg-black/50 gap-5 backdrop-blur-md">
          <div className="relative flex justify-center items-center
          size-60 bg-black/50">
            {uploading &&
              <div className="absolute inset-0 z-900 flex items-center justify-center" style={{ backgroundColor: "#000000ad" }}>
                <div
                  className="animate-spin rounded-full border-4 border-gray-300 border-t-blue-500"
                  style={{ width: "40px", height: "40px" }}
                ></div>
              </div>
            }
            <img
              src={preview}
              alt="Preview"
              className="size-[80%] rounded-full object-cover self-center"
            />
          </div>
          <div className="flex gap-3">
            <button className="flex cursor-pointer px-10 py-4 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#7be6df] to-[#38d9c4] text-sm font-bold text-[#082a28] 
              transition hover:brightness-105 hover:scale-[1.02] active:scale-[0.98]"
              disabled={uploading}
              onClick={() => uploadFile(avatarFile)}>Save</button>
              <button className="flex cursor-pointer px-10 py-4 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#ff2647] to-[#ff2647] text-sm font-bold text-[#082a28] 
              transition hover:brightness-105 hover:scale-[1.02] active:scale-[0.98]"
              disabled={uploading}
              onClick={cancelUploading}>Cancel</button>
          </div>
        </div>
      )}
      <div className="relative w-full max-w-xl overflow-hidden rounded-3xl border border-[#7be6df33] bg-gradient-to-br from-[#1d2233f2] to-[#0a0f22f2] shadow-[0_30px_80px_-30px_rgba(0,0,0,0.8)]">

        {/* close */}
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute cursor-pointer top-5 right-5 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-[#bac7cc26] text-[#bac7cc] transition hover:bg-white/5 hover:text-white"
        >
          <X size={16} />
        </button>

        <div className="flex flex-col gap-4 p-5 md:p-7">
          {/* header */}
          <div className="flex flex-col gap-1.5">
            <span className="text-[12px] font-extrabold tracking-[0.2em] text-[#7be6df]">ACCOUNT</span>
            <h2 className="text-3xl font-extrabold text-[#f0f4f8]">
              Change <span className="text-[#7be6df]">Avatar</span>
            </h2>
            <p className="text-[16px] text-[#bac7cc]">Pick a DinoFitClub default or upload your own photo.</p>
          </div>

          {/* current avatar */}
          <div className="flex items-center gap-4 rounded-2xl border border-[#ffffff10] bg-[#ffffff05] p-4">
            <Avatar className="size-14.5 text-2xl border border-[#7be6df40] shadow-[0_0_0_3px_#7be6df1a]">
              <AvatarImage src={ pickAvatar(currentAvatar)} alt="avatar" />
              <AvatarFallback>CR</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-[16px] font-extrabold text-[#f0f4f8]">Current avatar</p>
              <p className="text-xs text-[#bac7cc]">Normal Collections</p>
            </div>
          </div>

          {/* defaults */}
          <div className="flex flex-col gap-4">
            <span className="text-[12px] font-extrabold tracking-[0.2em] text-[#7be6df]">DinoFitClub DEFAULTS</span>
            <div className="flex flex-wrap gap-3">
              {avatars.map((a: string, index) => (
                <button
                  key={index}
                  onClick={() => handlePick(a)}
                  aria-pressed={selectedId === a}
                  className="rounded-full transition"
                >
                  <Avatar className={`h-14 w-14 cursor-pointer text-2xl border transition
                      ${selectedId === a
                        ? "border-[#4dfff3] shadow-[0_0_0_3px_#7be6df33]"
                        : "border-[#ffffff14] hover:border-[#7be6df66]"}`}>
                    <AvatarImage src={"https://res.cloudinary.com/is9tsczx/image/upload/v1789498226" + a} alt="avatar" />
                    <AvatarFallback>LD</AvatarFallback>
                  </Avatar>
                  {/* <AvatarBubble
                    
                    className={`h-14 w-14 text-2xl border transition
                      ${selectedId === a.id
                        ? "border-[#7be6df] shadow-[0_0_0_3px_#7be6df33]"
                        : "border-[#ffffff14] hover:border-[#7be6df66]"}`}
                  /> */}
                </button>
              ))}
            </div>
          </div>

          {/* upload */}
          <div className="flex flex-col gap-3.5">
            <span className="text-[12px] font-extrabold tracking-[0.2em] text-[#7be6df]">UPLOAD YOUR OWN</span>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
            <button
              onClick={handleUploadClick}
              className="flex cursor-pointer h-12 w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#7be6df] to-[#38d9c4] text-sm font-bold text-[#082a28] 
              transition hover:brightness-105 hover:scale-[1.02] active:scale-[0.98]"
            >
              <ImagePlus size={16} />
              Upload Image
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}