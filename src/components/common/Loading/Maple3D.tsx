import Image from "next/image";

export default function Maple3D() {
  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="rotate-3d"><Image src="/image/loading/loading.svg" alt="loading" className="w-10 h-10" width={40} height={40} /></div>
    </div>
  )
}