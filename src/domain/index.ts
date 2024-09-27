import Todo from "../todo/Todo";

type Controller = typeof Todo;

const controllers = <Controller[]>[Todo];

export { controllers };
