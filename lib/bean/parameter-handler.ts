import {Constructor} from './constructor';

export type ParameterHandler<V, OPA> =
    ((option: OPA, target: Object, propertyKey: string | symbol, parameterIndex: number, type: Constructor) => V) | void;
