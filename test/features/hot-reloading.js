import test from 'ava';
import fs from 'fs-extra';
import path from 'path';
import mix from '../../src/index';
import File from '../../src/File';

test('it creates a file to mark a request for hot reloading', t => {
    mix.setPublicPath(__dirname).options({ hmr: true });

    let hotFilePath = path.join(__dirname, 'hot');

    t.false(File.exists(hotFilePath));

    // Mix should listen for the "init" event before checking
    // if the user desires hot reloading.
    Mix.dispatch('init');

    t.true(File.exists(hotFilePath));

    // Clean up
    fs.remove(hotFilePath);
});
