interface Category {
  id: string;
  title: string;
  icon: string;
  url: string;
}

const categories: Category[] = [
  {
    id: "IT",
    title: "Компьютер засвар үйлчилгээ",
    icon: "monitor",
    url: "/categories/programming-tech",
  },
  {
    id: "CLEANER",
    title: "Орон байр цэвэрлэгээ үйлчилгээ",
    icon: "square",
    url: "/icons8.png",
  },
];

export default function CardSlider({
  handleFilter,
}: {
  handleFilter: (id: string) => void;
}) {
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
    <main className="py-16 flex flex-col">
      <div className="flex gap-5 items-center flex-col md:flex-row">
        {categories.map((category) => {
          const titleParts = category.title.split("&");
          return (
            <div
              key={category.id}
              className="bg-white flex gap-3 md:gap-5 p-4 md:p-5 items-center rounded-lg shadow-md w-full sm:w-[350px] h-auto min-h-[64px] md:h-16 justify-center transition all ease-in hover:-translate-y-1.5 hover:shadow-xl"
              onClick={() => handleFilter(category.id)}
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
