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

export interface SecurityFormValues {
  password: string;
  confirmPassword: string;
}

export const SecurityFields = ({
  form,
}: {
  form: any
}) => {
  return (
    <div className="flex gap-4">
      <FormField
        control={form.control}
        name="password"
        render={({ field }) => (
          <FormItem className="w-full">
            <FormLabel>Нууц үг</FormLabel>
            <FormControl>
              <Input type="password" placeholder="********" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="confirmPassword"
        render={({ field }) => (
          <FormItem className="w-full">
            <FormLabel>Нууц үг давтах</FormLabel>
            <FormControl>
              <Input type="password" placeholder="********" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};
