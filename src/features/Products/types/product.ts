export interface Product {
  id: number;
  title: string;
  category: string;
  price: number;
  image: string;
}


export interface ProductCreate{
  name:string;
  category:string;
  price:number;
  description:string;
  rating:number;
  image_url:string;
}

export interface ProductUpdate{
  name?:string;
  category?:string;
  price?:number;
  description?:string;
  rating?:number;
  image_url?:string;
}
