import fileInclude from "gulp-file-include";
import webHtmlNosvg from "gulp-webp-html-nosvg";
import versionNumber from "gulp-version-number";
import pug from "gulp-pug";

export const html = () => {
    return app.gulp.src(app.path.src.html)
        .pipe(app.plugins.plumber(
            app.plugins.notify.onError({
                title: "HTML",
                message: "Error: <%= error.message %>"
            }))
        )
        // .pipe(fileInclude())
        .pipe(pug({
            // HTML file compression
            pretty: true,
            // Show in terminal which file is processed
            verbose: true
        }))
        .pipe(app.plugins.replace(/@img\//g, 'img/'))
        .pipe(webHtmlNosvg())
        // .pipe(
        //     versionNumber({
        //         'value': '%Dt%',
        //         'append': {
        //             'key': '_v',
        //             'cover': 0,
        //             'to': [
        //                 'css',
        //                 'js',
        //             ]
        //         },
        //         'output': {
        //             'file': 'gulp/version.json'
        //         }
        //     })
        // )
        .pipe(app.gulp.dest(app.path.build.html))
        .pipe(app.plugins.browserSync.stream())
} 