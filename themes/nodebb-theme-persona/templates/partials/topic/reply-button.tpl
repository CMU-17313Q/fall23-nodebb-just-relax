<div component="topic/reply/container" class="btn-group action-bar bottom-sheet <!-- IF !privileges.topics:reply -->hidden<!-- ENDIF !privileges.topics:reply -->">
    <!-- IF isResolved -->
    <a href="#" class="btn btn-sm btn-primary disabled" component="topic/reply" data-ajaxify="false" role="button"><i class="fa fa-reply visible-xs-inline"></i><span class="visible-sm-inline visible-md-inline visible-lg-inline"> [[topic:reply]]</span></a>
    <!-- ELSE -->
    <a href="{config.relative_path}/compose?tid={tid}&title={title}" class="btn btn-sm btn-primary" component="topic/reply" data-ajaxify="false" role="button"><i class="fa fa-reply visible-xs-inline"></i><span class="visible-sm-inline visible-md-inline visible-lg-inline"> [[topic:reply]]</span></a>
    <!-- ENDIF isResolved -->
    <button type="button" class="btn btn-sm btn-primary dropdown-toggle" data-toggle="dropdown">
        <span class="caret"></span>
    </button>
    <ul class="dropdown-menu pull-right" role="menu">
        <li><a href="#" component="topic/reply-as-topic">[[topic:reply-as-topic]]</a></li>
    </ul>
</div>

<!-- IF loggedIn -->
<!-- IF !privileges.topics:reply -->
<!-- IF locked -->
<a component="topic/reply/locked" class="btn btn-sm btn-primary" disabled><i class="fa fa-lock"></i> [[topic:locked]]</a>
<!-- ENDIF locked -->
<!-- ENDIF !privileges.topics:reply -->

<!-- IF !locked -->
<a component="topic/reply/locked" class="btn btn-sm btn-primary hidden" disabled><i class="fa fa-lock"></i> [[topic:locked]]</a>
<!-- ENDIF !locked -->

<!-- ELSE -->

<!-- IF !privileges.topics:reply -->
<a component="topic/reply/guest" href="{config.relative_path}/login" class="btn btn-sm btn-primary">[[topic:guest-login-reply]]</a>
<!-- ENDIF !privileges.topics:reply -->
<!-- ENDIF loggedIn -->

<script>
    // Assuming you have a variable 'isResolved' that indicates whether the post is resolved
    const isResolved = /* Replace this with your logic to determine if the post is resolved */;

    // Get the reply button element
    const replyButton = document.querySelector('div.component.topic/reply/container a.btn');

    // Disable the reply button if the post is resolved
    if (isResolved) {
        replyButton.classList.add('disabled');
    }
</script>
