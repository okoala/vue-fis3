<div class="p-index">
    <c-header></c-header>
    <div class="container">
        <div class="feed-sidebar">
            <div class="feed-sidebar-header">
                <h2>订阅源</h2>
            </div>
            <div class="feed-sidebar-list">
                <ul>
                    <li v-repeat="rss">
                        <span class="feed-logo">
                            <img src="{{image}}" alt="{{id}}" />
                        </span>
                        <span class="feed-name">{{name}}</span>
                        <span class="feed-update-count"></span>
                        <a class="feed-url" href="{{url}}" title="{{name}}" target="_blank">
                            <i class="g-icon icon-link"></i>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
        <div class="feed-container">
            <div class="feed-container-header">
                <h2>{{currentRss.name}}</h2>
            </div>
            <div class="feed-items-container">
            </div>
        </div>
    </div>
</div>
