import fs, { appendFile } from 'fs';
import fonter from 'gulp-fonter';
import ttf2woff2 from 'gulp-ttf2woff2';

export const otfToTtf = () => {
    // Search for font files .otf
    return app.gulp.src(`${app.path.srcFolder}/fonts/*.otf`, {})
        .pipe(app.plugins.plumber(
            app.plugins.notify.onError({
                title: "FONTS",
                message: "Error: <%= error.message %>"
            }))
        )
        // Convert to .ttf
        .pipe(fonter({
            formats:['ttf']
        }))
        // Output to src folder
        .pipe(app.gulp.dest(`${app.path.srcFolder}/fonts/`)) 
}

export const ttfToWoff = () => {
    // Search for font files .ttf
    return app.gulp.src(`${app.path.srcFolder}/fonts/*.ttf`, {})
        .pipe(app.plugins.plumber(
            app.plugins.notify.onError({
                title: "FONTS",
                message: "Error: <%= error.message %>"
            }))
        )
        // Convert to .woff
        .pipe(fonter({
            formats:['woff']
        }))
        // Output to build folder
        .pipe(app.gulp.dest(`${app.path.build.fonts}`))
        // Search for font files .ttf
        .pipe(app.gulp.src(`${app.path.srcFolder}/fonts/*.ttf`))
        // Convert to .woff2
        .pipe(ttf2woff2())
        // Output to src folder
        .pipe(app.gulp.dest(`${app.path.srcFolder}/fonts/`)) 
}

export const fontsStyle = () => {
    // Style file for fonts
    let fontsFile = `${app.path.srcFolder}/scss/fonts.scss`;
    // Check if fonts files exist
    fs.readdir(app.path.build.fonts, function(err, fontsFiles){
        if (fontsFiles) { 
            // Check if style file for fonts exists
            if (!fs.existsSync(fontsFile)) {
                // If not, create if
                fs.writeFile(fontsFile, '', cb);
                let newFileOnly;
                for (var i = 0; i < fontsFiles.length; i++) {
                    // Write connection font files in style files
                    let fontFileName = fontsFiles[i].split('.')[0];
                    if (newFileOnly !== fontFileName) {
                        let fontName = fontFileName.split('-')[0] ? fontFileName.split('-')[0] : fontFileName;
                        let fontWeight = fontFileName.split('-')[1] ? fontFileName.split('-')[1] : fontFileName;
                        if (fontWeight.toLowerCase() === 'thin') {
                            fontWeight = 100;
                        } else if (fontWeight.toLowerCase() === 'extralight') {
                            fontWeight = 200;
                        }
                    }
                }
            }
        }
    })
}