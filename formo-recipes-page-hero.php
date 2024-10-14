<?php
/**
 * Plugin Name:       Formo Recipes Page Hero
 * Description:       Displays a title and a carousel of latest Recipe images.
 * Requires at least: 6.6
 * Requires PHP:      7.2
 * Version:           0.1.0
 * Author:            The WordPress Contributors
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       formo-recipes-page-hero
 *
 * @package CreateBlock
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */

function render_recipe_dynamicImages_block($attributes) {

  $args = array(
    'post_type' => 'formo2022_recipe',
    'posts_per_page' => 4,
  );

  $query = new WP_Query($args);

  $images = array();

  if ($query->have_posts()) {
    while ($query->have_posts()) {
      $query->the_post();
      $imageID = get_post_thumbnail_id();
      $image = get_the_post_thumbnail( get_the_ID() );
      array_push($images, $image);
    }
  }

  wp_reset_postdata();

  return '
    <div class="formo-recipe-page-header-dynamic-images">
      <figure class="formo-recipe-page-header-dynamic-images__item" data-index="0" data-showing="true" >'.$images[0].'</figure>
      <figure class="formo-recipe-page-header-dynamic-images__item" data-index="1">'.$images[1].'</figure>
      <figure class="formo-recipe-page-header-dynamic-images__item" data-index="2">'.$images[2].'</figure>
      <figure class="formo-recipe-page-header-dynamic-images__item" data-index="3">'.$images[3].'</figure>
    </div>
    <div class="formo-recipe-page-header-dynamic-images-nav">
      <button class="formo-recipe-page-header-dynamic-images-nav__button" data-index="0" data-active="true" ></button>
      <button class="formo-recipe-page-header-dynamic-images-nav__button" data-index="1"></button>
      <button class="formo-recipe-page-header-dynamic-images-nav__button" data-index="2"></button>
      <button class="formo-recipe-page-header-dynamic-images-nav__button" data-index="3"></button>
    </div>
  ';

}

function create_block_formo_recipes_page_hero_block_init() {
	register_block_type( __DIR__ . '/build/dynamicImages', array(
    'render_callback' => 'render_recipe_dynamicImages_block',
  ) );
	register_block_type( __DIR__ . '/build/parent' );
}
add_action( 'init', 'create_block_formo_recipes_page_hero_block_init' );
