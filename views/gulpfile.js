
var gulp = require('gulp'),
    imagemin = require('gulp-imagemin'),
    print = require('gulp-print')
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    browserSync = require('browser-sync');

gulp.task('js', function(){
  gulp.src('assets/javascripts/**/*.js')
    .pipe(concat('all.js'))
    .pipe(uglify())
    .pipe(gulp.dest('public/'))
})

gulp.task('image', function(){
  gulp.src('assets/images/**/*')
    .pipe(imagemin({
        progressive: true
    }))
    .pipe(gulp.dest('assets/images/'))

})

gulp.task('default',['js', 'image'], function(){
  gulp.watch('assets/javascripts/**/*.js', ['js'])
})
