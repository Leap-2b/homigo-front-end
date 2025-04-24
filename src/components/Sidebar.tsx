import React from "react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { ExternalLink } from "lucide-react";
import Link from "next/link";

const Sidebar = () => {
  return (
    <div>
      <ToggleGroup
        type="single"
        className="w-[205px] flex flex-col pt-[124px] items-start px-[40px]"
      >
        <Link href="/addProduct">
          <ToggleGroupItem
            value="Explore"
            aria-label="Toggle italic"
            className="h-[36px] py-2"
          >
            <p>Үйлчилгээ нэмэх</p>
          </ToggleGroupItem>
        </Link>

        <Link href="/order">
          <ToggleGroupItem
            value="ViewPage"
            aria-label="Toggle strikethrough"
            className="h-[36px] py-2"
          >
            <div className="flex items-center gap-2">
              <p>Захиалга</p>
              <ExternalLink />
            </div>
          </ToggleGroupItem>
        </Link>
      </ToggleGroup>
    </div>
  );
};

export default Sidebar;
