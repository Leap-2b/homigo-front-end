import Link from "next/link"
import { Facebook, Instagram } from "lucide-react"
export default function Footer() {
    return (
        <footer className="w-full bg-white border-t border-gray-200 pt-12 pb-6">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
                    {/* Categories Column */}
                    <div>
                        <h3 className="text-gray-700 font-medium mb-4">Categories</h3>
                        <ul className="space-y-3">
                            <li>
                                <Link href="#" className="text-gray-500 hover:text-gray-700 text-sm">
                                    Cliener
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="text-gray-500 hover:text-gray-700 text-sm">
                                    IT
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* For Clients Column */}
                    <div>
                        <h3 className="text-gray-700 font-medium mb-4">For Clients</h3>
                        <ul className="space-y-3">

                            <li>
                                <Link href="#" className="text-gray-500 hover:text-gray-700 text-sm">
                                    Cleaner
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="text-gray-500 hover:text-gray-700 text-sm">
                                    IT
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="border-t border-gray-200 pt-6">
                    <div className="flex flex-col md:flex-row gap-6 items-center">
                        <div className="flex items-center mb-4 md:mb-0">
                            <Link href="/" >
                            </Link>
                            <span className="text-gray-400 text-sm">©Homi-Go. 2025</span>
                        </div>
                        <div className="flex items-center space-x-6">
                            <Link href="#" className="text-gray-500 hover:text-gray-700">
                                <Instagram className="h-5 w-5" />
                                <span className="sr-only">Instagram</span>
                            </Link>

                            <Link href="#" className="text-gray-500 hover:text-gray-700">
                                <Facebook className="h-5 w-5" />
                                <span className="sr-only">Facebook</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}
