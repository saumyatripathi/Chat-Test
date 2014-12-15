var gulp = require('gulp');
var less = require('gulp-less');
var clean = require('gulp-clean');
var mincss = require('gulp-minify-css');
var gulpif = require('gulp-if');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var inject = require('gulp-inject');
var templateCache = require('gulp-angular-templatecache');
var angularFilesort = require('gulp-angular-filesort');

var env = 'development';

gulp.task('default', ['clean'], function() {
    gulp.start('static', 'html');
});

gulp.task('production', ['set-production', 'default']);

gulp.task('development', ['default'], function() {
    gulp.watch('./src/less/**/*.less', ['styles']);
    gulp.watch('./src/js/**/*.js', ['scripts']);
    //gulp.watch('./*.html', ['html']);
});

gulp.task('static', function() {
    return gulp.src(['./src/static/*.*'])
        .pipe(gulp.dest('./dist/static'));
});

gulp.task('clean', function() {
    return gulp.src('./dist', {
            read: false
        })
        .pipe(clean());
});

gulp.task('html', ['styles', 'vendor-js', 'templateCache', 'scripts'], function() {
    gulp.src('./*.html')
        .pipe(inject(gulp.src(['./dist/js/**/*.js'])
            .pipe(angularFilesort()), {
                'ignorePath': 'dist/js',
                'addRootSlash': false,
                'addPrefix': 'scripts'
            }))
        .pipe(inject(gulp.src(['./dist/vendors/**/*.js', '!./dist/vendors/less/less.js'], {
            read: false
        }), {
            'name': 'vendors',
            'ignorePath': 'dist/vendors',
            'addRootSlash': false,
            'addPrefix': 'vendors'
        }))
        .pipe(inject(gulp.src(['./dist/css/*.css'], {
            read: false
        }), {
            'ignorePath': 'dist/css',
            'addRootSlash': false,
            'addPrefix': 'styles'
        }))
        .pipe(gulp.dest('dist'));
});

gulp.task('styles', function() {
    return gulp.src('./src/less/*.less')
        .pipe(less())
        .pipe(gulpif(env === 'production', mincss()))
        .pipe(gulpif(env === 'production', concat('styles.css')))
        .pipe(gulp.dest('dist/css'));
});

gulp.task('scripts', function() {
    return gulp.src('./src/js/**/*.js')
        .pipe(gulpif(env === 'production', uglify()))
        .pipe(gulpif(env === 'production', concat('scripts.js')))
        .pipe(gulp.dest('dist/js'));
});

gulp.task('vendor-js', function() {
    return gulp.src(['./vendors/jQuery/jquery-1.11.1.js', 'vendors/angular/angular.js'])
        .pipe(concat('vendors.js'))
        .pipe(gulp.dest('dist/vendors'));
});

gulp.task('templateCache', function() {
    return gulp.src('./src/js/**/*.tpl.html')
        .pipe(templateCache('templatesCache.js', {
            module: 'templatesCache',
            standalone: true,
            root: './templates/'
        }))
        .pipe(gulp.dest('./dist/js'));
});

gulp.task('set-production', function() {
    env = 'production';
});
