/**
 * A sprite based text component.
 * @author anhr / https://github.com/anhr/
*/

import * as THREE from '../../three.js/dev/build/three.module.js';
//import * as THREE from 'https://raw.githack.com/anhr/three.js/dev/build/three.module.js';

import { dat } from '../../commonNodeJS/master/dat.module.js';
import { ScaleControllers } from '../../commonNodeJS/master/ScaleController.js';
import Cookie from '../../cookieNodeJS/master/cookie.js';
//import cookie from 'https://raw.githack.com/anhr/cookieNodeJS/master/cookie.js';

function _getCenter( center ) {

	return center instanceof THREE.Vector2 ||
		( ( typeof center === "object" ) && ( center.x !== undefined ) && ( center.y !== undefined )//При копироваении и при чтении из cockie THREE.Vector2 превращается в Object{x: x, y: y}
	) ? center : 
		new THREE.Vector2( 0, 1 );//Default is left upper corner

}

/**
 * A sprite based text component.
 * @param {string|number} text The text to be displayed on the sprite. You can include a multiline text separated by "\r\n".
 * @param {THREE.Vector3} [position] Position of the text. Default is new THREE.Vector3(0,0,0).
 * @param {object} [options] followed options is available
 * @param {number} [options.textHeight] The height of the text. Default is 0.04.
 * @param {number} [options.fov] Camera frustum vertical field of view, from bottom to top of view, in degrees.
 * https://threejs.org/docs/index.html#api/en/cameras/PerspectiveCamera.fov
 * Set the fov option as camera.fov if you want to see text size is independent from camera.fov. The text height will be calculated as textHeight = fov * textHeight / 50
 * Default is undefined.
 * @param {boolean} [options.sizeAttenuation] Whether the size of the sprite is attenuated by the camera depth. (Perspective camera only.) Default is false.
 * See https://threejs.org/docs/index.html#api/en/materials/SpriteMaterial.sizeAttenuation
 * @param {number} [options.rotation] The rotation of the sprite in radians. Default is 0.
 * See https://threejs.org/docs/index.html#api/en/materials/SpriteMaterial.rotation
 * @param {string} [options.fontFace] CSS font-family - specifies the font of the text. Default is 'Arial'.
 * @param {string[]} [options.fontFaces] array of fontFaces. Example ['Arial', 'Verdana', 'Times'].
 * @param {string} [options.fontColor] RGBA object or RGB object or HEX value. Default is 'rgba(255, 255, 255, 1)'.
 *	Examples 'rgba(0, 0, 255, 0.5)', '#00FF00'.
 * @param {boolean} [options.bold] CSS font-weight. Equivalent of 700. Default is false.
 * @param {boolean} [options.italic] CSS font-style. Default is false.
 * @param {string} [options.fontProperties] Other font properties. The font property uses the same syntax as the CSS font property.
 * 	Default is empty string. Example "900", "oblique lighter".
 * @param {THREE.Vector2} [options.center] The text's anchor point.
 * See https://threejs.org/docs/index.html#api/en/objects/Sprite.center
 * 	A value of (0.5, 0.5) corresponds to the midpoint of the text.
 * 	A value of (0, 0) corresponds to the left lower corner of the text.
 * 	A value of (0, 1) corresponds to the left upper corner of the text.
 * 	Default is (0, 1).
 * @param {object} [options.rect] rectangle around the text.
 * @param {boolean} [options.rect.displayRect] true - the rectangle around the text is visible. Default is false.
 * @param {string} [options.rect.backgroundColor] background color. RGBA object or RGB object or HEX value
 * 	Default is 'rgba(0, 0, 0, 0)' - black transparent.
 * 	Examples 'rgba(0, 0, 255, 0.5)', '#00FF00'.
 * @param {string} [options.rect.borderColor] border color. RGBA object or RGB object or HEX value. Default is same as options.fontColor 'rgba(255, 255, 255, 1)' - white.
 * @param {number} [options.rect.borderThickness] border thickness. Default is 0 - invisible border.
 * @param {number} [options.rect.borderRadius] border corners radius. Default is 0 - no radius.
 * @see Thanks to / https://github.com/vasturiano/three-spritetext
 */
