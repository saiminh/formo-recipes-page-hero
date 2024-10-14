import { registerBlockType } from '@wordpress/blocks';
import './style.scss';
import Edit from './edit';
import save from './save';
import metadata from './block.json';

registerBlockType( metadata.name, {
  parent: ['create-block/formo-recipes-page-hero'],
	edit: Edit,
	save,
} );
