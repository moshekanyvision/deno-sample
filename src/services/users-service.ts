import { v4 } from "https://deno.land/std/uuid/mod.ts";
import { User } from "../models/user.ts";

let users: User[] = [
  {
    id: "f5e65232-066d-4628-9569-050a9df4f1bc",
    name: "Aksinia Hilarius",
    hobby: "Ski",
  },
  {
    id: "6ae1d4f9-5b84-4a6a-9140-d892ef77963a",
    name: "Xulia Shawn",
    hobby: "Guitar",
  },
  {
    id: "52da51dd-02bc-4cc1-a753-94754e299234",
    name: "Ramazi Tifawts",
    hobby: "Soccer",
  },
  {
    id: "c39554cb-e8aa-48cb-ba2d-25c1633ced9c",
    name: "Deb Erhan",
    hobby: "Reading",
  },
];

export const getUsers = ({ response }: { response: any }) => {
  response.body = {
    success: true,
    data: users,
  };
};

export const getUser = ({
  params,
  response,
}: {
  params: { id: string };
  response: any;
}) => {
  const user: User | undefined = users.find(
    (u) => u.id === params.id,
  );

  if (user) {
    response.status = 200;
    response.body = {
      success: true,
      data: user,
    };
  } else {
    response.status = 404;
    response.body = {
      success: false,
      msg: "No User Found",
    };
  }
};

export const addUser = async (
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
    const newUser: User = body.value;
    newUser.id = v4.generate();
    users.push(newUser);
    response.status = 201;
    response.body = {
      success: true,
      data: newUser,
    };
  }
};

export const updateUser = async (
  { params, request, response }: {
    params: { id: string };
    request: any;
    response: any;
  },
) => {
  const user: User | undefined = users.find((u) => u.id === params.id);

  if (user) {
    const body = await request.body();

    const updatedData: { name?: string; hobby?: string } = body.value;

    users = users.map((u) => u.id === params.id ? { ...u, ...updatedData } : u);

    response.status = 200;
    response.body = {
      success: true,
      data: users,
    };
  } else {
    response.status = 404;
    response.body = {
      success: false,
      msg: "No User Found",
    };
  }
};

export const deleteUser = (
  { params, response }: { params: { id: string }; response: any },
) => {
  users = users.filter((p) => p.id !== params.id);
  response.body = {
    success: true,
    msg: "User Removed",
  };
};
