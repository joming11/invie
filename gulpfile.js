var gulp = require('gulp')
var postcss = require('gulp-postcss')
var cssnext = require('postcss-cssnext')
var rucksack = require('rucksack-css')
//var autoprefixer = require('autoprefixer')
var cssnested = require('postcss-nested')
var mixins = require('postcss-mixins')
var lost = require('lost')
var atImport = require('postcss-import')
var csswring = require('csswring')
var mqpacker = require('css-mqpacker')
var browserSync = require('browser-sync').create()//variables de referencia

//Servidor de desarrollo-tareas de gulp
//serve:nombre de la tarea
//luego una funcion de callback equivalente al tipo de plugin-en este caso browser-sync
//se le agrega un objeto de configuracion,en este caso el objeto server
//baseDir: ruta para servir los ficheros
gulp.task('serve', function(){
	browserSync.init({
		server: {
			baseDir: './dist'
		}
	})
})

//post-procesado de css
//en la funcion callback definimos los ficheros de entrada con la ruta determinada
//definimos que traiga todos los elementos con extension css
//pipe utiliza el plugin de lectura de fichero de postcss
//se incluye autoprefixer en el array processors ya que es un plugin de postcss
//se utiliza el objeto browser dentro de autoprefixer para definir cuales navegadores utilizar y a cual dar soporte
gulp.task('css', function(){

	var processors = [
	atImport(),
	mixins(),
	cssnested,
	lost(),
	rucksack(),
	cssnext({ browsers: ['>5%', 'ie 8'] }),
	mqpacker,
	csswring()
	]

	return gulp.src('./src/invie.css')//cambiar a invie.css
	.pipe(postcss(processors))
	.pipe(gulp.dest('./dist/css'))
	.pipe(browserSync.stream())
})

//tarea para vigilar los cambios
//queremos que la funcion callback vigile la carpeta src,los ficheros css y la tarea css
gulp.task('watch', function(){
	gulp.watch('./src/*.css',['css'])// /**/*.css
	gulp.watch('./dist/*.html').on('change', browserSync.reload)
})

//unificacion de tareas
gulp.task('default', ['watch', 'serve'])