var SpriteText = function ( text, position, options ) {

	position = position || new THREE.Vector3( 0, 0, 0 );
	options = options || {};

	var sprite = new THREE.Sprite( new THREE.SpriteMaterial( {

		map: new THREE.Texture(),
		sizeAttenuation: options.sizeAttenuation !== undefined ? options.sizeAttenuation :
			false,//The size of the sprite is not attenuated by the camera depth. (Perspective camera only.)

	} ) );
	var canvas = document.createElement( 'canvas' );
	sprite.material.map.minFilter = THREE.LinearFilter;
	var fontSize = 90;
	const context = canvas.getContext( '2d' );

	var angleDistance = 1;
	sprite.userData.update = function ( optionsUpdate ) {

		optionsUpdate = optionsUpdate || {};
		var textHeight = options.textHeight || optionsUpdate.textHeight || 0.04,
			fov = options.fov || optionsUpdate.fov,
			sizeAttenuation = options.sizeAttenuation || optionsUpdate.sizeAttenuation || false,
			rotation = options.rotation || optionsUpdate.rotation || 0,
			fontFace = options.fontFace || optionsUpdate.fontFace || 'Arial',
			bold = options.bold || optionsUpdate.bold || false,
			italic = options.italic || optionsUpdate.italic || false,
			fontProperties = options.fontProperties || optionsUpdate.fontProperties || '',
			rect = options.rect || optionsUpdate.rect || {},
			color = 'rgba(255, 255, 255, 1)',
			fontColor = options.fontColor || optionsUpdate.fontColor || color,
			center = _getCenter( options.center || optionsUpdate.center );
		if ( fov !== undefined )
			textHeight = fov * textHeight / 50;

		rect.displayRect = rect.displayRect || false;
		var borderThickness = rect.borderThickness ? rect.borderThickness : 5;
		var font = `${fontProperties}${bold ? 'bold ' : ''}${italic ? 'italic ' : ''}${fontSize}px ${fontFace}`;

		context.font = font;

		var width = 0, linesCount = 1,
			lines;
		if ( typeof text === 'string' ) {

			linesCount = 0;
			lines = text.split( /\r\n|\r|\n/ );
			lines.forEach( function ( line ) {

				var lineWidth = context.measureText( line ).width;
				if ( width < lineWidth )
					width = lineWidth;
				linesCount += 1;

			} );

		} else width = context.measureText( text ).width;

		width += borderThickness * 2;

		const textWidth = width;
		canvas.width = textWidth;
		canvas.height = fontSize * linesCount + borderThickness * 2;

		context.font = font;

		//Rect
		//Thanks to http://stemkoski.github.io/Three.js/Sprite-Text-Labels.html
		if ( rect.displayRect ) {

			// background color
			context.fillStyle = rect.backgroundColor ? rect.backgroundColor : 'rgba(0, 0, 0, 1)';

			// border color
			context.strokeStyle = rect.borderColor ? rect.borderColor : fontColor;

			context.lineWidth = borderThickness;

			// function for drawing rounded rectangles
			function roundRect( ctx, x, y, w, h, r ) {

				ctx.beginPath();
				ctx.moveTo( x + r, y );
				ctx.lineTo( x + w - r, y );
				ctx.quadraticCurveTo( x + w, y, x + w, y + r );
				ctx.lineTo( x + w, y + h - r );
				ctx.quadraticCurveTo( x + w, y + h, x + w - r, y + h );
				ctx.lineTo( x + r, y + h );
				ctx.quadraticCurveTo( x, y + h, x, y + h - r );
				ctx.lineTo( x, y + r );
				ctx.quadraticCurveTo( x, y, x + r, y );
				ctx.closePath();
				ctx.fill();
				ctx.stroke();

			}
			roundRect( context,
				borderThickness / 2,
				borderThickness / 2,
				canvas.width - borderThickness,
				canvas.height - borderThickness,
				rect.borderRadius === undefined ? 0 : rect.borderRadius
			);

		}

		context.fillStyle = fontColor;
		context.textBaseline = 'bottom';
		if ( linesCount > 1 ) {
			for ( var i = 0; i < lines.length; i++ ) {

				var line = lines[i];
				context.fillText( line, borderThickness, canvas.height - ( ( lines.length - i - 1 ) * fontSize ) - borderThickness );

			}

		} else context.fillText( text, borderThickness, canvas.height - borderThickness );

		// Inject canvas into sprite
		sprite.material.map.image = canvas;
		sprite.material.map.needsUpdate = true;

		var th = textHeight * angleDistance * linesCount;
		sprite.scale.set( th * canvas.width / canvas.height, th );
		sprite.position.copy( position );
		sprite.center = center;

		//size attenuation. Whether the size of the sprite is attenuated by the camera depth. (Perspective camera only.) Default is false.
		//See https://threejs.org/docs/index.html#api/en/materials/SpriteMaterial.sizeAttenuation
		sprite.material.sizeAttenuation = sizeAttenuation;

		sprite.material.rotation = rotation;
		sprite.material.needsUpdate = true;

	};
	sprite.userData.update();

	sprite.userData.updateText = function ( _text ) {

		text = _text;
		const options = {}
		updateOptions( sprite.parent, options );
		sprite.userData.update( options );

	}
	return sprite;

};

