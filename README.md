# SpriteText.

A [sprite](https://threejs.org/docs/index.html#api/en/objects/Sprite) based text component. SpriteText is a text that always faces towards the camera.

I use SpriteText in my [three.js](https://threejs.org/) projects for displaying of the text in the canvas.
[Example](https://raw.githack.com/anhr/SpriteText/master/).

Uses in my projects:
 * [AxesHelper](https://github.com/anhr/AxesHelper)
 * [myThreejs](https://github.com/anhr/myThreejs)

## Quick start
The easiest way to use SpriteText in your code is import SpriteText and SpriteTextGui from SpriteText.js file in your JavaScript module. [Example](https://raw.githack.com/anhr/SpriteText/master/)
```
import { SpriteText, SpriteTextGui } from './SpriteText.js';
```

Now you can use SpriteText and SpriteTextGui in your javascript code.

### new SpriteText( text, position, options )

Creates a new sprite based text component.

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| text | <code>string or number</code> |  | The text to be displayed on the sprite. You can include a multiline text separated by "\r\n".|
| position | <code>THREE.Vector3</code> | new THREE.Vector3( 0, 0, 0 ) | Position of the text.|
| [options] | <code>object</code> | undefinef | followed options is available: |
| [options.textHeight] | <code>number</code> | 0.1 | The height of the text.|
| [options.sizeAttenuation] | <code>boolean</code> | false | Whether the size of the sprite is attenuated by the camera depth. (Perspective camera only). See [sizeAttenuation](https://threejs.org/docs/index.html#api/en/materials/SpriteMaterial.sizeAttenuation) for details.|
| [options.rotation] | <code>number</code> | 0 | The rotation of the sprite in radians. See [rotation](https://threejs.org/docs/index.html#api/en/materials/SpriteMaterial.rotation) for details.|
| [options.fontFace] | <code>string</code> | 'Arial' | CSS font-family - specifies the font of the text|
| [options.fontFaces] | <code>string[]</code> |  | array of fontFaces. Example ['Arial', 'Verdana', 'Times'].|
| [options.fontColor] | <code>string</code> | 'rgba(255, 255, 255, 1)' white color | RGBA object or RGB object or HEX value. Examples 'rgba(0, 0, 255, 0.5)', '#00FF00'.|
| [options.bold] | <code>boolean</code> | false | CSS font-weight. Equivalent of 700.|
| [options.italic] | <code>boolean</code> | false | CSS font-style.|
| [options.fontProperties] | <code>string</code> | "" | Other font properties. The font property uses the same syntax as the CSS font property. Examples: "900", "oblique lighter".|
| [options.center] | <code>THREE.Vector2</code> | new THREE.Vector2(0, 1) | <p>The text's anchor point. See [center](https://threejs.org/docs/index.html#api/en/objects/Sprite.center) for details.</p><p>A value of (0.5, 0.5) corresponds to the midpoint of the text.</p><p>A value of (0, 0) corresponds to the left lower corner of the text.</p><p>A value of (0, 1) corresponds to the left upper corner of the text.</p>|
| [options.rect] | <code>object</code> |  | rectangle around the text.|
| [options.rect.displayRect] | <code>boolean</code> | false | true - the rectangle around the text is visible.|
| [options.rect.backgroundColor] | <code>string</code> | 'rgba(0, 0, 0, 0)' - black transparent. | <p>background color. RGBA object or RGB object or HEX value.</p><p>Examples: 'rgba(0, 0, 255, 0.5)', '#00FF00'.</p><p>|
| [options.rect.borderColor] | <code>string</code> | Same as options.fontColor 'rgba(255, 255, 255, 1)' - white. | border color. RGBA object or RGB object or HEX value.|
| [options.rect.borderThickness] | <code>number</code> | 0 invisible border | border thickness.|
| [options.rect.borderRadius] | <code>number</code> | 0 no radius | border corners radius.|

You can set options for all SpriteText from the group or scene and all child groups.
Options of the child groups is more priority before parent group options.
Example:
```
//options of the parent group or scene
scene.userData.optionsSpriteText = {

	fontColor: 'rgb(0, 255, 0)'//green color

}
var group = new THREE.Group();

//options of the child group
group.userData.optionsSpriteText = {

	fontColor: 'rgba(255, 255, 225, 0.5)'//white semi opacity color

}
scene.add( group );

scene.add( new SpriteText( 'Scene' ) );//green color of the font
group.add( new SpriteText( 'Group' ) );//white semi opacity color of the font
```


### SpriteTextGui( gui, group, guiParams )

Adds SpriteText settings folder into [gui](https://github.com/anhr/dat.gui).

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| gui | <code>GUI</code> |  | see [dat.GUI](https://github.com/anhr/dat.gui) for details.|
| group | <code>THREE.Group or THREE.Scene</code> |  | group or scene of SpriteText and of all child groups of SpriteText for which these settings will have an effect.|
| guiParams | <code>object</code> | {} | Followed parameters is allowed.|
| guiParams.getLanguageCode | <code>Function</code> | Default returns the 'en' is English language. | <p>Your custom getLanguageCode() function.</p><p>returns the "primary language" subtag of the language version of the browser.</p><p>Examples: "en" - English language, "ru" Russian.</p><p>See the "Syntax" paragraph of RFC 4646 https://tools.ietf.org/html/rfc4646#section-2.1 for details.</p><p>You can import { getLanguageCode } from '../../commonNodeJS/master/lang.js';</p>|
| guiParams.lang | <code>object</code> |  | <p>Object with localized language values.</p><p>Example of using of guiParams.lang:</p><p>
guiParams = {</p><p>
</p><p>
	getLanguageCode: function() { return 'az'; },</p><p>
	lang: { textHeight: 'mətn boyu', languageCode: 'az' },</p><p>
</p><p>
}</p>
|

 * @param {GUI} [guiParams.parentFolder] parent folder, returned by gui.addFolder(name) https://github.com/dataarts/dat.gui/blob/master/API.md#GUI+addFolder
 * @param {string} [guiParams.options] See SpriteText options.
 * @param {string} [guiParams.spriteFolder] sprite folder name. Default is lang.spriteText
 * @returns {GUI} sprite folder

**Example.**
```
<script>

	import * as THREE from '../../three.js/dev/build/three.module.js';
	//import * as THREE from 'https://raw.githack.com/anhr/three.js/dev/build/three.module.js';

	import { dat } from '../../commonNodeJS/master/dat.module.js';
	import { SpriteText, SpriteTextGui } from './SpriteText.js';

	// create scene etc
	...

	scene.add( new SpriteText( 'Default SpriteText' ) );
	var gui = new dat.GUI();

	//Settings for all SpriteText added to scene and child groups
	SpriteTextGui( gui, scene, {

		getLanguageCode: getLanguageCode,
		settings: { zoomMultiplier: 1.5, },
		options: {

			textHeight: 0.1,
			sizeAttenuation: false,

		}

	} );

</script>
```

### myThreejs.Points( arrayFuncs, options, pointsOptions )

Displaying points.

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [arrayFuncs](#arrayfuncs-item) | <code>Array of THREE.Vector4 or THREE.Vector3 or THREE.Vector2 or object</code> |  | points.geometry.attributes.position array |
| [options] | <code>object</code> |  | options. See [myThreejs.create](#mythreejscreate-createxdobjects-options-) options for details |
| [pointsOptions] | <code>object</code> |  | followed points options is availablee: |
| [pointsOptions.tMin] | <code>number</code> | 0 | start time. Uses for playing of the points. |
| [pointsOptions.name] | <code>string</code> | "" | name of the points. Used for displaying of items of the Select drop down control of the Meshs folder of the dat.gui. |
| [pointsOptions.position] | <code>THREE.Vector3</code> | new THREE.Vector3( 0, 0, 0 ) | position of the points.<p>Vector's x, y, z can be as:</p><p>* float - position of the points.</p><p>* [float] - array of positions of the points.</p> * Function - position of the points is function of the t. Example: new Function( 't', 'return 0.1 + t' ) |
| [pointsOptions.scale] | <code>THREE.Vector3</code> | new THREE.Vector3( 1, 1, 1 ) | scale of the points.<p>Vector's x, y, z can be as:</p><p>* float - scale of the points.</p><p>* [float] - array of scales of the points.</p><p> * Function - scale of the points is function of the t. Example: new Function( 't', 'return 1.1 + t' )</p> |
| [pointsOptions.rotation] | <code>THREE.Vector3</code> | new THREE.Vector3( 0, 0, 0 ) | rotation of the points.<p>Vector's x, y, z can be as:</p><p>* float - rotation of the points.</p><p>* [float] - array of rotations of the points.</p><p>* Function - rotation of the points is function of the t. Example: new Function( 't', 'return Math.PI / 2 + t * Math.PI * 2' ) |

**Example.**  
```
	group.add( myThreejs.Points( [ //arrayFuncs. See https://github.com/anhr/myThreejs#arrayfuncs-item for details

		{

			vector: new THREE.Vector4(
				new Function( 't', 'a', 'b', 'return Math.sin(t*a*2*Math.PI)*0.5+b' ),//x
				new Function( 't', 'a', 'b', 'return Math.cos(t*a*2*Math.PI)*0.5-b' ),//y
				new Function( 't', 'a', 'b', 'return t' ),//z
				new Function( 't', 'return 1-2*t' )//w
			),
			name: 'Animated 4D point',
			trace: true,//Displays the trace of the point movement.

		},
		new THREE.Vector2( 0, 0 ),//2D point. White color
		new THREE.Vector3( -0.5, 0.5, -1 ),//3D point. White color
		{

			vector: new THREE.Vector4( 0.5,//new Function( 't', 'a', 'b', 'return 0.5-t' ),
				0.5,
				0.5,
				new THREE.Color( "rgb(255, 0, 0)" ) ),//3D point
			name: 'Red point',
			trace: true,//Displays the trace of the point movement.

		}


	], options, {

		name: 'Wave',
		tMin: 0,
		position: new THREE.Vector3( new Function( 't', 'return 0.1 + t' ), 0.2, 0 ),
		scale: new THREE.Vector3( new Function( 't', 'return 1.1 + t' ), 1.2, 1 ),
		rotation: new THREE.Vector3( new Function( 't', 'return Math.PI / 2 + t * Math.PI * 2' ), Math.PI / 4 ),

	} ) );
```

### myThreejs.setArrayFuncs( mesh )

Converts the mesh.geometry.attributes.position to mesh.userData.[arrayFuncs](#arrayfuncs-item).
Used to restore the default point position.

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| mesh | <code>THREE.Mesh</code> |  | [THREE.Mesh](https://threejs.org/docs/index.html#api/en/objects/Mesh) |

### myThreejs.limitAngles( rotation )

Limits angles of rotations of the mesh between 0 and 360 degrees.

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| rotation | <code>[THREE.Euler](https://threejs.org/docs/index.html#api/en/math/Euler)</code> |  | rotation angles for limitation |

**Example.**  
```
	var angle = t * Math.PI * 2 * 1.2;
	points.rotation.set( angle, 0, 0 );
	myThreejs.limitAngles( points.rotation );
```

 ### arrayFuncs item

 * THREE.Vector4: 4D point.
 * THREE.Vector3: 3D point. w = 1. Default is white color.
 * THREE.Vector2: 2D point. w = 1, z = 0. Default is white color.

  Vector's x, y, z, w is position of the point.

  Can be as:
  float - position of the point.
  [float] - array of positions of the point.
  Function - position of the point is function of the t. Example: new Function( 't', 'a', 'b', 'return Math.sin(t*a*2*Math.PI)*0.5+b' )
  Vector.w can be as THREE.Color. Example: new THREE.Color( "rgb(255, 127, 0)" )
  if arrayFuncs.length === 0 then push new THREE.Vector3().
 * 
 * object: {
 *   vector: THREE.Vector4|THREE.Vector3|THREE.Vector2 - point position
 *   name: point name
 *   trace: true - Displays the trace of the point movement.
 * }
 * or
 * object: {
 *   x: x axis. Defauilt is 0.
 *   y: y axis. Defauilt is 0.
 *   z: z axis. Defauilt is 0.
 *   w: w axis. Defauilt is 0.
 * }
 * 
 * array: [
 *   0: x axis. Defauilt is 0.
 *   1: y axis. Defauilt is 0.
 *   2: z axis. Defauilt is 0.
 *   3: w axis. Defauilt is 0.
 * ]

## Directory Contents

```
└── build - Compiled source code.
```

## Building your own DropdownMenu

In the terminal, enter the following:

```
$ npm install
$ npm run build
```

## npm scripts

- npm run build - Build development and production version of scripts.


## On the following browsers have been successfully tested:

Windows 10

	IE 11

	Microsoft Edge 41

	Chrome 74

	Opera 60

	Safari 5.1.7 "Your browser does not seem to support <a href="http://khronos.org/webgl/wiki/Getting_a_WebGL_Implementation" style="color:#000">WebGL</a>"

	FireFox 56

Android 6.0.1

	Chrome 74 

	Samsung Galaxy S5 incorrect slider width

	FireFox 67 incorrect slider width

	Opera 52

	Opera Mini 43

LG Smart tv

	Chrome - init failed! WeekMap is not defined


## Thanks

[three-spritetext](https://github.com/vasturiano/three-spritetext).

 ## Have a job for me?
Please read [About Me](https://anhr.github.io/AboutMe/).
