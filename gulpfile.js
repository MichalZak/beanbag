var gulp = require('gulp'),
    nodemon = require('gulp-nodemon'),
    livereload = require('gulp-livereload'),
    sourcemaps = require('gulp-sourcemaps'),
    gulpPlumber = require('gulp-plumber'),
    merge = require('merge2'),
    ts = require('gulp-typescript');

var tsProject = ts.createProject('tsconfig.json');

gulp.task('typescript', function() {
   console.log('Compiling TypeScript');

    var tsResult = gulp.src(['src/**/*.ts']) 
        .pipe(gulpPlumber())
        .pipe(sourcemaps.init())
        .pipe(tsProject());

    // merge dts & js output streams...
    return merge([
        // type definitions
         tsResult.dts
            .pipe(gulp.dest("./src/")),
          // javascript
        tsResult.js
            //.pipe(sourcemaps.write(writeOptions))
            .pipe(gulp.dest('./src/'))
        ]);


});

gulp.task('serve', ['typescript'], function () {

    gulp.watch('./**/*.ts', ['typescript']);

    livereload.listen();

    nodemon({
        script: './relax',
        ext: 'js',
    }).on('restart', function () {
        setTimeout(function () {
            console.log("reload!");
            livereload.reload();
        }, 500);
    });

});

//gulp.task('default', gulp.series(['typescript', 'serve']), function() {});