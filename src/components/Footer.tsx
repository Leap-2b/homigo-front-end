import Link from "next/link"
import { Facebook, Instagram, Mail, Phone, MapPin } from "lucide-react"

export default function Footer() {
    return (
        <footer className="w-full  text-black py-12 border mt-7">
            <div className="w-[90%] container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {/* About Us Section */}
                    <div className="flex flex-col gap-4">
                        <h3 className="text-black text-lg font-semibold border-b border-gray-700 pb-2">Бидний тухай</h3>
                        <p className="text-sm leading-relaxed">
                            Манай компани нь IT болон цэвэрлэгээний чиглэлээр мэргэшсэн ажилчдыг хувь хүн, байгууллагад найдвартай,
                            шуурхай зуучлах үйлчилгээ үзүүлдэг. Бид ажил хайгч ба ажил олгогчийн хэрэгцээг холбосон гүүр нь болж
                            ажилладаг.
                        </p>
                    </div>

                    {/* Services Section */}
                    <div className="flex flex-col gap-4">
                        <h3 className="text-black text-lg font-semibold border-b border-gray-700 pb-2">Үйлчилгээний чиглэлүүд:</h3>
                        <ul className="space-y-3 text-sm">
                            <li className=" transition-colors">
                                IT мэргэжилтний зуучлал (Компьютер формат засвар г.м.)
                            </li>
                            <li className="transition-colors">
                                Цэвэрлэгээний ажилтны зуучлал (Оффис, гэрийн болон байгууллагын цэвэрлэгээ г.м.)
                            </li>
                        </ul>
                    </div>

                    {/* Contact Section */}
                    <div className="flex flex-col gap-4">
                        <h3 className="text-black text-lg font-semibold border-b border-gray-700 pb-2">CONTACT US</h3>
                        <ul className="space-y-3 text-sm">
                            <li className="flex items-start gap-3">
                                <MapPin size={18} className="text-gray-400 mt-0.5 flex-shrink-0" />
                                <span> Ulaanbaatar, Mongolia</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Phone size={18} className="text-gray-400 flex-shrink-0" />
                                <span>+89796769</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Mail size={18} className="text-gray-400 flex-shrink-0" />
                                <span>Pinecone@gmail.com</span>
                            </li>
                        </ul>

                        <div className="flex gap-3 mt-4">
                            <Link href="#" className=" p-2 rounded-full hover:bg-gray-200 transition-colors">
                                <Facebook size={18} />
                            </Link>
                            <Link href="#" className=" p-2 rounded-full hover:bg-gray-200 transition-colors">
                                <Instagram size={18} />
                            </Link>

                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-800 mt-12 pt-6 text-sm text-center">
                    <p>© {new Date().getFullYear()}Homi-Go All rights reserved.</p>
                </div>
            </div>
        </footer>
    )
}
