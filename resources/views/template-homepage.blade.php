{{--
  Template Name: Homepage Template
--}}

@extends('layouts.homepage')

@section('content')
  @while(have_posts()) @php(the_post())
    @include('partials.homepage.featured-banner')
    @include('partials.homepage.catalog')
    @include('partials.homepage.tap-titles')
    @include('partials.homepage.projects')
    @include('partials.homepage.social')
    @include('partials.homepage.recent-posts')
    @include('partials.homepage.services')
    @include('partials.homepage.about')
    @include('partials.homepage.contact')
  @endwhile
@endsection
