interface Category {
  id: string;
  title: string;
  icon: string;
  url: string;
}

const categories: Category[] = [
  {
    id: "programming-tech",
    title: "Компьютер засвар үйлчилгээ",
    icon: "monitor",
    url: "/categories/programming-tech",
  },
  {
    id: "Цэвэрлэгээ үйлчилгээ",
    title: "Орон байр цэвэрлэгээ үйлчилгээ",
    icon: "square",
    url: "/icons8.png",
  },
];

export default function CardSlider() {
  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case "monitor":
        return "💻";

      case "square":
        return "🏠";
    }
  };

  return (
    <main className="py-16 flex flex-col w-[80vw]">
      <h1 className="text-3xl font-bold mb-8 text-[#222] ">Ангиллуудыг үзэх</h1>
      <div className="flex  gap-5 w-300 items-center ">
        {categories.map((category) => {
          const titleParts = category.title.split("&");
          return (
            <div
              key={category.id}
              className="bg-white flex gap-5  p-5 items-center rounded-lg shadow-md w-[350px] h-16 justify-center transition all ease-in
 hover:-translate-y-1.5 hover:shadow-xl"
            >
              <div className="flex flex-col justify-center ">
                <div className="rounded-md">{renderIcon(category.icon)}</div>
              </div>
              <h2 className="font-semibold text-[14px] ">
                {titleParts[0].trim()}
                {titleParts.length > 1 && (
                  <h2>
                    <br />& {titleParts[1].trim()}
                  </h2>
                )}
              </h2>
            </div>
          );
        })}
      </div>
    </main>
  );
}
