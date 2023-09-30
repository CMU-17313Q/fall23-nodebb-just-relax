<div class="card background-link-container" style="border-color: {../bgColor}">
    {{{each ./posts}}}
    <!-- IF @first -->
    <!-- ENDIF @first -->
    {{{end}}}

    <!-- IF !../posts.length -->
    <div component="category/posts">
        <div class="post-content">
            [[category:no_new_posts]]
        </div>
    </div>
    <!-- ENDIF !../posts.length -->
</div>
