import { save } from '@connectv/sdh';
import { concurrently } from 'rxline';
import { files, pathMatch, readFile, mapExt, mapRoot } from 'rxline/fs';

import { buildContentPage } from './content-page';
import '../src/setup-jss';


files('.', { root: 'samples/md' })    // --> get all the files
  .pick(pathMatch(/\.md$/))           // --> pick markdown files
  .drop(pathMatch(/(^_)|(\/_)/))      // --> drop those in a folder starting with _ or whose name starts with _
  .pipe(
    readFile(),                       // --> read their contents
    buildContentPage(),               // --> build content pages from their contents
    mapExt(() => '.html'),            // --> change extension to `.html`
    mapRoot(() => 'dist'),            // --> change the root
    save(),                           // --> save them
  )
  .process(concurrently);
