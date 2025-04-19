"use client";

import { useState } from "react";
import Image from "next/image";
import { Star, Search, MessageSquare, MapPin, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";

export default function ProfileCard() {
  const [activeTab, setActiveTab] = useState("timeline");

  return (
    <div className="flex items-center justify-center min-h-screenp-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-3xl overflow-hidden">
        <header className="p-4 border-b flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-sky-500 rounded-full w-8 h-8 flex items-center justify-center">
              <span className="text-white font-bold">CN</span>
            </div>
            <span className="font-semibold text-gray-800">Идэвхтэй</span>
          </div>

          <div className="flex items-center gap-6">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search"
                className="pl-8 pr-2 py-1 text-sm border rounded-md w-32 md:w-40"
              />
            </div>
            <button className="text-gray-600 text-sm">Ажилтан хайх</button>
            <div className="flex items-center gap-1">
              <MessageSquare className="w-4 h-4 text-gray-600" />
              <span className="text-gray-600 text-sm">Мессеж</span>
              <span className="bg-sky-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                2
              </span>
            </div>
            <button className="text-gray-600 text-sm">Холбоо барих</button>
          </div>
        </header>

        <div className="grid md:grid-cols-[250px_1fr] border-b">
          <div className="p-4">
            <Image
              src="/jar.jpg"
              alt="Profile picture"
              width={240}
              height={240}
              className="w-full aspect-square object-cover rounded-md"
            />
          </div>

          <div className="p-4">
            <div className="flex justify-between items-start">
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-xl font-semibold">Жаргалмаа</h1>
                  <span className="text-xs text-gray-500">УБ, Монгол</span>
                </div>
              </div>
              <Button variant="outline" size="sm" className="cursor-pointer">
                Цаг авах
              </Button>
            </div>

            <div className="mt-4">
              <p className="text-sm text-gray-500 uppercase">Үнэлгээ</p>
              <div className="flex items-center gap-2 mt-1">
                <span className="font-semibold">8.7</span>
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-4 h-4 ${
                        star <= 4
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <Button
                variant="default"
                size="sm"
                className="bg-gray-800 hover:bg-gray-700 cursor-pointer"
              >
                <MessageSquare className="w-4 h-4 mr-2" />
                Мессеж илгээх
              </Button>
              <Button variant="outline" size="sm" className="cursor-pointer">
                Холбоо барих
              </Button>
              <Button variant="outline" size="sm" className="cursor-pointer">
                Хар листэнд оруулах
              </Button>
            </div>

            <div className="mt-6">
              <Tabs defaultValue="timeline" className="w-full">
                <TabsList className="grid w-full grid-cols-2 max-w-[200px]">
                  <TabsTrigger
                    value="timeline"
                    className="text-xs cursor-pointer"
                  >
                    <MapPin className="w-3 h-3" />
                    Байршил
                  </TabsTrigger>
                  <TabsTrigger value="about" className="text-xs cursor-pointer">
                    <Info className="w-3 h-3 mr-1" />
                    Төлөв
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-[1fr_2fr] p-4 gap-6">
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium mb-2">Хувийн мэдээлэл</h3>

              <div className="space-y-4">
                <div className="flex gap-2">
                  <div className="w-10 h-10 bg-gray-100 rounded flex items-center justify-center">
                    <span className="text-xs">С</span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-medium">Албан ёсны хаяг</h4>
                      <span className="text-xs bg-gray-100 px-2 py-0.5 rounded">
                        Үндсэн
                      </span>
                    </div>
                    {/* <p className="text-xs text-gray-500">+1 999 555 7777</p> */}
                    <p className="text-xs text-gray-500">
                      Улаанбаатар БГД, Монгол
                    </p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <div className="w-10 h-10 bg-gray-100 rounded flex items-center justify-center">
                    <span className="text-xs">M</span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-medium">
                        Түр оршин суугаа хаяг
                      </h4>
                    </div>
                    <p className="text-xs text-gray-500">77119941</p>
                    <p className="text-xs text-gray-500">
                      Улаанбаатар, СБД гурван гол
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium mb-2">Ур чадвар</h3>
              <div>
                <li>Хурдтай</li>
                <li>Цэвэрлэгээний хэрэгсэл</li>
                <li>Тууштай</li>
                <li>Цаг баримтлал</li>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="text-xs text-gray-500 mb-1">Утас</h3>
                <p className="text-sm">+976 99997788</p>
              </div>

              <div>
                <h3 className="text-xs text-gray-500 mb-1">
                  Түр оршин суугаа хаяг
                </h3>
                <p className="text-sm">УБ БЗД</p>
                <p className="text-xs text-gray-500">Намянжү</p>
              </div>

              <div>
                <h3 className="text-xs text-gray-500 mb-1">И-Мэйл</h3>
                <p className="text-sm text-sky-500">jagaa@gmail.com</p>
              </div>

              <div>
                <h3 className="text-xs text-gray-500 mb-1">Вэбсайт</h3>
                <Link href={"/"}>
                  <p className="text-sm text-sky-500">www.homigo.mn</p>
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="text-xs text-gray-500 mb-1">
                  Төрсөн он сар өдөр
                </h3>
                <p className="text-sm">11 / 22 ****</p>
              </div>

              <div>
                <h3 className="text-xs text-gray-500 mb-1">Хүйс</h3>
                <p className="text-sm">Эм</p>
              </div>
            </div>
          </div>
        </div>
        <div className="grid md:grid-cols-[1fr_2fr] p-4 gap-6">
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium mb-2">Ажлын туршлага</h3>

              <div className="space-y-4">
                <div className="flex gap-2">
                  <div className="w-10 h-10 bg-gray-100 rounded flex items-center justify-center">
                    <span className="text-xs">С</span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-medium">Байгуулагын нэр</h4>
                      <span className="text-xs bg-gray-100 px-2 py-0.5 rounded">
                        Үндсэн
                      </span>
                    </div>
                    {/* <p className="text-xs text-gray-500">+1 999 555 7777</p> */}
                    <p className="text-xs text-gray-500">Пайнконэ, Монгол</p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <div className="w-10 h-10 bg-gray-100 rounded flex items-center justify-center">
                    <span className="text-xs">Ж</span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-medium">Байгуулагын нэр</h4>
                    </div>
                    <p className="text-xs text-gray-500">Оюу толгой, Монгол</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="text-xs text-gray-500 mb-1">Ажлын байр</h3>
                <p className="text-sm">Үйлчлэгч (үндсэн) </p>
              </div>

              <div>
                <h3 className="text-xs text-gray-500 mb-1">Хаяг</h3>
                <p className="text-sm">Улаанбаатар, БГД</p>
                <p className="text-xs text-gray-500">
                  Централ товер (13 давхар)
                </p>
              </div>

              <div>
                <h3 className="text-xs text-gray-500 mb-1">Ажлын байр</h3>
                <p className="text-sm">Ахлах үйлчлэгч</p>
              </div>

              <div>
                <h3 className="text-xs text-gray-500 mb-1">Вэбсайт</h3>
                <p className="text-sm text-sky-500">www.homigo.mn</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="text-xs text-gray-500 mb-1">Орсон</h3>
                <p className="text-sm">20 / 10 / 2020</p>
              </div>

              <div>
                <h3 className="text-xs text-gray-500 mb-1">Гарсан</h3>
                <p className="text-sm">01 / 06 / 2025</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
