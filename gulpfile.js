'use strict';

const gulp = require('gulp');
const rigger = require('gulp-rigger');
const gulpIf = require('gulp-if');	
const del = require('del');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const cssnano = require('gulp-cssnano');
const uglify = require('gulp-uglify');
const notify = require('gulp-notify');
const imagemin = require('gulp-imagemin');
const rename = require('gulp-rename');
const browserSync = require('browser-sync').create();
const cached = require('gulp-cached');
const path = require('path');
const combiner = require('stream-combiner2');
const usemin = require('gulp-usemin');

const isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV == 'development';

gulp.task('clean', function(){
	return del('public');
});

gulp.task('html', function(){
	return gulp.src('src/index.html')
		.pipe(usemin({
			css: [cssnano()],
			js: [uglify()]
		}))
		.pipe(rigger())
		.pipe(gulp.dest('public'));
});

gulp.task('styles', function(){
	return gulp.src('src/style/main.scss')
		.pipe(gulpIf(isDevelopment, sourcemaps.init()))
		.pipe(sass())
		.on('error', notify.onError())
		.pipe(autoprefixer({
			browsers: ['last 2 versions','> 1%','ie 9'],
			cascade: false
		}))
		.pipe(cssnano())
		.pipe(gulpIf(isDevelopment, sourcemaps.write()))
		.pipe(rename({suffix: '.min'}))
		.pipe(gulp.dest('public'));
});

gulp.task('js', function(){
	return gulp.src('src/**/main.js')
		.pipe(rigger())
		.pipe(gulpIf(isDevelopment, sourcemaps.init()))
		.pipe(uglify())
		.pipe(gulpIf(isDevelopment, sourcemaps.write()))
		.pipe(rename({suffix: '.min'}))
		.pipe(gulp.dest('public'));	
});

gulp.task('images', function(){
	return gulp.src('src/**/*.{jpg,png,svg,gif}')
		.pipe(cached('images'))
		.pipe(imagemin({
			progressive: true,
			interlaced: true
		}))
		.pipe(gulp.dest('public/'));
});

gulp.task('fonts', function(){
	return gulp.src('src/fonts/**/*.*')
		.pipe(cached('fonts'))
		.pipe(gulp.dest('public/fonts'));
});

gulp.task('watch', function(){
	gulp.watch('src/index.html', gulp.series('html'));
	gulp.watch('src/style/**/*.*', gulp.series('styles'));
	gulp.watch('src/js/**/*.*', gulp.series('js'));
	gulp.watch('src/img/**/*.*', gulp.series('images'));
	gulp.watch('src/fonts/**/*.*', gulp.series('fonts'));
});

gulp.task('server',function(){
	browserSync.init({
		server: 'public'
	});
	browserSync.watch('public/**/*.*').on('change', browserSync.reload);
})

gulp.task('build', gulp.series('clean',	gulp.parallel('html', 'styles', 'js', 'images', 'fonts')));

gulp.task('dev', gulp.series('build', gulp.parallel('watch', 'server')));
