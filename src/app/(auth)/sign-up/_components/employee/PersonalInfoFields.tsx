/* eslint-disable @typescript-eslint/no-explicit-any */

import React from "react";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

export interface PersonalInfoFormValues {
  firstName: string;
  lastName: string;
  register: string;
  secondPhone: string;
}

export const PersonalInfoFields = ({
  form,
}: {
  form: any
}) => {
  return (
    <>
      <div className="flex gap-4">
        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Нэр</FormLabel>
              <FormControl>
                <Input placeholder="Нэр" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="lastName"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Овог</FormLabel>
              <FormControl>
                <Input placeholder="Овог" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <FormField
        control={form.control}
        name="register"
        render={({ field }) => (
          <FormItem className="w-full">
            <FormLabel>Регистрийн дугаар</FormLabel>
            <FormControl>
              <Input placeholder="Жишээ: УН12345678" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="secondPhone"
        render={({ field }) => (
          <FormItem className="w-full">
            <FormLabel>Гэр бүлийн нэг хүний дугаар</FormLabel>
            <FormControl>
              <Input placeholder="Утасны дугаар" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};
