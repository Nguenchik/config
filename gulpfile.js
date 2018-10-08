///-----------------------------------------------------------
var gulp = require('gulp'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    imagemin = require('gulp-imagemin'),
    // watch = require('gulp-watch'),
    browserSync = require('browser-sync'),
    // cssmin = require('gulp-cssmin'),
    pug = require('gulp-pug'),
    reload      = browserSync.reload;

var concat = require('gulp-concat');
///-----------------------------------------------------------
var paths = {
    html:['app/**/*.html'],
    css:['app/css/**/*.css'],
    pug:['app/pug/**/*.pug'],
    js:['app/js/**/*.js']
};

gulp.task('pug', function () {
    gulp.src('app/pug/**/*.pug')
        .pipe(pug({
            pretty: true
        }))
        .pipe(gulp.dest('app'));
});

gulp.task('sass', function(done) {
    /*var scss = sass({});

    scss.on('error',function(e){
        gutil.log(e);
        scss.end();
    });*/
    gulp.src('app/sass/**/*.scss',  ['sass'])
        .pipe(sass().on('error', function(error) {
            // у нас ошибка
            done(error);
        }))
        .pipe(autoprefixer(['last 15 versions','>1%','ie 8','ie 7'],{cascade: true}))
        /*.pipe(concat('main.css'))
        .pipe(cssmin())*/
        // .pipe(sass())
        .pipe(gulp.dest('app/css'))
        .on('end', function() {
            // у нас все закончилось успешно
            done();
        });
});

gulp.task('watch', function(){
    gulp.watch('app/sass/**/*.scss', ['sass']);


});

gulp.task('imagemin', function () {
    gulp.src('app/img/**/*.{png,jpg,svg}')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/img'))
});

gulp.task('html', function(){
    gulp.src(paths.html)
        .pipe(reload({stream:true}));
});
gulp.task('js',  function() {
    gulp.src(paths.js)
        .pipe(reload({stream:true}));
});
gulp.task('css', function(){
    gulp.src(paths.css)
        .pipe(reload({stream:true}));
});


gulp.task('browserSync', function() {
    browserSync({
        server: {
            baseDir: "app"
        },
        port: 7777,
        open: true,
        notify: false
    });
});


gulp.task('watcher',function(){
    gulp.watch(paths.css, ['css']);
    gulp.watch(paths.html, ['html']);
    gulp.watch(paths.pug, ['pug']);
    gulp.watch(paths.js,['js']);
});

gulp.task('default', ['watcher','watch','pug', 'browserSync' ]);