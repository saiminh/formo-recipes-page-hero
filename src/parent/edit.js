import { __ } from '@wordpress/i18n';
import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';
import './editor.scss';

export default function Edit() {
	return (
		<div { ...useBlockProps({
      className: 'formo-recipes-page-hero',
    }) }>
			<InnerBlocks 
        template={[
          ['create-block/formo-recipes-page-hero-dynamic-images'],
          ['core/group', { className: 'formo-recipes-page-hero-text' }, [
            ['core/spacer', { height: '1rem', className: 'formo-recipes-page-hero__spacer__top' }],
            ['core/heading', {
              level: 1,
              placeholder: __('Page Headline', 'formo'),
              className: 'formo-recipes-page-hero__headline'
            }],
            ['core/spacer', { height: '1rem', className: 'formo-recipes-page-hero__spacer__bottom' }],
          ]]
        ]}
        templateLock="all"
      />
		</div>
	);
}
