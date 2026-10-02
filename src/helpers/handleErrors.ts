import { Response } from "express";
import { Prisma } from "../../generated/prisma/client";
import prismaErrorsCodes from "./prismaErrorCodes.json";

export function handleErrors(e: any, response: Response) { 
    console.error(e);

    if (e instanceof Prisma.PrismaClientKnownRequestError){
        return response.status(prismaErrorsCodes[e.code as keyof typeof prismaErrorsCodes] || 500).json(e.message.split("\n").pop());
    }

    return response.status(500).json("Unknown error. Try again later");
 }