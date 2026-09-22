//@ts-nocheck
import "./thememode.css"
import { MdOutlineDarkMode } from "react-icons/md";
import { CiLight } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from '../../features/theme/themeSlice';

export default function ThemeMode() {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme.mode);
  
  return (
    <div className='theme-mode max-md:hidden'>
      <button onClick={() => dispatch(toggleTheme())}>
      {theme === "dark" ? <CiLight /> : <MdOutlineDarkMode />}
    </button>
    </div>
  )
}
