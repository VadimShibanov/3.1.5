package web.service;

import web.model.Role;

import java.util.List;

public interface RoleService {

    List<Role> getRoles();

    List<Role> getUniqAllRoles();

    void saveRole(Role roleAdmin);
}
