import {
    AbstractDecoratorFactoryBuilder,
    ClassHandler,
    MethodHandler,
    ParameterHandler,
    PropertyHandler
} from '../abstract-decorator-factory-builder';
import {DecoratorUtil} from '../../decorator-util';
import {PropertyClassDecoratorFactoryBuilder} from './property-class-decorator-factory-builder';
import {PropertyMethodDecoratorFactoryBuilder} from './property-method-decorator-factory-builder';
import {ParameterPropertyDecoratorFactoryBuilder} from '../parameter/parameter-property-decorator-factory-builder';

type PropertyDecoratorFactory<OP> = (option: OP) => PropertyDecorator;

class PropertyDecoratorFactoryBuilder<V, OP> extends AbstractDecoratorFactoryBuilder<V, PropertyDecoratorFactory<OP>> {

    constructor(
        public metadataKey: symbol | string | undefined,
        public propertyHandler: PropertyHandler<V, OP>
    ) {
        super(metadataKey);
    }

    public build(): PropertyDecoratorFactory<OP> {
        return DecoratorUtil.makeParameterAndPropertyAndMethodAndClassDecorator<void, OP, void, void, V>(
            undefined, this.propertyHandler, undefined, undefined, this.metadataKey);
    }
    public class<OC = void>(
        classHandler: ClassHandler<V, OC>
    ): PropertyClassDecoratorFactoryBuilder<V, OP, OC> {
        return new PropertyClassDecoratorFactoryBuilder<V, OP, OC>(this.metadataKey, this.propertyHandler, classHandler);
    }

    public method<OM = void>(
        methodHandler: MethodHandler<V, OM>
    ): PropertyMethodDecoratorFactoryBuilder<V, OP, OM> {
        return new PropertyMethodDecoratorFactoryBuilder<V, OP, OM>(this.metadataKey, this.propertyHandler, methodHandler);
    }

    public property<OP = void>(
        propertyHandler: PropertyHandler<V, OP>
    ): PropertyDecoratorFactoryBuilder<V, OP> {
        return new PropertyDecoratorFactoryBuilder<V, OP>(this.metadataKey, propertyHandler);
    }

    public parameter<OPA = void>(
        parameterHandler: ParameterHandler<V, OPA>
    ): ParameterPropertyDecoratorFactoryBuilder<V, OPA, OP> {
        return new ParameterPropertyDecoratorFactoryBuilder<V, OPA, OP>(this.metadataKey, parameterHandler, this.propertyHandler);
    }

}

export {PropertyDecoratorFactory, PropertyDecoratorFactoryBuilder};
