const { task, dest, series, src } = require('gulp')
const clean = require('gulp-clean')
const typescript = require('gulp-typescript')
const fs = require('fs')

const project = typescript.createProject('tsconfig.json')

task('build', () => {
  return project.src()
    .pipe(project())
    .js.pipe(dest('./build/'))
})

task('clean', async () => {
  fs.exists('./build/', (exists) => {
    if (exists) {
      return src('./build/', { read: false, allowEmpty: true })
        .pipe(clean())
    } else {
      console.log(`There's nothing to clean up`)
    }
  })
})

task('default', series(['build']))
