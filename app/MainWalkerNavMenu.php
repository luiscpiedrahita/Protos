<?php

namespace App;

use Walker_Nav_Menu;

/**
 * Custom walker class.
 */
class MainWalkerNavMenu extends Walker_Nav_Menu
{
    /**
     * Starts the list before the elements are added.
     *
     * Adds classes to the unordered list sub-menus.
     *
     * @param  string  $output  Passed by reference. Used to append additional content.
     * @param  int  $depth  Depth of menu item. Used for padding.
     * @param  array  $args  An array of arguments. @see wp_nav_menu()
     */
    public function start_lvl(&$output, $depth = 0, $args = [])
    {
        // Depth-dependent classes.
        $indent = ($depth > 0 ? str_repeat("\t", $depth) : ''); // code indent
        $display_depth = ($depth + 1); // because it counts the first submenu as 0
        $classes = [
            'dropdown-menu',
            ($display_depth % 2 ? 'dropdown-odd' : 'dropdown-even'),
            ($display_depth >= 2 ? 'submenu' : ''),
            'dropdown-depth-'.$display_depth,
        ];
        $class_names = implode(' ', $classes);

        // Build HTML for output.
        $output .= "\n".$indent.'<ul class="'.$class_names.'">'."\n";
    }

    /**
     * Start the element output.
     *
     * Allows to create a custom navbar with the structure of Bootstrap.
     *
     * @param  string  $output  Passed by reference. Used to append additional content.
     * @param  object  $item  Menu item data object.
     * @param  int  $depth  Depth of menu item. Used for padding.
     * @param  array  $args  An array of arguments. @see wp_nav_menu()
     * @param  int  $id  Current item ID.
     */
    public function start_el(&$output, $item, $depth = 0, $args = [], $id = 0)
    {
        global $wp_query;
        $indent = ($depth > 0 ? str_repeat("\t", $depth) : ''); // code indent
        //        print_r(($item));
        // Depth-dependent classes.
        $depth_classes = [
            ($depth == 0 ? 'nav-item' : ''),
            ($depth == 0 && $args->walker->has_children ? 'dropdown' : ''),
            ($depth > 0 && $args->walker->has_children ? 'nav-item dropdown' : ''),
            ($depth % 2 ? 'nav-item-odd' : 'nav-item-even'),
            'nav-item-depth-'.$depth,
        ];
        $depth_class_names = esc_attr(implode(' ', $depth_classes));

        // Passed classes.
        $classes = empty($item->classes) ? [] : (array) $item->classes;
        $class_names = esc_attr(implode(' ', apply_filters('nav_menu_css_class', array_filter($classes), $item)));

        // Build HTML.
        $output .= $indent.'<li id="nav-menu-item-'.$item->ID.'" class="'.$depth_class_names.' '.$class_names.'">';

        // Link attributes.
        $attributes = ! empty($item->attr_title) ? ' title="'.esc_attr($item->attr_title).'"' : '';
        $attributes .= ! empty($item->target) ? ' target="'.esc_attr($item->target).'"' : '';
        $attributes .= ! empty($item->xfn) ? ' rel="'.esc_attr($item->xfn).'"' : '';
        $attributes .= ! empty($item->url) ? ' href="'.esc_attr($item->url).'"' : '';
        $linkClasses = 'hvr-underline-from-left ';
        if ($args->walker->has_children) {
            $linkClasses .= 'nav-link dropdown-toggle';
            //            $attributes .= !empty( $item->url )        ? ' data-bs-toggle="dropdown" aria-expanded="false" data-bs-auto-close="outside" data-bs-boundary="clippingParents"' : '';
            $attributes .= ! empty($item->url) ? ' data-bs-toggle="" aria-expanded="false" data-bs-auto-close="outside" data-bs-boundary="clippingParents"' : '';
        } else {
            if ($depth > 0) {
                $linkClasses .= 'dropdown-item';
            } else {
                $linkClasses .= 'nav-link';
            }
        }
        $attributes .= ' class="'.($linkClasses).'"';

        // Build HTML output and pass through the proper filter.
        $item_output = sprintf(
            '%1$s<a%2$s>%3$s%4$s%5$s</a>%6$s',
            $args->before,
            $attributes,
            $args->link_before,
            apply_filters('the_title', $item->title, $item->ID),
            $args->link_after,
            $args->after
        );
        $output .= apply_filters('walker_nav_menu_start_el', $item_output, $item, $depth, $args);
    }
}
