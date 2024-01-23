const { generateTemplateFilesCommandLine } = require('generate-template-files');
const path = require( 'path' );

generateTemplateFilesCommandLine([
  {
    option: 'Module',
    defaultCase: '(pascalCase)',
    entry: {
      folderPath: path.join(__dirname, 'templates'),
    },
    stringReplacers: ['__module__'],
    output: {
      path: `./src/modules/__module__(kebabCase)`,
      pathAndFileNameDefaultCase: '(kebabCase)',
      overwrite: true
    },
  },
]).catch((e) => {
  console.log('Build Error', e);
});