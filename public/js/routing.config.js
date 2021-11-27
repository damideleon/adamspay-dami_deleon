Routing.when({
    path: "/clientes",
    template: "/users"
}).when({
    path: "/servicios",
    template: "/servicios"
}).other({
    template: "/404"
}).unautorized({
    template: "/autorizacion"
}).default({
    template: "/home"
}).on();