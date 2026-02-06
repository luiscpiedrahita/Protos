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

/**
 * Adds a css class like 'widget-1', 'widget-2', etc.
 *
 * @param  array  $items  The menu items, sorted by each menu item's menu order.
 * @return array (maybe) modified parameters passed to a widget’s display callback..
 */
add_filter('dynamic_sidebar_params', function ($params) {
    global $my_widget_num; // Global counter for widgets
    $widget_id = $params[0]['widget_id'];

    if (! $my_widget_num) {
        $my_widget_num = 0;
    } // start widget counter
    $my_widget_num++; // add 1 to the counter on each widget

    // Add a class like 'widget-1', 'widget-2', etc.
    $class_to_add = 'footer-widgets-'.$my_widget_num;

    $haystack = $params[0]['before_widget'];
    $needle = 'class="';
    $replace = 'class="'.$class_to_add.' ';
    $pos = strpos($haystack, $needle);

    if ($pos !== false) {
        $params[0]['before_widget'] = substr_replace($haystack, $replace, $pos, strlen($needle));
    }

    return $params;
});

add_filter('get_search_form', __NAMESPACE__.'\\custom_search_form', 40, 2);
function custom_search_form($form, $args)
{
    return \Roots\view('partials.searchform');
}
