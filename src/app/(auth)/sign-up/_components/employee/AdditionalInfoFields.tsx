// components/employee/AdditionalInfoFields.tsx
import React from "react";
import { UseFormReturn } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";

export const AdditionalInfoFields = ({
  form,
  setAddress,
  setExperience,
  setCategory,
}: {
  form: UseFormReturn<any>;
  setAddress: React.Dispatch<React.SetStateAction<string>>;
  setExperience: React.Dispatch<React.SetStateAction<string>>;
  setCategory: React.Dispatch<React.SetStateAction<string>>;
}) => {
  return (
    <>
      <FormField
        control={form.control}
        name="about"
        render={({ field }) => (
          <FormItem className="w-full">
            <FormLabel>Миний тухай</FormLabel>
            <FormControl>
              <Textarea placeholder="Өөрийнхөө товч танилцуулга" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="address"
        render={({ field }) => (
          <FormItem className="w-full">
            <FormLabel>Гэрийн хаяг</FormLabel>
            <FormControl>
              <select
                className="w-full p-2 border rounded-md"
                {...field}
                onChange={(e) => {
                  field.onChange(e.target.value);
                  setAddress(e.target.value);
                }}
              >
                <option value="">Сонгох</option>
                <option value="Улаанбаатар">Улаанбаатар</option>
                <option value="Хөдөө орон нутаг">Хөдөө орон нутаг</option>
              </select>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="experience"
        render={({ field }) => (
          <FormItem className="w-full">
            <FormLabel>Ажлын Туршлага</FormLabel>
            <FormControl>
              <select
                className="w-full p-2 border rounded-md"
                {...field}
                onChange={(e) => {
                  field.onChange(e.target.value);
                  setExperience(e.target.value);
                }}
              >
                <option value="">Сонгох</option>
                <option value="1 4жил">1жил</option>
                <option value="2 4жил">2жил</option>
                <option value="3 4жил">3жил</option>
                <option value="4 4жил">4жил</option>
                <option value="5+ жил">5+ жил</option>
              </select>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="category"
        render={({ field }) => (
          <FormItem className="w-full">
            <FormLabel>Ажлын төрөл</FormLabel>
            <FormControl>
              <select
                className="w-full p-2 border rounded-md"
                {...field}
                onChange={(e) => {
                  field.onChange(e.target.value);
                  setCategory(e.target.value);
                }}
              >
                <option value="">Сонгох</option>
                <option value="IT">Компьютер засвар</option>
                <option value="CLEANER">Цэвэрлэгч</option>
              </select>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};
