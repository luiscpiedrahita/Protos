<footer class="footer dark-bg">
  @include('partials.footer')
  <div class="container-fluid">
    <div class="footer-widgets row">
      @php(dynamic_sidebar('sidebar-primary'))
      @php(dynamic_sidebar('sidebar-footer'))
    </div>
  </div>
</footer>
