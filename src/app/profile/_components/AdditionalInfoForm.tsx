"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { SocialLoginButtons } from "./SocialLoginButtons";
import { employeType } from "@/types/user";

const additionalInfoSchema = z.object({
  registerNumber: z.string().regex(/^[А-ЯӨҮ]{2}\d{8}$/, {
    message:
      "Регистрийн дугаар нь эхэндээ 2 кирилл үсэг, дараа нь 8 оронтой тоо байх ёстой.",
  }),
  phoneNumber: z.string().min(8, {
    message: "Утасны дугаар хамгийн багадаа 8 оронтой байх ёстой",
  }),
  address: z
    .string()
    .min(5, "Хаяг 5-аас олон тэмдэгттэй байх ёстой")
    .max(200, "Хаяг 200-аас бага тэмдэгттэй байх ёстой"),
  experience: z
    .string()
    .min(2, "Туршлага 2-аас олон тэмдэгттэй байх ёстой")
    .max(1000, "Туршлага 1000-аас бага тэмдэгттэй байх ёстой"),
  secondPhone: z.string().min(8, {
    message: "Утасны дугаар хамгийн багадаа 8 оронтой байх ёстой",
  }),
});

type AdditionalInfoValues = z.infer<typeof additionalInfoSchema>;

interface AdditionalInfoFormProps {
  onSubmit: (values: AdditionalInfoValues) => void;
  defaultValues?: Partial<AdditionalInfoValues>;
  currentEmploye: employeType | null;
}

export const AdditionalInfoForm = ({
  onSubmit,
  currentEmploye,
}: AdditionalInfoFormProps) => {
  const form = useForm<AdditionalInfoValues>({
    resolver: zodResolver(additionalInfoSchema),
    defaultValues: {
      registerNumber: currentEmploye ? currentEmploye.register : "",
      phoneNumber: currentEmploye ? String(currentEmploye.phone) : "",
      address: currentEmploye ? currentEmploye.address : "",
      experience: currentEmploye ? currentEmploye.experience : "",
      secondPhone: currentEmploye ? String(currentEmploye.secondPhone) : "",
    },
  });

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <h2 className="text-2xl font-bold mb-6">Бусад мэдээлэл</h2>

          <div className="space-y-4">
            <div className="flex gap-4">
              <FormField
                control={form.control}
                name="registerNumber"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Регистрийн дугаар</FormLabel>
                    <FormControl>
                      <Input placeholder="АА1234567" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Утасны дугаар</FormLabel>
                    <FormControl>
                      <Input placeholder="дугаар оруулна уу" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Хаяг</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Хаягаа оруулна уу"
                      className="min-h-[80px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="experience"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Туршлага</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Туршлагаа оруулна уу"
                      className="min-h-[80px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="secondPhone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Гэр бүлийн нэг хүний дугаар</FormLabel>
                  <FormControl>
                    <Input placeholder="дугаар оруулна уу" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full bg-[#3c87f7] hover:bg-[#2672e4] text-white"
            >
              Хадгалах
            </Button>
          </div>
        </form>
      </Form>

      <SocialLoginButtons />
    </>
  );
};
