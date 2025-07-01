import { Button } from "@/components/ui/shadcn/button"

import NavbarItem, { NavbarItemProps } from "./NavbarItem";
import { MenuIcon, X } from "lucide-react";
import { useRef } from "react";

export function FullScreenMenu({ menuItems, isOpen, setIsOpen }: { menuItems: NavbarItemProps[], isOpen: boolean, setIsOpen: (isOpen: boolean) => void }) {
  const circleOverlayRef = useRef<HTMLDivElement>(null);

  const click = () => {
    setIsOpen(!isOpen);
    circleOverlayRef.current?.classList.toggle('is-active');
  }

  return (
    <div className="relative bottom-5">
      <Button className="cursor-pointer absolute z-10 opacity-70 hover:opacity-100 hover:scale-120 hover:text-theme-color transition-all duration-300" variant="link" size="icon"
        onClick={click}
      >
        {isOpen ? <X className="absolute scale-210" /> : <MenuIcon className="absolute scale-210" />}
      </Button>

      {/* 圆形遮罩 */}
      <div ref={circleOverlayRef} className="absolute z-9 circle-overlay" />

      {isOpen && <div className="ml-10 z-10 absolute top-15">
        <div className="flex flex-col gap-6" onClick={click}>
          {menuItems.map((item, index) => (
            item.icon ? <div key={index}></div> : <NavbarItem key={index} title={item.title} href={item.href} icon={item.icon} />
          ))}
        </div>
      </div>}
    </div>
  )
}
