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
import { ProfilePictureUpload } from "./ProfilePictureUpload";

const personalFormSchema = z.object({
  surname: z
    .string()
    .min(2, "Овог 2-оос олон тэмдэгттэй байх ёстой")
    .max(50, "Овог 50-аас бага тэмдэгттэй байх ёстой"),
  name: z
    .string()
    .min(2, "Нэр 2-оос олон тэмдэгттэй байх ёстой")
    .max(50, "Нэр 50-аас бага тэмдэгттэй байх ёстой"),
  about: z
    .string()
    .min(10, "Танилцуулга 10-аас олон тэмдэгттэй байх ёстой")
    .max(500, "Танилцуулга 500-аас бага тэмдэгттэй байх ёстой"),
  email: z
    .string()
    .email("Зөв емайл хаяг оруулна уу")
    .min(5, "Емайл хаяг 5-аас олон тэмдэгттэй байх ёстой"),
});

type PersonalFormValues = z.infer<typeof personalFormSchema>;

interface PersonalInfoFormProps {
  onSubmit: (values: PersonalFormValues) => void;
  defaultValues?: Partial<PersonalFormValues>;
}

export const PersonalInfoForm = ({ onSubmit }: PersonalInfoFormProps) => {
  const form = useForm<PersonalFormValues>({
    resolver: zodResolver(personalFormSchema),
    defaultValues: {
      surname: "",
      name: "",
      about: "",
      email: "",
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <h2 className="text-2xl font-bold mb-6">Хувийн мэдээлэл</h2>

        <ProfilePictureUpload />
        <p className="text-center mb-6 text-gray-500">Зураг soli</p>

        <div className="space-y-4">
          <div className="flex gap-4">
            <FormField
              control={form.control}
              name="surname"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Овог</FormLabel>
                  <FormControl>
                    <Input placeholder="Овог" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Нэр</FormLabel>
                  <FormControl>
                    <Input placeholder="Нэр" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="about"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Тухай</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Би шинэ зүйлс судлах, аялах дуртай. Мөн хөгжим тоглох миний хобби юм."
                    className="min-h-[120px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Емайл хаяг</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="Емайл оруулна уу"
                    {...field}
                  />
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
  );
};
