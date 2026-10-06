import { Request, Response } from "express";
import { prisma } from "../../config/prisma";
import { handleErrors } from "../helpers/handleErrors";

export default{
    list: async ( request: Request, response: Response ) => {
        try {
            const cursos = await prisma.aluno.findMany({
                include: {
                    cursos: true,
                },
            });

            return response.status(200).json(cursos);
        } catch(e) {
            return handleErrors(e, response);
        }
    },

    getById: async(request: Request, response: Response) => {
        try {
            const { id } = request.params;

            const curso = await prisma.curso.findUnique({
                where: { 
                    id: +id,
                 },
                 include: {
                    alunos: true,
                 },
            })
            
            return response.status(200).json(curso);
        } catch (e) {
            return handleErrors(e, response);
        }
    },

    create: async(request: Request, response: Response) => {
        try {
            const { nome, carga, descricao } = request.body;

            if(!carga || !descricao || !nome ){
                return response.status(400).json("Dados do aluno incompletos")
            }

            const curso = await prisma.curso.create({
                data: {
                    cargaHoraria: carga,
                    nome,
                    descricao,
                },
            });

            return response.status(201).json(curso);

        } catch (e) {
            return handleErrors(e, response); 
        }
    },

    update: async(request: Request, response: Response) => {
        try {
            const { id } = request.params;
            const { nome, carga, descricao } = request.body;

            const curso = await prisma.curso.update({
                where: {
                    id: +id,
                },
                data: {
                    cargaHoraria: carga,
                    nome,
                    descricao,
                },
            });

            return response.status(200).json(curso);
        } catch (e) {
            return handleErrors(e, response);
        }
    },

    delete: async (request: Request, response: Response) => {
        try {
            const { id } = request.params;

            const curso = await prisma.curso.delete({
                where: {
                    id: +id,

                },
            });

            return response.status(200).json(curso)
        } catch (e){ 
            return handleErrors(e, response);
        }
    }
};