function updateOptions( group, options ) {

	if ( group.userData.optionsSpriteText )
		Object.keys( group.userData.optionsSpriteText ).forEach( function ( key ) {

			if ( options[key] === undefined )//Child options have more priority before parent options
				options[key] = group.userData.optionsSpriteText[key];

		} );
	while ( group.parent ) {

		group = group.parent;
		updateOptions( group, options );

	}

}

function updateSpriteTextGroup( group ) {

	group.children.forEach( function ( spriteItem ) {

		if ( spriteItem instanceof THREE.Sprite ) {

			var options = {};
			updateOptions( group, options );
			if ( spriteItem.userData.update !== undefined )
				spriteItem.userData.update( options );

		} else if ( spriteItem instanceof THREE.Group )
			updateSpriteTextGroup( spriteItem );

	} );

}

/**
 * Adds SpriteText settings folder into gui.
 * @param {GUI} gui see https://github.com/anhr/dat.gui for details
 * @param {THREE.Group|THREE.Scene} group group or scene of SpriteText and of all child groups of SpriteText for which these settings will have an effect
 * @param {object} [guiParams] Followed parameters is allowed. Default is no parameters
 * @param {Function} [guiParams.getLanguageCode] Your custom getLanguageCode() function.
 * returns the "primary language" subtag of the language version of the browser.
 * Examples: "en" - English language, "ru" Russian.
 * See the "Syntax" paragraph of RFC 4646 https://tools.ietf.org/html/rfc4646#section-2.1 for details.
 * Default returns the 'en' is English language.
 * You can import { getLanguageCode } from '../../commonNodeJS/master/lang.js';
 * @param {object} [guiParams.lang] Object with localized language values
 * Example of using of guiParams.lang:
guiParams = {

	getLanguageCode: function() { return 'az'; },
	lang: { textHeight: 'mətn boyu', languageCode: 'az' },

}
 * @param {GUI} [guiParams.parentFolder] parent folder, returned by gui.addFolder(name) https://github.com/dataarts/dat.gui/blob/master/API.md#GUI+addFolder
 * @param {string} [guiParams.options] See SpriteText options https://github.com/anhr/SpriteText/blob/master/README.md#new-spritetext-text-position-options-.
 * @param {string} [guiParams.spriteFolder] sprite folder name. Default is lang.spriteText
 * @returns {GUI} sprite folder
 */
