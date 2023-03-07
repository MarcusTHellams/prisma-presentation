require('esbuild').buildSync({
  entryPoints: ['build1/src/index.js'],
  bundle: true,
  platform: 'node',
  target: ['node16'],
  outdir: 'build',
  sourcemap: true,
  format: 'cjs',
  minify: true,
  treeShaking: true,
});
