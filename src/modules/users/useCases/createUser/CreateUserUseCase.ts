import { User } from "../../model/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
  name: string;
  email: string;
}

class CreateUserUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  execute({ email, name }: IRequest): User {
    const userAlreadyExists = this.usersRepository.findByEmail(email);

    const hasParams = Object.entries({ email, name });

    hasParams.forEach(([key, value]) => {
      if (!value) {
        throw new Error(`${key} é obrigatório.`);
      }
    });

    if (userAlreadyExists) {
      throw new Error("E-mail já cadastrado.");
    }

    return this.usersRepository.create({ email, name });
  }
}

export { CreateUserUseCase };
