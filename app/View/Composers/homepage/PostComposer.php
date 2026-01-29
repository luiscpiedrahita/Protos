<?php

namespace App\View\Composers\homepage;

use Roots\Acorn\View\Composer;

class PostComposer extends Composer
{
    /**
     * List of views served by this composer.
     *
     * @var string[]
     */
    protected static $views = [ 
       'partials.homepage.recent-posts' //
    ];
    public function with()
    {
        return [
            'latest_posts' => $this->getLatestPosts(),
        ];
    }

    protected function getLatestPosts()
    {
        return get_posts([
            'post_type' => 'post',
            'posts_per_page' => 3, // Get the 5 latest posts
            'post_status' => 'publish',
        ]);
    }
}
