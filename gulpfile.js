const gulp = require("gulp");

const typescript = require("gulp-typescript");
const tsProject = typescript.createProject("tsconfig.json");

const rollup = require("gulp-better-rollup");
const nodeResolve = require("rollup-plugin-node-resolve");

const { log } = require("gulp-util");


/**
 * Typescript
 */
gulp.task("typescript", () => {
    return gulp.src("./src/**/*.{ts,tsx}")
        .pipe(tsProject())
        .on('error', log)
        .pipe(gulp.dest("build"));
});


/**
 * Rollup
 */
gulp.task("rollup", ["typescript"], () => {
    return gulp.src(["./build/main.js"])
        .pipe(rollup({
            plugins: [
                nodeResolve(),
            ]
        }, {
            format: "cjs" // Specifying the output format on this line instead of the first fixes some resolution problems
        }))
        .on('error', log)
        .pipe(gulp.dest("lib"))
});
//gulp.task("rollup:watch", ["rollup"], () => gulp.watch("./src/ts/**/*.{ts,tsx}", ["rollup"]));



gulp.task("declarations", ["typescript"], () => {
    return gulp.src(["./build/**/*.d.ts"])
        .pipe(gulp.dest("lib"));
})


/**
 * Default Task
 */
gulp.task("default", ["rollup", "declarations"]);