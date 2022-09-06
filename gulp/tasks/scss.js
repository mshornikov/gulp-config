import dartSass from 'sass';
import gulpSass from 'gulp-sass';
import rename from 'gulp-rename';

import cleanCss from 'gulp-clean-css'; // Compress CSS file
import webpCss from 'gulp-webpcss'; // Output WEBP images
import autoprefixer from 'gulp-autoprefixer'; // Add prefixes
import groupCssMediaQueries from 'gulp-group-css-media-queries'; // Group media queries

const sass = gulpSass(dartSass);

export const scss = () => {
    return app.gulp.src(app.path.src.scss, { sourcemaps: app.isDev })
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
        .pipe(
            app.plugins.if(
                app.isBuild,
                groupCssMediaQueries()
            )
        )
        .pipe(
            app.plugins.if(
                app.isBuild,
                autoprefixer({
                    grid: true,
                    overrideBrowserslist: ['last 12 versions'],
                    cascade: true
                })
            )
        )
        .pipe(
            app.plugins.if(
                app.isBuild,
                webpCss({
                    webpCss: '.webp',
                    noWebpClass: '.no-webp'
                })
            )
        )
        // Uncomment if you need to look at uncompressed styles file
        .pipe(app.gulp.dest(app.path.build.css))
        .pipe(
            app.plugins.if(
                app.isBuild,
                cleanCss()
            )
        )
        .pipe(rename({
            extname: '.min.css'
        }))
        .pipe(app.gulp.dest(app.path.build.css))
        .pipe(app.plugins.browserSync.stream());
}