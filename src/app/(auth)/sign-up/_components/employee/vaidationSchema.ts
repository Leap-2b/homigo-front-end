import { z } from "zod";

export const formSchema = z
  .object({
    password: z.string().min(6, {
      message: "Нууц үг хамгийн багадаа 6 тэмдэгт байх ёстой.",
    }),
    confirmPassword: z.string().min(6, {
      message: "Нууц үг хамгийн багадаа 6 тэмдэгт байх ёстой.",
    }),
    firstName: z.string().min(3, {
      message: "Нэр хамгийн багадаа 3 тэмдэгт байх ёстой.",
    }),
    lastName: z.string().min(3, {
      message: "Овог хамгийн багадаа 3 тэмдэгт байх ёстой.",
    }),
    register: z.string().regex(/^[А-ЯӨҮ]{2}\d{8}$/, {
      message:
        "Регистрийн дугаар нь эхэндээ 2 кирилл үсэг, дараа нь 8 оронтой тоо байх ёстой.",
    }),
    about: z.string().min(3, {
      message: "Хаяг хамгийн багадаа 3 тэмдэгт байх ёстой.",
    }),
    address: z.string().min(3, {
      message: "Хаяг хамгийн багадаа 3 тэмдэгт байх ёстой.",
    }),
    secondPhone: z.string().min(3, {
      message: "Утасны дугаар хамгийн багадаа 3 тэмдэгт байх ёстой.",
    }),
    experience: z.string().min(1, {
      message: "Туршлага хамгийн багадаа 1 тэмдэгт байх ёстой.",
    }),
    category: z.string().min(2, {
      message: "Ажлын төрөл хамгийн багадаа 2 тэмдэгт байх ёстой.",
    }),
    img: z.string().min(1, {
      message: "Ажлын төрөл хамгийн багадаа 1 тэмдэгт байх ёстой.",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Нууц үг таарахгүй байна.",
    path: ["confirmPassword"],
  });
