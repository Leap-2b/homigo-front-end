export type userType = {
  _id?: string;
  userName?: string;
  email?: string;
  phone?: number;
  password?: string;
  role?: string;
};
export type employeType = {
  about: string;
  address: string;
  category: string;
  email: string;
  experience: string;
  firstName: string;
  img: string;
  lastName: string;
  password: string;
  phone: number;
  products: productsType;
  register: string;
  secondPhone: string;
  __v: number;
  _id: string;
  likedBy: string[];
};

export type productsType = {
  description: string;
  name: string;
  price: number;
  _id: string;
};

export type orderType = {
  _id: string;
  orderStatus: string;
  request: string;
  productId: productsType[];
  userId: string;
  employeId: string;
  isPaid: boolean;
  totalPrice: number;
};
