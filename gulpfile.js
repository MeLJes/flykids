const gulp = require('gulp');
const watch = require('gulp-watch');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const rename = require('gulp-rename');
const sourcemaps = require('gulp-sourcemaps');
const del = require('del');
const { resolve } = require('path');

// Path, related to the root,
// where both .css and .scss style files will be stored
const ROOT = './';

const isProduction = process.env.NODE_ENV === 'production';

gulp.task('sass', function () {
  if (!isProduction) {
    return gulp.src(resolve(ROOT, 'scss/main.scss'))
      .pipe(sourcemaps.init())
      .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
      .pipe(rename('style.css'))
      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest(resolve(ROOT, 'css')));
  }

  return gulp.src(resolve(ROOT, 'scss/main.scss'))
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['last 5 versions']
    }))
    .pipe(rename('style.css'))
    .pipe(gulp.dest(resolve(ROOT, 'css')));
});

gulp.task('sass:watch', function () {
  watch(resolve(ROOT, 'scss/**/*.scss'), function () {
    gulp.start('sass');
  });
});

gulp.task('build', function () {
  if (isProduction) {
    del('**/style.css.map').then(function () {
      gulp.start('sass');
    });
  }
});

gulp.task('default', ['sass:watch']);
