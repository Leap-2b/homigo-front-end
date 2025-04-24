import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function SocialLoginButtons() {
  return (
    <div className="grid grid-cols-2 gap-3">
      <Button variant="outline" className="border-gray-200">
        <Image
          src="/placeholder.svg?height=20&width=20"
          alt="Google"
          width={20}
          height={20}
          className="mr-2"
        />
        Google
      </Button>
      <Button variant="outline" className="border-gray-200">
        <Image
          src="/placeholder.svg?height=20&width=20"
          alt="Facebook"
          width={20}
          height={20}
          className="mr-2"
        />
        Facebook
      </Button>
    </div>
  );
}
