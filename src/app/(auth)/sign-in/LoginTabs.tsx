import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import EmployeeLoginForm from "./EmployeeLoginForm";
import ClientLoginForm from "./ClientLoginForm";

export default function LoginTabs() {
  return (
    <Tabs defaultValue="login">
      <TabsList className="w-full grid grid-cols-2">
        <TabsTrigger
          value="login"
          className="data-[state=active]:bg-[#3c87f7] data-[state=active]:text-white"
        >
          Ажилтан
        </TabsTrigger>
        <TabsTrigger
          value="register"
          className="data-[state=active]:bg-[#3c87f7] data-[state=active]:text-white"
        >
          Хэрэглэгч
        </TabsTrigger>
      </TabsList>

      <TabsContent value="login" className="p-6">
        <EmployeeLoginForm />
      </TabsContent>

      <TabsContent value="register" className="p-6">
        <ClientLoginForm />
      </TabsContent>
    </Tabs>
  );
}
