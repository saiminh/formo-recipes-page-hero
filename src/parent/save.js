import { useBlockProps, InnerBlocks} from '@wordpress/block-editor';

export default function save() {
	return (
		<div { ...useBlockProps.save({
      className: 'formo-recipes-page-hero',
    }) }>
			<InnerBlocks.Content />
		</div>
	);
}
