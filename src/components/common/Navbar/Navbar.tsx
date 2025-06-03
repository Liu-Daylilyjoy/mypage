import { ModeToggle } from "@/components/theme/theme-mode-toggle";

export default function Navbar() {
  return (
    <div className="flex justify-end items-center p-4 relative">
      <div className="absolute left-4">
        <svg className="signature" width="90" height="60" viewBox="0 0 242 158" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path strokeWidth="5" d="M1 17L10 44L1 100C22.6 109.6 55.3333 104 69 100V56M69 56C81.8 46.4 74.3333 44 69 44C48.2 48 60.3333 53.6667 69 56ZM95 56L101 74L95 105L117 100L131 56C119.8 74.4 126.333 93 131 100L161 105L174 74V56H161L152 89C169.6 107.4 184 96.6667 189 89L200 74V56L216 1C203.2 18.6 206.667 67 210 89H224L241 63V44L235 151L124 157"/>
        </svg>
      </div>
      <div className=" right-4">
        <ModeToggle />
      </div>

    </div>
  )
}
