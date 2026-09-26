const ALLOWED_TYPES = ["image/png", "image/jpeg", "image/jpg", "image/webp"];
const MAX_SIZE_MB = 1.5;
const MAX_SIZE_BYTES = MAX_SIZE_MB * 1024 * 1024;

const MAX_WIDTH = 2000;
const MAX_HEIGHT = 2000;
const MIN_WIDTH = 100;
const MIN_HEIGHT = 100;
 
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

export const validateFile = async (file: File): Promise<string | null> => {
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