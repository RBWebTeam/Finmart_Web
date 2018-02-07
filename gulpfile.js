/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var gulp = require('gulp');

gulp.task('default', function () {

    gulp.src([
            'public/css/**/*.css'
        ])
        .pipe(sassPlugin())
        .pipe(gulp.dest('public/css'));

    gulp.src([
            'public/modules/**/*.css'
        ])
        .pipe(sassPlugin())
        .pipe(rename(function(path) {
            path.dirname = path.dirname.replace('sass', 'styles');
        }))
        .pipe(gulp.dest('public/modules/'));
});
