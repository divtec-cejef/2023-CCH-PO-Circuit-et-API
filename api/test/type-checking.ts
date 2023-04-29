export const compareStructures = (a: any, struct: any, path?: string): void => {
	for (const key in a) {
		if (struct[key] === undefined) {
			throw Error(`Key ${path ? `${path}.${key}` : key} is not in the interface`);
		}
		if (typeof a[key] === 'object') {
			return compareStructures(a[key], struct[key], path ? `${path}.${key}` : key);
		}
		const nativeTypes = ['string', 'number', 'boolean', 'undefined', 'function'];
		if (nativeTypes.includes(struct[key].name.toLowerCase())) {
			if (typeof a[key] !== struct[key].name.toLowerCase()) {
				throw Error(`Key ${path ? `${path}.${key}` : key} is not of type ${struct[key].name.toLowerCase()}`);
			}
		}
	}
	return;
};

export default function chaiStructure(chai: any, utils: any) {
	var Assertion = chai.Assertion;

	utils.addMethod(Assertion.prototype, 'structure', function (this: any, interfaceMap: any) {
		// map is an object map with property names as keys and strings for
		// typeof checks or a nested interfaceMap
		compareStructures(this._obj, interfaceMap);
	});

}

declare global {
	namespace Chai {
		interface Assertion {
			structure: (interfaceMap: any) => Assertion;
		}
	}
}
