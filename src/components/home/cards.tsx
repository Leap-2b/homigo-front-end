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
    id: "cleaning-service",
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
      default:
        return "🔧";
    }
  };

  return (
    <main className="py-8 md:py-16 flex flex-col w-full px-4 md:px-0 md:w-[80vw] mx-auto">
      <h1 className="text-2xl md:text-3xl font-bold mb-4 md:mb-8 text-[#222]">
        Ангиллуудыг үзэх
      </h1>
      <div className="flex flex-col sm:flex-row gap-4 md:gap-5 w-full items-center">
        {categories.map((category) => {
          const titleParts = category.title.split("&");
          return (
            <div
              key={category.id}
              className="bg-white flex gap-3 md:gap-5 p-4 md:p-5 items-center rounded-lg shadow-md w-full sm:w-[350px] h-auto min-h-[64px] md:h-16 justify-center transition all ease-in hover:-translate-y-1.5 hover:shadow-xl"
            >
              <div className="flex flex-col justify-center text-xl md:text-2xl">
                <div className="rounded-md">{renderIcon(category.icon)}</div>
              </div>
              <h2 className="font-semibold text-[13px] md:text-[14px]">
                {titleParts[0].trim()}
                {titleParts.length > 1 && (
                  <span className="block">& {titleParts[1].trim()}</span>
                )}
              </h2>
            </div>
          );
        })}
      </div>
    </main>
  );
}
