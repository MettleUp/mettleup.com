/* File: gulpfile.js */

// grab our packages
var autoprefixer = require('gulp-autoprefixer'),
	concat = require('gulp-concat'),
	connect = require('gulp-connect'),
	gulp   = require('gulp'),
	imagemin = require('gulp-imagemin'),
    mainBowerFiles = require('main-bower-files'),
    minifyCss = require('gulp-cssnano'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    uglify = require('gulp-uglify');

// concatenate all application javascript into 'public'
gulp.task('scripts', function() {
	var files = [
		'src/*.js',
		'src/**/*.js'
	];
	return gulp.src(files)
		.pipe(concat('app.js'))
		.pipe(uglify())
		.pipe(gulp.dest('dist/js'))
		.pipe(connect.reload());
});

// move images to 'dist'
gulp.task('images', function() {
	files = [
		'src/images/*.png',
		'src/images/*.jpg',
		'src/images/favicon.ico'
	]
	gulp.src(files)
		.pipe(imagemin({ progressive: true }))
		.pipe(gulp.dest('dist/images'));

	return gulp.src('src/images/*.svg')
		.pipe(gulp.dest('dist/images'))
		.pipe(connect.reload());
});

// concatenate and minify .scss files
gulp.task('styles', function() {
	return gulp.src('src/styles/*.scss')
    	.pipe(sourcemaps.init())
		.pipe(sass({onError: function(e) { console.log(e); } }))
		.pipe(autoprefixer("last 2 versions", "> 1%", "ie 8"))
		.pipe(concat('styles.css'))
		.pipe(minifyCss())
    	.pipe(sourcemaps.write('./'))
		.pipe(gulp.dest('dist/css'))
		.pipe(connect.reload());
});

// concatenate all vendor files into 'dist'
gulp.task('vendor', function() {
	gulp.src(mainBowerFiles())
		.pipe(concat('vendor.js'))
		.pipe(gulp.dest('dist/js'));

	var vendors = [
		'bower_components/animate.css/animate.min.css',
		'bower_components/bootstrap/dist/css/bootstrap.min.css',
		'bower_components/font-awesome/css/font-awesome.min.css',
		'bower_components/owl.carousel/dist/assets/owl.carousel.min.css',
		'bower_components/owl.carousel/dist/assets/owl.theme.default.min.css'
	];

	gulp.src(vendors)
		.pipe(concat('vendor.css'))
		.pipe(gulp.dest('dist/css'));

	return gulp.src('bower_components/font-awesome/fonts/*')
		.pipe(gulp.dest('dist/fonts'))
		.pipe(connect.reload());
});

// add all html into 'dist'
gulp.task('views', function() {
	return gulp.src('src/index.html')
		.pipe(gulp.dest('dist'))
		.pipe(connect.reload());
});

gulp.task('serve', function() {
	return connect.server({
		livereload: true,
		root: 'dist'
	});
});

// watch for file changes
gulp.task('watch', function() {
	// recommend not watching images, minification is sluggish
	gulp.watch(['src/*.js', 'src/**/*.js'], ['scripts']);
	gulp.watch(['src/index.html', 'src/**/*.html'], ['views']);
	gulp.watch(['src/styles/**/*.scss', 'src/styles/*.scss'], ['styles']);
});