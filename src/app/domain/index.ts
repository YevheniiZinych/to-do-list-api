import Todo from "./todo/Person";

type Controller = typeof Todo;

const controllers = <Controller[]>[Todo];

export { controllers };
