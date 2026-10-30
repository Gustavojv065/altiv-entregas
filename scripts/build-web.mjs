import {cp,mkdir,rm} from 'node:fs/promises';
import {build} from 'esbuild';
const target=new URL('../www/',import.meta.url);
await rm(target,{recursive:true,force:true});
await mkdir(target,{recursive:true});
for (const file of ['index.html','service-worker.js','manifest.webmanifest']) await cp(new URL('../'+file,import.meta.url),new URL(file,target));
await cp(new URL('../assets/',import.meta.url),new URL('assets/',target),{recursive:true});
await build({entryPoints:[new URL('../src/native-scanner.js',import.meta.url).pathname],bundle:true,format:'iife',platform:'browser',target:'es2022',outfile:new URL('native-scanner.js',target).pathname,logLevel:'warning'});
console.log('ALTIV Entregas web assets -> www/');
