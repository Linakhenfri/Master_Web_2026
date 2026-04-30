// build-css.cjs
const fs = require('fs');
const path = require('path');
const postcss = require('postcss');
const tailwindcss = require('@tailwindcss/postcss');

const inputPath = path.join(__dirname, 'src', 'input.css');
const outputPath = path.join(__dirname, 'dist', 'output.css');

if (!fs.existsSync(path.join(__dirname, 'dist'))) {
  fs.mkdirSync(path.join(__dirname, 'dist'));
}

const css = fs.readFileSync(inputPath, 'utf8');

postcss([tailwindcss])
  .process(css, { from: inputPath, to: outputPath })
  .then(result => {
    fs.writeFileSync(outputPath, result.css);
    console.log('✅ Tailwind CSS تم بنجاح!');
  });