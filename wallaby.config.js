/* globals module */
module.exports = function (wallaby) {
	return {
		files: [
			'src/**/*.ts'
		],
	
		tests: [
			'spec/**/*spec.js',
			'spec/**/*spec.ts'
		],
		
		compilers: {
			'src/**/*.ts': wallaby.compilers.typeScript({
				noResolve: false,
				module: "commonjs",
				experimentalDecorators: true
			})
		},

		env: {type: 'node'}
	};
};