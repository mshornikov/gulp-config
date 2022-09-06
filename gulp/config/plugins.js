import replace from 'gulp-replace'; // Search and replace
import plumber from 'gulp-plumber'; // Handling errors
import notify from 'gulp-notify'; // Messages (tips)
import browserSync from 'browser-sync'; // Local server
import newer from 'gulp-newer'; // Check for update
import ifPlugin from 'gulp-if'; // Conditional branching

// Exporting object
export const plugins = {
    replace: replace,
    plumber: plumber,
    notify: notify,
    browserSync: browserSync,
    newer: newer,
    if: ifPlugin
}