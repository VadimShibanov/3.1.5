package web.service;


import web.model.User;

import java.util.List;

public interface UsersService {

    List<User> getAllUsers();

    void saveUser(User user);

    User getUserById(Long id);

    User getUserByUsername(String username);

    void updateUser(User user);

    void removeUserById(Long id);
}
