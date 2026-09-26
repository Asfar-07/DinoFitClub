import { Link } from 'react-router-dom'

interface Links{
    label: string,
    link: string
}
const links: Links[] = [
    {
        label: "Home",
        link: "/"
    },
    {
        label: "Setting",
        link: "/settings/general"
    },
    {
        label: "About",
        link: "/about"
    },
    {
        label: "Contact",
        link: "/support"
    }
]

export default function SmallFooter() {
  return (
    <div className='relative z-100 w-full flex justify-center gap-20 py-8 pt-20 text-xs text-(--secondary-text-color)'>
      <p>© 2026 DinoFitClub. All rights reserved.</p>
      <ul className='flex gap-6'>
        {links.map((link, index) => (
            <li key={index} className='cursor-pointer hover:text-(--symbol-color) hover:font-bold'>
                <Link to={link.link}>{link.label}</Link>
            </li>
        ))}
      </ul>
    </div>
  )
}
