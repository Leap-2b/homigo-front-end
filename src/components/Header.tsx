import Image from "next/image";
import Link from "next/link";

export default function NavBar() {
  return (
    <div className="w-full">
      {/* Navigation Bar */}
      <div className="w-full bg-white border-b sticky top-0 z-50">
        <div className="w-[90%] m-auto justify-between items-center px-4 py-3 flex ">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <div className="relative flex items-center">
              <Image
                src="/avatar.svg"
                alt=""
                width={50}
                height={50}
                className="w-2 h-2 bg-green-500 rounded-full absolute left-0"
              />

              <span className="text-gray-800 font-medium text-xl ml-3">
                Homi-go
              </span>
            </div>
          </Link>
          {/* Navigation Links */}
          {/* Action Buttons */}
          <div className="flex items-center    gap-2.5">
            <Link
              href="/yardim"
              className="hidden md:inline-flex px-4 py-2 text-sm border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Хэрэглэгчээр Нэвтрэх
            </Link>
            <Link
              href="/giris"
              className="hidden md:inline-flex px-4 py-2 text-sm border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Ажилчинаар Нэвтрэх
            </Link>
            <Link
              href="/hizmet"
              className="inline-flex px-4 py-2 text-sm bg-green-500 text-white rounded-md hover:bg-green-600"
            >
              SigIn
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
