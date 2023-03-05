import { Request, Response } from "express";

import { ListAllUsersUseCase } from "./ListAllUsersUseCase";

class ListAllUsersController {
  constructor(private listAllUsersUseCase: ListAllUsersUseCase) {}

  handle(request: Request, response: Response): Response {
    const { user_id } = request.headers;
    const userIdString = Array.isArray(user_id) ? user_id[0] : user_id;

    try {
      const list = this.listAllUsersUseCase.execute({ user_id: userIdString });

      return response.json(list);
    } catch (error) {
      return response
        .status(400)
        .json({ error: error.message || "Erro ao buscar os usuários" });
    }
  }
}

export { ListAllUsersController };
