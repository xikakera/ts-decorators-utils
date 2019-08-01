import {
    AbstractDecoratorFactoryBuilder,
} from '../abstract-decorator-factory-builder';
import {ParameterHandler} from '../../bean/parameter-handler';
import {PropertyHandler} from '../../bean/property-handler';
import {ClassHandler} from '../../bean/class-handler';
import {MethodHandler} from '../../bean/method-handler';
import {DecoratorUtil} from '../../decorator-util';
import {ParameterMethodDecoratorFactoryBuilder} from './parameter-method-decorator-factory-builder';
import {ParameterClassDecoratorFactoryBuilder} from './parameter-class-decorator-factory-builder';
import {ParameterPropertyDecoratorFactoryBuilder} from './parameter-property-decorator-factory-builder';
import {ParameterDecoratorFactory} from './parameter-decorator-factory-builder';
import {PropertyDecoratorFactory} from '../property/property-decorator-factory-builder';
import {MethodDecoratorFactory} from '../method/method-decorator-factory-builder';
import {ParameterPropertyMethodClassDecoratorFactoryBuilder} from './parameter-property-method-class-decorator-factory-builder';
import {MetadataKey} from '../../bean/metadata-key';

type ParameterPropertyMethodDecoratorFactory<OPA, OP, OM> =
    ParameterDecoratorFactory<OPA> & PropertyDecoratorFactory<OP> & MethodDecoratorFactory<OM>;

class ParameterPropertyMethodDecoratorFactoryBuilder<V, OPA, OP, OM>
    extends AbstractDecoratorFactoryBuilder<V, ParameterPropertyMethodDecoratorFactory<OPA, OP, OM>> {

    constructor(
        public metadataKey: MetadataKey<V> | undefined,
        public parameterHandler: ParameterHandler<V, OPA>,
        public propertyHandler: PropertyHandler<V, OP>,
        public methodHandler: MethodHandler<V, OM>,
    ) {
        super(metadataKey);
    }

    public build(): ParameterPropertyMethodDecoratorFactory<OPA, OP, OM> {
        return DecoratorUtil.makeParameterAndPropertyAndMethodAndClassDecorator<OPA, OP, OM, void, V>(
            this.parameterHandler, this.propertyHandler, this.methodHandler, undefined, this.metadataKey);
    }

    public parameter<OPA = void>(
        parameterHandler: ParameterHandler<V, OPA>
    ): ParameterPropertyMethodDecoratorFactoryBuilder<V, OPA, OP, OM> {
        return new ParameterPropertyMethodDecoratorFactoryBuilder<V, OPA, OP, OM>(
            this.metadataKey, parameterHandler, this.propertyHandler, this.methodHandler);
    }
    public method<OM = void>(
        methodHandler: MethodHandler<V, OM>
    ): ParameterPropertyMethodDecoratorFactoryBuilder<V, OPA, OP, OM> {
        return new ParameterPropertyMethodDecoratorFactoryBuilder<V, OPA, OP, OM>(
            this.metadataKey, this.parameterHandler, this.propertyHandler, methodHandler);
    }
    public class<OC = void>(classHandler: ClassHandler<V, OC>): ParameterPropertyMethodClassDecoratorFactoryBuilder<V, OPA, OP, OM, OC> {
        return new ParameterPropertyMethodClassDecoratorFactoryBuilder<V, OPA, OP, OM, OC>(
            this.metadataKey, this.parameterHandler, this.propertyHandler, this.methodHandler, classHandler);
    }

    public property<OP = void>(propertyHandler: PropertyHandler<V, OP>): ParameterPropertyMethodDecoratorFactoryBuilder<V, OPA, OP, OM> {
        return new ParameterPropertyMethodDecoratorFactoryBuilder<V, OPA, OP, OM>(
            this.metadataKey, this.parameterHandler, propertyHandler, this.methodHandler);
    }

}

export {ParameterPropertyMethodDecoratorFactory, ParameterPropertyMethodDecoratorFactoryBuilder};