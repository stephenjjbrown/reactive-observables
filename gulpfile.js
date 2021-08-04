const gulp = require("gulp");

const gulpTypescript = require("gulp-typescript");
//const tsProject = typescript.createProject("tsconfig.json");

const gulpRollup = require("gulp-better-rollup");
const nodeResolve = require("rollup-plugin-node-resolve");


// Common paths
const path = {
    src: "src",
    temp: "temp",
    lib: "lib"
}


// /**
//  * Typescript
//  */
//  gulp.task("typescript", () => {
//     return gulp.src("./src/**/*.{ts,tsx}")
//         .pipe(tsProject())
//         .on('error', log)
//         .pipe(gulp.dest("build"));
// });


// /**
//  * Rollup
//  */
//  gulp.task("rollup", ["typescript"], () => {
//     return gulp.src(["./build/main.js"])
//         .pipe(rollup({
//             plugins: [
//                 nodeResolve(),
//             ]
//         }, {
//             format: "esm" // Specifying the output format on this line instead of the first fixes some resolution problems
//         }))
//         .on('error', log)
//         .pipe(gulp.dest("lib"))
// });
// //gulp.task("rollup:watch", ["rollup"], () => gulp.watch("./src/ts/**/*.{ts,tsx}", ["rollup"]));


// gulp.task("declarations", ["typescript"], () => {
//     return gulp.src(["./build/**/*.d.ts"])
//         .pipe(gulp.dest("lib"));
// })

/**
//  * Default Task
//  */
//  gulp.task("default", ["rollup", "declarations"]);

const tsSrc = path.src + "/**/*.ts";
const tsProject = gulpTypescript.createProject('tsconfig.json');

const ts = () => gulp.src(tsSrc)
    .pipe(tsProject())
    .pipe(gulp.dest(path.temp));
exports.ts = ts;





const rollup = () => gulp.src([path.temp + "/main.js"])
    .pipe(gulpRollup({
		plugins: [
            nodeResolve(),
        ],
    }, {
        format: 'esm'
    }))
    .pipe(gulp.dest(path.lib));
exports.rollup = rollup;




const declarations = () => gulp.src([path.temp + "/**/*.d.ts"])
    .pipe(gulp.dest(path.lib))



/**
 * Build
 */
const build = gulp.series(ts, gulp.parallel(rollup, declarations));
exports.build = build;