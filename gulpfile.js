// Main module
import gulp from 'gulp';
// Import modules
import { path } from './gulp/config/path.js';
// Import general plugins
import { plugins } from './gulp/config/plugins.js';

// Global variable
global.app = {
    isBuild: process.argv.includes('--build'),
    isDev: !process.argv.includes('--build'),
    path: path,
    gulp: gulp,
    plugins: plugins
}

// Import tasks
import { copy } from './gulp/tasks/copy.js';
import { reset } from './gulp/tasks/reset.js';
import { html } from './gulp/tasks/html.js';
import { server } from './gulp/tasks/server.js';
import { scss } from './gulp/tasks/scss.js';
import { js } from './gulp/tasks/js.js';
import { images } from './gulp/tasks/images.js';
import { otfToTtf, ttfToWoff, fontsStyle } from './gulp/tasks/fonts.js';
import { svgSprite } from './gulp/tasks/svgSprite.js';
import { zip } from './gulp/tasks/zip.js';
import { ftp } from './gulp/tasks/ftp.js';

// Watcher
function watcher() {
    gulp.watch(path.watch.files, copy); // for live update on ftp: gulp.series(copy, ftp)
    gulp.watch(path.watch.html, html); // for live update on ftp: gulp.series(html, ftp)
    gulp.watch(path.watch.scss, scss); // for live update on ftp: gulp.series(scss, ftp)
    gulp.watch(path.watch.js, js); // for live update on ftp: gulp.series(js, ftp)
    gulp.watch(path.watch.images, images); // for live update on ftp: gulp.series(images, ftp)
}

export { svgSprite };

// Fonts processing
const fonts = gulp.series(otfToTtf, ttfToWoff, fontsStyle);

// Main tasks
const mainTasks = gulp.series(fonts, gulp.parallel(copy, html, scss, js, images));

// Tasks
const dev = gulp.series(reset, mainTasks, gulp.parallel(watcher, server));
const build = gulp.series(reset, mainTasks); 
const deployZIP = gulp.series(reset, mainTasks, zip);
const deployFTP = gulp.series(reset, mainTasks, ftp);

// Export scripts
export { dev }
export { build }
export { deployZIP }
export { deployFTP }

// Default task
gulp.task('default', dev);