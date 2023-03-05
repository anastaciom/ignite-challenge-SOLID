import { User } from "../../model/User";
import { IUsersRepository, ICreateUserDTO } from "../IUsersRepository";

class UsersRepository implements IUsersRepository {
  private users: User[];

  private static INSTANCE: UsersRepository;

  private constructor() {
    this.users = [];
  }

  public static getInstance(): UsersRepository {
    if (!UsersRepository.INSTANCE) {
      UsersRepository.INSTANCE = new UsersRepository();
    }

    return UsersRepository.INSTANCE;
  }

  create({ name, email }: ICreateUserDTO): User {
    const newUser = Object.assign(new User(), {
      name,
      email,
      created_at: new Date(),
      updated_at: new Date(),
    });

    this.users.push(newUser);

    return newUser;
  }

  findById(id: string): User | undefined {
    const findById = this.users.find((user) => user.id === id);

    return findById;
  }

  findByEmail(email: string): User | undefined {
    const findByEmail = this.users.find((user) => user.email === email);

    return findByEmail;
  }

  turnAdmin(receivedUser: User): User {
    const updatedUsers = this.users.map((user) => {
      if (user.id === receivedUser.id) {
        return { ...user, admin: true };
      }
      return user;
    });

    this.users = updatedUsers;

    const updatedUser = this.users.find((user) => user.id === receivedUser.id);

    return updatedUser;
  }

  list(): User[] {
    return this.users;
  }
}

export { UsersRepository };
