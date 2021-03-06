import {AbstractDecoratorFactoryBuilder,} from '../abstract-decorator-factory-builder';
import {ParameterHandler} from '../../bean/parameter-handler';
import {PropertyHandler} from '../../bean/property-handler';
import {ClassHandler} from '../../bean/class-handler';
import {MethodHandler} from '../../bean/method-handler';
import {ParameterDecoratorFactory} from './parameter-decorator-factory-builder';
import {ClassDecoratorFactory} from '../class/class-decorator-factory-builder';
import {ParameterMethodClassDecoratorFactoryBuilder} from './parameter-method-class-decorator-factory-builder';
import {ParameterPropertyClassDecoratorFactoryBuilder} from './parameter-property-class-decorator-factory-builder';
import {MetadataDecoratorFactory} from "../../bean/metadata-decorator-factory";
import {MakeDecoratorUtil} from "../../make-decorator-util";

type DecoratorFactoryUnionType<OPA, OC> = ParameterDecoratorFactory<OPA> & ClassDecoratorFactory<OC>;

type ParameterClassDecoratorFactory<OPA, OC> = OPA extends OC
    ? OC extends OPA
        ? (option: OPA) => ParameterDecorator & ClassDecorator
        : DecoratorFactoryUnionType<OPA, OC>
    : DecoratorFactoryUnionType<OPA, OC>;

class ParameterClassDecoratorFactoryBuilder<V, OPA, OC>
    extends AbstractDecoratorFactoryBuilder<V, ParameterClassDecoratorFactory<OPA, OC>> {

    constructor(
        public metadataKey: string | symbol | undefined,
        public parameterHandler: ParameterHandler<V, OPA>,
        public classHandler: ClassHandler<V, OC>
    ) {
        super(metadataKey);
    }

    public build(): MetadataDecoratorFactory<ParameterClassDecoratorFactory<OPA, OC>, V> {
        return <any> MakeDecoratorUtil.makeParameterAndPropertyAndMethodAndClassDecorator<OPA, void, void, OC, V>(
            this.parameterHandler, undefined, undefined, this.classHandler, this.metadataKey);
    }

    public parameter<OPA = void>(
        parameterHandler: ParameterHandler<V, OPA>
    ): ParameterClassDecoratorFactoryBuilder<V, OPA, OC> {
        return new ParameterClassDecoratorFactoryBuilder<V, OPA, OC>(this.metadataKey, parameterHandler, this.classHandler);
    }
    public method<OM = void>(
        methodHandler: MethodHandler<V, OM>
    ): ParameterMethodClassDecoratorFactoryBuilder<V, OPA, OM, OC> {
        return new ParameterMethodClassDecoratorFactoryBuilder<V, OPA, OM, OC>(
            this.metadataKey, this.parameterHandler, methodHandler, this.classHandler);
    }
    public class<OC = void>(classHandler: ClassHandler<V, OC>): ParameterClassDecoratorFactoryBuilder<V, OPA, OC> {
        return new ParameterClassDecoratorFactoryBuilder<V, OPA, OC>(this.metadataKey, this.parameterHandler, classHandler);
    }

    public property<OP = void>(propertyHandler: PropertyHandler<V, OP>): ParameterPropertyClassDecoratorFactoryBuilder<V, OPA, OP, OC> {
        return new ParameterPropertyClassDecoratorFactoryBuilder<V, OPA, OP, OC>(
            this.metadataKey, this.parameterHandler, propertyHandler, this.classHandler);
    }

}

export {ParameterClassDecoratorFactory, ParameterClassDecoratorFactoryBuilder};