var SpriteTextGui = function ( gui, group, guiParams ) {

	guiParams = guiParams || {};
	var options = guiParams.options || {};
//		optionsCookie = {};
	const optionsDefault = JSON.parse( JSON.stringify( options ) );
	Object.freeze( optionsDefault );

	//Localization

	var lang = {

		spriteText: 'Sprite Text',

		text: 'Text',
		textTitle: 'The text to be displayed on the sprite.',

		textHeight: 'Height',
		textHeightTitle: 'Text Height.',

		fontFace: 'Font Face',
		fontFaceTitle: 'Choose text font.',

		bold: 'Bold',

		italic: 'Italic',

		rotation: 'Rotation',
		rotationTitle: 'Sprite rotation',

		fontProperties: 'Font Properties',
		fontPropertiesTitle: 'Other font properties. The font property uses the same syntax as the CSS font property.',

		fontStyle: 'Font Style',
		fontStyleTitle: 'Text style being used when drawing text. Read only.',

		displayRect: 'Border',
		displayRectTitle: 'Display a border around the text.',
		borderColor: 'Border Color',
		backgroundColor: 'Background Color',
		borderRadius: 'Border Radius',
		borderThickness: 'Border Thickness',

		fontColor: 'Font Color',

		anchor: 'Anchor',
		anchorTitle: 'The text anchor point.',

		sizeAttenuation: 'Size Attenuation',
		sizeAttenuationTitle: 'Whether the size of the sprite is attenuated by the camera depth. (Perspective camera only.)',

		defaultButton: 'Default',
		defaultTitle: 'Restore default Sprite Text settings.',

	};

	var _languageCode = guiParams.getLanguageCode === undefined ? 'en'//Default language is English
		: guiParams.getLanguageCode();
	switch ( _languageCode ) {

		case 'ru'://Russian language
			lang.spriteText = 'Текстовый спрайт';//'Sprite Text'

			lang.text = 'Текст';
			lang.textTitle = 'Текст, который будет отображен в спрайте.';

			lang.textHeight = 'Высота';
			lang.textHeightTitle = 'Высота текста.';

			lang.fontFace = 'Имя шрифта';
			lang.fontFaceTitle = 'Выберите шрифта текста.';

			lang.bold = 'Жирный';

			lang.italic = 'Наклонный';

			lang.rotation = 'Вращение';
			lang.rotationTitle = 'Вращение текстового спрайта';

			lang.fontProperties = 'Дополнительно';
			lang.fontPropertiesTitle = 'Дополнительные свойства шрифта. Свойство шрифта использует тот же синтаксис, что и свойство шрифта CSS.';

			lang.fontStyle = 'Стиль шрифта';
			lang.fontStyleTitle = 'Стиль шрифта, используемый при рисовании текста. Не редактируется.';

			lang.displayRect = 'Рамка';
			lang.displayRectTitle = 'Отобразить рамку вокруг текста.';
			lang.borderColor = 'Цвет рамки';
			lang.backgroundColor = 'Цвет фона';
			lang.borderRadius = 'Зкругление углов';
			lang.borderThickness = 'Толщина рамки';

			lang.fontColor = 'Цвет шрифта';

			lang.anchor = 'Якорь';
			lang.anchorTitle = 'Точка привязки текста.';

			lang.sizeAttenuation = 'Размер';
			lang.sizeAttenuationTitle = 'Будет ли размер спрайта зависеть от расстояния до камеры. (Только перспективная камера.)';

			lang.defaultButton = 'Восстановить';
			lang.defaultTitle = 'Восстановить настройки текстового спрайта по умолчанию.';
			break;
		default://Custom language
			if ( ( guiParams.lang === undefined ) || ( guiParams.lang.languageCode != _languageCode ) )
				break;

			Object.keys( guiParams.lang ).forEach( function ( key ) {

				if ( lang[key] === undefined )
					return;
				lang[key] = guiParams.lang[key];

			} );

	}

	guiParams.spriteFolder = guiParams.spriteFolder || lang.spriteText;
	var cookieName = guiParams.spriteFolder;
	let cookie = guiParams.cookie || new Cookie.defaultCookie();
	cookie.getObject( cookieName, options, options );
	if ( group instanceof THREE.Sprite !== true )
		group.userData.optionsSpriteText = options;

	//

	function updateSpriteText( noSave ) {

		if ( Array.isArray( group ) )
			group.forEach( function ( spriteItem ) {

				spriteItem.update( options );

			} );
		else if ( ( group instanceof THREE.Group ) || ( group instanceof THREE.Scene ) ){

			updateSpriteTextGroup( group );

		} else if ( group instanceof THREE.Sprite )
			group.userData.update( options );
		else group.update( options );

		if ( controllerFont !== undefined )
			controllerFont.setValue( options.font );

		if ( !noSave )
			cookie.setObject( cookieName, options );

	}

	if ( !guiParams.hasOwnProperty( 'parentFolder' ) )
		guiParams.parentFolder = gui;

	//Sprite folder
	var fSpriteText = guiParams.parentFolder.addFolder( guiParams.spriteFolder );

/*
	//Sprite text
	if ( options.hasOwnProperty( 'text' ) ) {

		optionsCookie['text'] = options.text;
		dat.controllerNameAndTitle(
			fSpriteText.add( options, 'text' ).onChange( function ( value ) {

				updateSpriteText();

			} ), lang.text, lang.textTitle );

	}
*/
	//Sprite text height
	var textHeight = 'textHeight';
	if ( options.hasOwnProperty( textHeight ) && ( options[textHeight] !== undefined ) ) {

		ScaleControllers( fSpriteText, options, textHeight, function() { updateSpriteText(); }, {

			text: lang.textHeight, textTitle: lang.textHeightTitle,
			getLanguageCode: guiParams.getLanguageCode,
			settings: guiParams.settings,

		} );


	}

	//font faces
	if ( options.fontFaces !== undefined ) {

//		optionsCookie['fontFace'] = options.fontFace;
		dat.controllerNameAndTitle(
			fSpriteText.add( options, 'fontFace', options.fontFaces ).onChange( function ( value ) {

				updateSpriteText();

			} ), lang.fontFace, lang.fontFaceTitle );

	}

	//bold
	if ( options.hasOwnProperty( 'bold' ) ) {

//		optionsCookie['bold'] = options.bold;
		dat.controllerNameAndTitle(
			fSpriteText.add( options, 'bold' ).onChange( function ( value ) {

				updateSpriteText();

			} ), lang.bold );

	}

	//italic
	if ( options.hasOwnProperty( 'italic' ) ) {

//		optionsCookie['italic'] = options.italic;
		dat.controllerNameAndTitle(
			fSpriteText.add( options, 'italic' ).onChange( function ( value ) {

				updateSpriteText();

			} ), lang.italic );

	}

	//rotation
	var rotation = 'rotation';
	if ( options.hasOwnProperty( rotation ) ) {

		var min = 0,
			max = Math.PI * 2;
		dat.controllerNameAndTitle(
			fSpriteText.add( options, rotation, min, max, ( max - min ) / 360 ).onChange( function ( value ) {

				updateSpriteText();

			} ), lang.rotation, lang.rotationTitle );

	}

	//font properties
	if ( options.hasOwnProperty( 'fontProperties' ) ) {

//		optionsCookie['fontProperties'] = options.fontProperties;
		dat.controllerNameAndTitle(
			fSpriteText.add( options, 'fontProperties' ).onChange( function ( value ) {

				updateSpriteText();

			} ), lang.fontProperties, lang.fontPropertiesTitle );

	}

	//font style
	if ( options.hasOwnProperty( 'font' ) ) {

//		optionsCookie['font'] = options.font;
		var controllerFont = fSpriteText.add( options, 'font' );
		controllerFont.__input.readOnly = true;
		dat.controllerNameAndTitle( controllerFont, lang.fontStyle, lang.fontStyleTitle );

	}

	//text rectangle
	if ( options.hasOwnProperty( 'rect' ) ) {

		if ( options.rect.displayRect === undefined ) options.rect.displayRect = false;
//		optionsCookie['displayRect'] = options.displayRect;
		dat.controllerNameAndTitle( fSpriteText.add( options.rect, 'displayRect' ).onChange( function ( value ) {

			updateSpriteText();
			fRect.domElement.style.display = options.rect.displayRect ? 'block' : 'none';

		} ), lang.displayRect, lang.displayRectTitle );
		var fRect = fSpriteText.addFolder( lang.displayRect );//'Border'
		fRect.domElement.style.display = options.rect.displayRect ? 'block' : 'none';

		//border thickness
		var borderThickness = 'borderThickness';
		if ( options.rect.hasOwnProperty( borderThickness ) ) {

			dat.controllerNameAndTitle(
				fRect.add( options.rect, borderThickness, 1, options.rect.borderThickness * 30, 1 ).onChange( function ( value ) {

					updateSpriteText();

				} ), lang.borderThickness );

		}

		//border сolor
		var borderColor = 'borderColor';
		if ( options.rect.hasOwnProperty( borderColor ) ) {

			dat.controllerNameAndTitle( fRect.addColor( options.rect, borderColor ).onChange( function ( value ) {

				updateSpriteText();

			} ), lang.borderColor );

		}

		//background color
		var backgroundColor = 'backgroundColor';
		if ( options.rect.hasOwnProperty( backgroundColor ) ) {

			dat.controllerNameAndTitle( fRect.addColor( options.rect, backgroundColor ).onChange( function ( value ) {

				updateSpriteText();

			} ), lang.backgroundColor );

		}

		//border radius
		var borderRadius = 'borderRadius';
		if ( options.rect.hasOwnProperty( borderRadius ) ) {

			dat.controllerNameAndTitle(
				fRect.add( options.rect, borderRadius, 0, 100, 1 ).onChange( function ( value ) {

					updateSpriteText();

				} ), lang.borderRadius );

		}

	}

	//font сolor
	if ( options.hasOwnProperty( 'fontColor' ) ) {

//		optionsCookie['fontColor'] = options.fontColor;
		dat.controllerNameAndTitle( fSpriteText.addColor( options, 'fontColor' ).onChange( function ( value ) {

			updateSpriteText();

		} ), lang.fontColor );

	}

	//anchor
	if ( options.hasOwnProperty( 'center' ) ) {

		options.center = _getCenter( options.center );
//		optionsCookie['center'] = options.center;

		//anchor folder
		var fAnchor = fSpriteText.addFolder( 'center' );
		dat.folderNameAndTitle( fAnchor, lang.anchor, lang.anchorTitle );

		//anchor x
		fAnchor.add( options.center, 'x', 0, 1, 0.1 ).onChange( function ( value ) {

			updateSpriteText();

		} );

		//anchor y
		fAnchor.add( options.center, 'y', 0, 1, 0.1 ).onChange( function ( value ) {

			updateSpriteText();

		} );

	}

	//size attenuation. Whether the size of the sprite is attenuated by the camera depth. (Perspective camera only.) Default is false.
	//See https://threejs.org/docs/index.html#api/en/materials/SpriteMaterial.sizeAttenuation
	var sizeAttenuation = 'sizeAttenuation';
	if ( options.hasOwnProperty( sizeAttenuation ) && ( options[sizeAttenuation] !== undefined ) ) {

		dat.controllerNameAndTitle( fSpriteText.add( options, sizeAttenuation ).onChange( function ( value ) {

			updateSpriteText();

		} ), lang.sizeAttenuation, lang.sizeAttenuationTitle );

	}

	//default button
	let defaultParams = {
			defaultF: function ( value ) {

				function setValues( folder, key, optionsDefault ) {

					folder.__controllers.forEach( function ( controller ) {

						if ( controller.property !== key ) {

							if ( typeof optionsDefault[key] !== "object" )
								return;
							Object.keys( optionsDefault[key] ).forEach( function ( optionKey ) {

								if ( controller.property !== optionKey )
									return;
								controller.setValue( optionsDefault[key][optionKey] );

							} );
							return;

						}
						controller.setValue( optionsDefault[key] );

					} );

				}

				Object.keys( optionsDefault ).forEach( function ( key ) {

					setValues( fSpriteText, key, optionsDefault );
					if ( typeof optionsDefault[key] === "object" ) {

						Object.keys( optionsDefault[key] ).forEach( function ( keyObject ) {

							Object.keys( fSpriteText.__folders ).forEach( function ( keyFolder ) {

								setValues( fSpriteText.__folders[keyFolder], keyObject, optionsDefault[key] );

							} );

						} );

					}

					Object.keys( fSpriteText.__folders ).forEach( function ( keyFolder ) {

						if ( keyFolder !== key )
							return;
						Object.keys( optionsDefault[keyFolder] ).forEach( function ( key ) {

							setValues( fSpriteText.__folders[keyFolder], key, optionsDefault[keyFolder] );

						} );

					} );

				} );
//				if ( guiParams.default !== undefined ) guiParams.default();

			},

		};
	if ( optionsDefault === undefined ) console.error( 'SpriteTextGui: optionsDefault = ' + optionsDefault );
	dat.controllerNameAndTitle( fSpriteText.add( defaultParams, 'defaultF' ), lang.defaultButton, lang.defaultTitle );

	updateSpriteText( true );
	
	return fSpriteText;

};

export { SpriteText, SpriteTextGui, updateSpriteTextGroup };
