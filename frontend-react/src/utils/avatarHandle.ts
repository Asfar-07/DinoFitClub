  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  export const pickAvatar = (url: string | undefined): string | undefined => {
    if (!url) return;
    return url.includes("avatars") ? backendUrl + url : "https://res.cloudinary.com/is9tsczx/image/upload/v1789498226" + url;
  }