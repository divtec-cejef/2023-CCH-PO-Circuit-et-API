import { checkStructuresOrThrow } from "check-structure";

export default function chaiStructure(chai: any, utils: any) {
	var Assertion = chai.Assertion;

	utils.addMethod(Assertion.prototype, 'structure', function (this: any, interfaceMap: any) {
		// map is an object map with property names as keys and strings for
		// typeof checks or a nested interfaceMap
		checkStructuresOrThrow(this._obj, interfaceMap);
	});

}

declare global {
	namespace Chai {
		interface Assertion {
			structure: (interfaceMap: any) => Assertion;
		}
	}
}
