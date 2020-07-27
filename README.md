# SpriteText.

A [sprite](https://threejs.org/docs/index.html#api/en/objects/Sprite) based text component. SpriteText is a text that always faces towards the camera.

I use SpriteText in my [three.js](https://threejs.org/) projects for displaying of the text in the canvas.
[Example](https://raw.githack.com/anhr/SpriteText/master/Examples/SpriteText.html).

Uses in my projects:
 * [AxesHelper](https://github.com/anhr/AxesHelper)
 * [myThreejs](https://github.com/anhr/myThreejs)

## Quick start

### SpriteText

The easiest way to use SpriteText in your code is import SpriteText from SpriteText.js file in your JavaScript module. [Example](https://raw.githack.com/anhr/SpriteText/master/Examples/SpriteText.html)
```
import { SpriteText } from 'https://raw.githack.com/anhr/SpriteText/master/SpriteText.js';
```
or

* Create a folder on your localhost named as [folderName].
* Download [SpriteText](https://github.com/anhr/SpriteText) repository into your "[folderName]\SpriteText\master" folder.
* Open http://localhost/[folderName]/SpriteText/master/Examples/SpriteText.html for testing of your downloads.

```
import { SpriteText } from './SpriteText.js';
```

Now you can use SpriteText in your javascript code. See [SpriteText API](https://raw.githack.com/anhr/SpriteText/master/jsdoc/SpriteText/index.html) for details.

### SpriteTextGui

Use SpriteTextGui for manual change settings of the SpriteText.

The easiest way to use SpriteTextGui in your code is import SpriteTextGui from SpriteTextGui.js file in your JavaScript module. [Example](https://raw.githack.com/anhr/SpriteText/master/Examples/SpriteTextGui.html)
```
import { SpriteTextGui } from 'https://raw.githack.com/anhr/SpriteText/master/SpriteTextGui.js';
```
or

* Use folder on your localhost named as [folderName]. See [SpriteText](https://github.com/anhr/SpriteText#spritetext-1) above.
* Download [SpriteText](https://github.com/anhr/SpriteText) repository into your "[folderName]\SpriteText\master" folder.
* Open http://localhost/[folderName]/SpriteText/master/Examples/SpriteTextGui.html for testing of your downloads.

```
import { SpriteTextGui } from './SpriteTextGui.js';
```

Now you can use SpriteTextGui in your javascript code. See [SpriteTextGui API](https://raw.githack.com/anhr/SpriteText/master/jsdoc/SpriteTextGui/index.html) for details.

### group.userData.optionsSpriteText - common options for the group of the SpriteText
You can set options for all SpriteText from the group or scene and all child groups.
Options of the child groups is more priority before parent group options.
Example:
```
//options for all SpriteText on the scene
scene.userData.optionsSpriteText = {

	fontColor: 'rgb(0, 255, 0)'//green color

}
var group = new THREE.Group();

//options of the group and all child group
group.userData.optionsSpriteText = {

	fontColor: 'rgba(255, 255, 225, 0.5)'//white semi opacity color

}
scene.add( group );

scene.add( new SpriteText( 'Scene' ) );//green color of the font
group.add( new SpriteText( 'Group' ) );//white semi opacity color of the font
```

### folder.userData.restore() - Restore group.userData.optionsSpriteText to default values.
Example:
```
options = {

	textHeight: 0.1,
	sizeAttenuation: false,

}
const fSpriteTextAll = SpriteTextGui( gui, scene, {

	getLanguageCode: getLanguageCode,
	settings: { zoomMultiplier: 1.5, },
	options: options

} );

//Change of the text height
options.textHeight = 0.2;

//update of the options of all SpriteText, added in to group and all child groups
SpriteText.updateSpriteTextGroup( group );

//To do something...

//Restore options.textHeight to 0.1
fSpriteTextAll.userData.restore();
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
