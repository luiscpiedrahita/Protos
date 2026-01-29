<header class="site-header">
  <nav
    class="navbar navbar-nav-scroll fixed-top navbar-expand-lg navbar-light mask-custom shadow-0 p-0"
  >
    <div class="top-bar-section container-fluid gx-0 p-0">
      <div class="title-area">
        <h1 class="navbar-brand site-title" itemprop="headline">
          <a href="/" class="logo">
            @svg('app/themes/protos/resources/images/logo.svg', ['class' => 'logo'])
          </a>
        </h1>
        <div class="navbar-toggler-wrapper">
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <div class="hamburger-toggle">
              <div class="hamburger">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </button>
        </div>
      </div>

      {{ do_action('lmseo_site_title') }}
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        {{
          wp_nav_menu([
            'theme_location' => 'top-bar',
            'menu' => 'main',
            'container' => '',
            'container_class' => 'top-bar-section',
            'container_id' => '',
            'menu_class' => 'navbar-nav',
            'menu_id' => 'primary-links',
            'echo' => true,
            'before' => '',
            'after' => '',
            'link_before' => '',
            'link_after' => '',
            'depth' => 0,
            'walker' => new \App\MainWalkerNavMenu(),
          ])
        }}
      </div>
      <div class="d-none d-lg-block d-lg-flex justify-content-end pe-lg-5">
        <div class="container g-3">
          <form class="search-form" method="get" action="/" role="search">
            <div class="row">
              <span class="col-xl-4">
                <a
                  class="d-lg-none d-xl-block nav-link hvr-underline-from-left float-start phone-link"
                  href="tel:+16262325218"
                >
                  626.232.5218
                </a>
              </span>
              <div class="col-lg-8 col-xl-6 g-lg-0 top-search-input-wrapper">
                <input
                  type="search"
                  name="s"
                  id="searchform-1"
                  placeholder="Search"
                  class="float-end top-search-input"
                />
                <button class="btn-search">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="currentColor"
                    class="bi bi-search"
                    viewBox="0 0 16 16"
                  >
                    <path
                      d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"
                    />
                  </svg>
                </button>
                <meta content="/?s={s}" />
              </div>
            </div>
          </form>
        </div>
      </div>
      @if ((isset($wp_registered_sidebars['header-right']) && is_active_sidebar('header-right')) || has_action('genesis_header_right'))
        <aside class="header-widget-area">
          {{ do_action('genesis_header_right') }}

          {{ dynamic_sidebar('header-right') }}
        </aside>
      @endif
    </div>
  </nav>
</header>
