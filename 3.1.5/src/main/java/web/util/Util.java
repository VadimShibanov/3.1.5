package web.util;

import web.model.Role;
import web.model.User;
import web.service.RoleService;
import web.service.UsersService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;


import javax.annotation.PostConstruct;
import java.util.Set;

@Component
public class Util {

    private final RoleService roleService;
    private final UsersService usersService;

    @Autowired
    public Util(RoleService roleService, UsersService usersService) {
        this.roleService = roleService;
        this.usersService = usersService;
    }

    @PostConstruct
    public void initialization() {
        Role roleAdmin = new Role("ROLE_ADMIN");
        Role roleUser = new Role("ROLE_USER");

        if (roleService.getRoles().isEmpty()) {
            roleService.saveRole(roleAdmin);
            roleService.saveRole(roleUser);
        }

        User admin = new User("vladimirowitch.vadim@gmal.com", "100", "Vadim", "Black", Set.of(roleAdmin, roleUser),21);
        usersService.saveUser(admin);

        roleService.saveRole(roleUser);
        User user = new User("vladimirowitch.vadim@yandex.ru","200", "Melissa", "White", Set.of(roleUser),44);
        usersService.saveUser(user);

    }
}
