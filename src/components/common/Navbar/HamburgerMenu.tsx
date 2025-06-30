import { Button } from "@/components/ui/shadcn/button"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/shadcn/sheet"
import NavbarItem, { NavbarItemProps } from "./NavbarItem";

export function HamburgerMenu({ menuItems }: { menuItems: NavbarItemProps[] }) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="link" size="icon">Menu</Button>
      </SheetTrigger>
      <SheetContent side="left" className="max-h-[70%] top-25 overflow-y-auto overflow-x-hidden"
        style={{
          scrollbarColor: 'var(--sidebar-color) var(--background)',
        }}
      >
        <SheetHeader>
          <SheetTitle>Menu</SheetTitle>
        </SheetHeader>
        <div className="ml-10">
          <div className="flex flex-col gap-2">
            {menuItems.map((item, index) => (
              item.icon ? <div key={index}></div> : <NavbarItem key={index} title={item.title} href={item.href} icon={item.icon} />
            ))}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
