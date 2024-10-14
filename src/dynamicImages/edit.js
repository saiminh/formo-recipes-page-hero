import { __ } from '@wordpress/i18n';
import { useBlockProps } from '@wordpress/block-editor';
import { useSelect } from '@wordpress/data';
import './editor.scss';

export default function Edit() {

  const posts = useSelect( ( select ) => {
    return select( 'core' ).getEntityRecords( 'postType', 'formo2022_recipe' );
  }, [] );
  

	return (
		<div { ...useBlockProps({
      className: 'formo-recipe-page-header-dynamic-images',
    }) }>
      { ! posts && 'Loading' }
      { posts && posts.length === 0 && 'No Posts' }
      { posts && posts.length > 0 && (
          
        posts.map( ( post, index) => {

          {/* Only show 4 images */}
          if (index > 3) {
            return;
          }

          const content = post.content.rendered;
          
          {/* Gets the featured image markup */}
          const featuredImage = content.match(/<figure[^>]*class=".*?wp-block-post-featured-image.*?"[^>]*>(.*?)<\/figure>/);

          if (!featuredImage || featuredImage.length === 0) {
            return 'Loading Image';
          } 
          else {

            //add the class formo-recipe-page-header-dynamic-images__item to featuredImage
            featuredImage[0] = featuredImage[0].replace('wp-block-post-featured-image', 'formo-recipe-page-header-dynamic-images__item wp-block-post-featured-image');
            // for index 0 add data-showing="true" to the featured image
            if (index === 0) {
              featuredImage[0] = featuredImage[0].replace('<figure', '<figure data-showing="true"');
            }

            return (
              <div key={ post.id } className="formo-recipe-page-header-dynamic-images__itemwrapper" dangerouslySetInnerHTML={{ __html: featuredImage[0] }}>
              </div>
            )
          }
       } )
          
      ) }
      
      <div className="recipe-dynamic-images-explainer">
        Recipe Page Hero: Rotating Background images are autoloaded from the last 4 recipes.
      </div>

		</div>
	);
}
