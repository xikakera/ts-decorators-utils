import {
    AbstractDecoratorFactoryBuilder,
} from '../abstract-decorator-factory-builder';
import {ParameterHandler} from '../../bean/parameter-handler';
import {PropertyHandler} from '../../bean/property-handler';
import {ClassHandler} from '../../bean/class-handler';
import {MethodHandler} from '../../bean/method-handler';
import {ParameterDecoratorFactory} from './parameter-decorator-factory-builder';
import {MethodDecoratorFactory} from '../method/method-decorator-factory-builder';
import {DecoratorUtil} from '../../decorator-util';
import {ParameterMethodClassDecoratorFactoryBuilder} from './parameter-method-class-decorator-factory-builder';
import {ParameterPropertyMethodDecoratorFactoryBuilder} from './parameter-property-method-decorator-factory-builder';
import {MetadataKey} from '../../bean/metadata-key';

type ParameterMethodDecoratorFactory<OPA, OM> = ParameterDecoratorFactory<OPA> & MethodDecoratorFactory<OM>;


class ParameterMethodDecoratorFactoryBuilder<V, OPA, OM> extends
    AbstractDecoratorFactoryBuilder<V, ParameterMethodDecoratorFactory<OPA, OM>> {

    constructor(
        public metadataKey: MetadataKey<V> | undefined,
        public parameterHandler: ParameterHandler<V, OPA>,
        public methodHandler: MethodHandler<V, OM>
    ) {
        super(metadataKey);
    }

    public build(): ParameterMethodDecoratorFactory<OPA, OM> {
        return DecoratorUtil.makeParameterAndPropertyAndMethodAndClassDecorator<OPA, void, OM, void, V>(
            this.parameterHandler, undefined, this.methodHandler, undefined, this.metadataKey);
    }

    public parameter<OPA = void>(parameterHandler: ParameterHandler<V, OPA>
    ): ParameterMethodDecoratorFactoryBuilder<V, OPA, OM> {
        return new ParameterMethodDecoratorFactoryBuilder<V, OPA, OM>(this.metadataKey, parameterHandler, this.methodHandler);
    }
    public method<OM = void>(
        methodHandler: MethodHandler<V, OM>
    ): ParameterMethodDecoratorFactoryBuilder<V, OPA, OM> {
        return new ParameterMethodDecoratorFactoryBuilder<V, OPA, OM>(this.metadataKey, this.parameterHandler, methodHandler);
    }
    public class<OC = void>(classHandler: ClassHandler<V, OC>): ParameterMethodClassDecoratorFactoryBuilder<V, OPA, OM, OC> {
        return new ParameterMethodClassDecoratorFactoryBuilder<V, OPA, OM, OC>(
            this.metadataKey, this.parameterHandler, this.methodHandler, classHandler);
    }

    public property<OP = void>(propertyHandler: PropertyHandler<V, OP>): ParameterPropertyMethodDecoratorFactoryBuilder<V, OPA, OP, OM> {
        return new ParameterPropertyMethodDecoratorFactoryBuilder<V, OPA, OP, OM>(
            this.metadataKey, this.parameterHandler, propertyHandler, this.methodHandler
        )
    }
}

export {ParameterMethodDecoratorFactory, ParameterMethodDecoratorFactoryBuilder};