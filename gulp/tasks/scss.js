import dartSass from 'sass';
import gulpSass from 'gulp-sass';
import rename from 'gulp-rename';

import cleanCss from 'gulp-clean-css'; // Compress CSS file
import webpCss from 'gulp-webpcss'; // Output WEBP images
import autoprefixer from 'gulp-autoprefixer'; // Add prefixes
import groupCssMediaQueries from 'gulp-group-css-media-queries'; // Group media queries

const sass = gulpSass(dartSass);

export const scss = () => {
    return app.gulp.src(app.path.src.scss, { sourcemaps: true })
        .pipe(app.plugins.plumber(
            app.plugins.notify.onError({
                title: 'SCSS',
                message: 'Error: <%= error.message %>'
            }))
        )
        .pipe(app.plugins.replace(/@img\//g, '../img/'))
        .pipe(sass({
            outputStyle: 'expanded'
        }))
        .pipe(groupCssMediaQueries())
        .pipe(webpCss({
            webpCss: '.webp',
            noWebpClass: '.no-webp'
        }))
        .pipe(autoprefixer({
            grid: true,
            overrideBrowserslist: ['last 12 versions'],
            cascade: true
        }))
        // Uncomment if you need to look at uncompressed styles file
        .pipe(app.gulp.dest(app.path.build.css))
        .pipe(cleanCss())
        .pipe(rename({
            extname: '.min.css'
        }))
        .pipe(app.gulp.dest(app.path.build.css))
        .pipe(app.plugins.browserSync.stream());
}