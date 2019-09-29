const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');

// compile sass

gulp.task('sass', () => {
  return gulp.src(['src/scss/*.scss'])
    .pipe(sass())
    .pipe(gulp.dest('src/css'))
    .pipe(browserSync.stream());
});


//watch and serve
gulp.task('serve',['sass'], ()=>{
  browserSync.init({
    server: './src'
  });

  gulp.watch(['src/scss/*.scss'], ['sass']);
  gulp.watch(['src/*.html'].concat('change', browserSync.reload))
  gulp.watch(['src/js/*.js'].concat('change', browserSync.reload))
});

// default task
gulp.task('default', ['serve']);