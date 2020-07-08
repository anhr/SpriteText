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
import { SpriteText, SpriteTextGui, updateSpriteTextGroup } from './SpriteText.js';
```

Now you can use SpriteText and SpriteTextGui in your javascript code.

### new SpriteText( text, position, options )

Creates a new sprite based text component.

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| text | <code>string or number</code> |  | The text to be displayed on the sprite. You can include a multiline text. Using the "\r\n" character to define line breaks.|
| position | <code>THREE.Vector3</code> | new THREE.Vector3( 0, 0, 0 ) | Position of the text.|
| [options] | <code>object</code> | {} | followed options is available: |
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
| [options.rect] | <code>object</code> | {} | rectangle around the text.|
| [options.rect.displayRect] | <code>boolean</code> | false | true - the rectangle around the text is visible.|
| [options.rect.backgroundColor] | <code>string</code> | 'rgba(0, 0, 0, 0)' - black transparent. | <p>background color. RGBA object or RGB object or HEX value.</p><p>Examples: 'rgba(0, 0, 255, 0.5)', '#00FF00'.</p><p>|
| [options.rect.borderColor] | <code>string</code> | Same as options.fontColor 'rgba(255, 255, 255, 1)' - white. | border color. RGBA object or RGB object or HEX value.|
| [options.rect.borderThickness] | <code>number</code> | 0 invisible border | border thickness.|
| [options.rect.borderRadius] | <code>number</code> | 0 no radius | border corners radius.|

### group.userData.optionsSpriteText - common options for the group of the SpriteText
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

### updateSpriteTextGroup( group )

Call updateSpriteTextGroup if you want to update of the options of all SpriteText, added in to group and all child groups
| Param | Type | Default | Description |
| --- | --- | --- | --- |
| group | <code>THREE.Group or THREE.Scene</code> |  | group or scene of SpriteText and of all child groups of SpriteText for which these settings will have an effect.|

### SpriteTextGui( gui, group, guiParams )

Adds SpriteText settings folder into [gui](https://github.com/anhr/dat.gui).

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| gui | <code>GUI</code> |  | see [dat.GUI](https://github.com/anhr/dat.gui) for details.|
| group | <code>THREE.Group or THREE.Scene or THREE.Sprite</code> |  | <p>group or scene of SpriteText and of all child groups of SpriteText for which these settings will have an effect.</p><p>If group is THREE.Sprite then will have an effect for current SpriteText only</p>|
| [guiParams] | <code>object</code> | {} | Followed parameters is allowed.|
| [guiParams.getLanguageCode] | <code>Function</code> | Default returns the 'en' is English language. | <p>Your custom getLanguageCode() function.</p><p>returns the "primary language" subtag of the language version of the browser.</p><p>Examples: "en" - English language, "ru" Russian.</p><p>See the "Syntax" paragraph of RFC 4646 https://tools.ietf.org/html/rfc4646#section-2.1 for details.</p><p>You can import { getLanguageCode } from '../../commonNodeJS/master/lang.js';</p>|
| [guiParams.lang] | <code>object</code> |  | <p>Object with localized language values.</p><p>Example of using of guiParams.lang:</p><p>guiParams = {</p><p></p><p>	getLanguageCode: function() { return 'az'; },</p><p>	lang: { textHeight: 'mətn boyu', languageCode: 'az' },</p><p></p><p>}</p>|
| [guiParams.parentFolder] | <code>GUI</code> |  | parent folder, returned by [gui.addFolder(name)](https://github.com/dataarts/dat.gui/blob/master/API.md#GUI+addFolder).|
| [guiParams.options] | <code>string</code> |  | See [SpriteText options](https://github.com/anhr/SpriteText/blob/master/README.md#new-spritetext-text-position-options-).|
| [guiParams.spriteFolder] | <code>string</code> |  | sprite folder name. Default is lang.spriteText|

 SpriteTextGui returns the GUI SpriteText options folder.

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

## On the following browsers have been successfully tested:

Windows 10

	IE 11 Fatal error: Your browser do not support modular JavaScript code

	Microsoft Edge 44

	Chrome 83

	Opera 68

	Safari 5.1.7 Fatal error: Your browser do not support modular JavaScript code

	FireFox 72

Android 6.0.1

	Chrome 83

	Samsung Internet 12

	FireFox 68

	Opera 59

	Opera Mini 50

LG Smart tv

	Chrome - Fatal error: Your browser do not support modular JavaScript code


## Thanks

[three-spritetext](https://github.com/vasturiano/three-spritetext).

 ## Have a job for me?
Please read [About Me](https://anhr.github.io/AboutMe/).
