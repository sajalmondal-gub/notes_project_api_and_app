import userRepository from "../repositories/user.repository.js";
import bcrypt from "bcrypt";

class UserService {
  async registerUser(sanitizedData) {
    const hashedPassword = await bcrypt.hash(sanitizedData.password, 10);
    return await userRepository.create({
      name: sanitizedData.name,
      email: sanitizedData.email,
      password: hashedPassword,
    });
    return await userRepository.create(userData);
  }
}

export default new UserService();
