<?php

/**
 * Theme filters.
 */

namespace App;

/**
 * Add "… Continued" to the excerpt.
 *
 * @return string
 */
add_filter('excerpt_more', function () {
    return sprintf(' &hellip; <a href="%s">%s</a>', get_permalink(), __('Continued', 'sage'));
});

/** Branding **/
add_action('wp_head', function () {
    if ((is_home() || is_front_page()) && is_page()) {
        echo '
<!--
Design + Development by                                   
LMSEO © '.date('Y').'                     
All Rights Reserved.               
www.lmseo.com

-->';
    }
});

/*
 * Add custom primary nav
 */
add_action('init',
    function () {
        register_nav_menu('top-bar', __('Top Bar'));
    });
/**
 * Add a parent CSS class for nav menu items.
 *
 * @param  array  $items  The menu items, sorted by each menu item's menu order.
 * @return array (maybe) modified parent CSS class.
 */
add_filter('wp_nav_menu_objects',
    function ($items) {
        $parents = [];

        // Collect menu items with parents.
        foreach ($items as $item) {
            if ($item->menu_item_parent && $item->menu_item_parent > 0) {
                $parents[] = $item->menu_item_parent;
                $item->classes[] = 'hvr-buzz-out';
            }
        }

        // Add class.
        foreach ($items as $item) {
            if (in_array($item->ID, $parents)) {
                $item->classes[] = 'has-dropdown not-click';
            }
        }

        return $items;
    });
