import { v4 } from "https://deno.land/std/uuid/mod.ts";
import { Product } from "../models/product.ts";

let products: Product[] = [
  {
    id: "0242876f-f0f0-4d40-9821-803e50e9b8d9",
    name: "Abraxas",
    description: "This is Product One",
    price: 50,
  },
  {
    id: "e59d1ca1-055c-4283-a00e-908b644e24f9",
    name: "BT V2",
    description: "This is Product Two",
    price: 100,
  },
  {
    id: "23083d64-e834-4519-99fc-c74258f860e4",
    name: "BT V1",
    description: "This is Product Three",
    price: 150,
  },
  {
    id: "7f2e8204-c0b6-43b7-a8ed-a72dd3bc29af",
    name: "SesaMe",
    description: "This is Product Three",
    price: 150,
  },
];

export const getProducts = ({ response }: { response: any }) => {
  response.body = {
    success: true,
    data: products,
  };
};

export const getProduct = ({
  params,
  response,
}: {
  params: { id: string };
  response: any;
}) => {
  const product: Product | undefined = products.find(
    (p) => p.id === params.id,
  );

  if (product) {
    response.status = 200;
    response.body = {
      success: true,
      data: product,
    };
  } else {
    response.status = 404;
    response.body = {
      success: false,
      msg: "No Product Found",
    };
  }
};

export const addProduct = async (
  { request, response }: { request: any; response: any },
) => {
  const body = await request.body();

  if (!request.hasBody) {
    response.status = 400;
    response.body = {
      success: false,
      msg: "No Data",
    };
  } else {
    const newProduct: Product = body.value;
    newProduct.id = v4.generate();
    products.push(newProduct);
    response.status = 201;
    response.body = {
      success: true,
      data: newProduct,
    };
  }
};

export const updateProduct = async (
  { params, request, response }: {
    params: { id: string };
    request: any;
    response: any;
  },
) => {
  const product: Product | undefined = products.find((p) => p.id === params.id);

  if (product) {
    const body = await request.body();

    const updateData: { name?: string; description?: string; price?: number } =
      body.value;

    products = products.map((p) =>
      p.id === params.id ? { ...p, ...updateData } : p
    );

    response.status = 200;
    response.body = {
      success: true,
      data: products,
    };
  } else {
    response.status = 404;
    response.body = {
      success: false,
      msg: "No Product Found",
    };
  }
};

export const deleteProduct = (
  { params, response }: { params: { id: string }; response: any },
) => {
  products = products.filter((p) => p.id !== params.id);
  response.body = {
    success: true,
    msg: "Product Removed",
  };
};
