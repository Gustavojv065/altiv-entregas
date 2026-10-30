import {cp,mkdir,rm} from 'node:fs/promises';
const target=new URL('../www/',import.meta.url);
await rm(target,{recursive:true,force:true});
await mkdir(target,{recursive:true});
for (const file of ['index.html','service-worker.js','manifest.webmanifest']) await cp(new URL('../'+file,import.meta.url),new URL(file,target));
await cp(new URL('../assets/',import.meta.url),new URL('assets/',target),{recursive:true});
console.log('ALTIV Entregas web assets -> www/');
