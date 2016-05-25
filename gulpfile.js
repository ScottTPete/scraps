const gulp = require('gulp')
	, jshint = require('gulp-jshint')
	, concat = require('gulp-concat')
	, uglify = require('gulp-uglify')
	, cleanCSS = require('gulp-clean-css')
	, postcss = require('gulp-postcss')
	, autoprefixer = require('autoprefixer')
	, order = require("gulp-order")
	, rename = require('gulp-rename')
	, processors = [autoprefixer()];

gulp.task('css', function () {
	return gulp.src('./public/**/*.css')
		.pipe(order([
		'**/normalize.css', '**/.css'
	]))
		.pipe(cleanCSS())
		.pipe(postcss(processors))
		.pipe(concat('css.min.css'))
		.pipe(gulp.dest('./dist/css'))
});



gulp.task('js', function () {
	return gulp.src('./public/**/*.js')
		.pipe(order([
		 "**/app.js", "**/*.js"
	]))
		.pipe(jshint())
		.pipe(jshint.reporter('jshint-stylish'))
		.pipe(concat('js.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest('./dist/js'))

});

// configure which files to watch and what tasks to use on file changes
gulp.task('watch', function () {
	gulp.watch('./src/**/*.css', ['css']);
	gulp.watch('public/**/*.js', ['js']);

});



gulp.task('default', ['watch', 'js', 'css']);
