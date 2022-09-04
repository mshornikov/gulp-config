// Main module
import gulp from "gulp";
// Import modules
import { path } from "./gulp/config/path.js";
// Import general plugins
import { plugins } from "./gulp/config/plugins.js";

// Global variable
global.app = {
    path: path,
    gulp: gulp,
    plugins: plugins
}

// Import tasks
import { copy } from "./gulp/tasks/copy.js";
import { reset } from "./gulp/tasks/reset.js";
import { html } from "./gulp/tasks/html.js";
import { server } from "./gulp/tasks/server.js";
import { scss } from "./gulp/tasks/scss.js";
import { js } from "./gulp/tasks/js.js";
import { images } from "./gulp/tasks/images.js";

// Watcher
function watcher() {
    gulp.watch(path.watch.files, copy);
    gulp.watch(path.watch.html, html);
    gulp.watch(path.watch.scss, scss);
    gulp.watch(path.watch.js, js);
    gulp.watch(path.watch.images, images);
}

const mainTasks = gulp.parallel(copy, html, scss, js, images);

// Tasks
const dev = gulp.series(reset, mainTasks, gulp.parallel(watcher, server));

// Default task
gulp.task('default', dev);