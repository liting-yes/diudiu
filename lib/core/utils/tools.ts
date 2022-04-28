import _ from 'lodash-es';

function customizer(objValue: any, srcValue: any) {
    if (_.isObject(objValue)) {
        return srcValue;
    }
}

export const deepMerge = (target, source) => {
    const assgin = Object.assign({}, _._.mergeWith(target, source, customizer));
    return assgin;
}