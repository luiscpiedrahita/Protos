@php
  $count = 0;
  $fades = [
    'fade-right',
    'fade-up',
    'fade-left',
  ];
@endphp

<a class="anchor" id="recent-posts"></a>
<section class="recent-posts container-fluid overflow-hidden">
  <div class="">
    <div class="container recent-post-wrapper">
      <h1 class="recent-posts-title">Recent Posts</h1>
      <div class="recent-posts-content">
        <div class="recent-posts-list">
          <div class="rounded">
            <div class="row">
              {{--
                @posts($latest_posts)
                
                <h2 class="entry-title">@title</h2>
                <div class="entry-content">
                {{wp_trim_words(get_the_content(), 100, '')}}
                
                </div>
                @endposts
              --}}
              @if ($latest_posts)
                @foreach ($latest_posts as $post)
                  <div
                    class="col-sm-12 col-lg-4 columns"
                    data-aos="{{ $fades[$loop->index] }}"
                    data-aos-offset="300"
                  >
                    <h4>
                      <a href="{{ get_permalink($post->ID) }}">
                        {{ get_the_title($post->ID) }}
                      </a>
                    </h4>
                    <hr />
                    <p data-equalizer-watch>
                      {{ wp_trim_words(apply_filters('the_content', $post->post_content), 100, '') }}
                      […]
                    </p>
                    <p class="entry-meta">
                      By
                      <span
                        class="entry-author"
                        itemprop="author"
                        itemscope="itemscope"
                        itemtype="https://schema.org/Person"
                      >
                        <a
                          href="{{ get_author_posts_url(get_the_author_meta('ID')) }}"
                          class="entry-author-link"
                          itemprop="url"
                          rel="author"
                        >
                          <span class="entry-author-name" itemprop="name">
                            {{ get_the_author() }}
                          </span>
                        </a>
                      </span>
                      <time
                        class="entry-time"
                        itemprop="datePublished"
                        datetime="{{ get_the_date('c') }} "
                      >
                        {{ get_the_date() }}
                      </time>
                      @if (is_admin_bar_showing())
                        <a
                          class="post-edit-link"
                          href="{{ get_edit_post_link() }}"
                        >
                          (Edit)
                        </a>
                      @endif
                    </p>
                  </div>
                @endforeach
              @endif
            </div>
          </div>
        </div>
      </div>
      <div class="col text-center mt-5">
        <a href="/blog/" class="home-button xlarge-button grey-button">
          More Posts
        </a>
      </div>
    </div>
  </div>
</section>
