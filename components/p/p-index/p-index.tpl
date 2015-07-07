<div class="p-index">
    <c-header></c-header>
    <div class="container">
        <div class="feed-sidebar">
            <div class="feed-sidebar-header">
                <h2>订阅源</h2>
            </div>
            <div class="feed-sidebar-list">
                <ul>
                    <li v-repeat="item: rss" v-class="current: item.isActive" v-on="click: chooseRss(item, $index)">
                        <span class="feed-logo">
                            <img src="{{item.image}}" alt="{{item.id}}" />
                        </span>
                        <span class="feed-name">{{item.name}}</span>
                        <a class="feed-url" href="{{item.url}}" title="{{item.name}}" target="_blank">
                            <i class="g-icon icon-link"></i>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
        <div class="feed-container">
            <div class="feed-container-header">
                <h2>{{currentRss.desc}}</h2>
            </div>
            <div class="feed-items-container">
                <div v-repeat="item: currentRss.data.items" v-show="item.data.length">
                    <div class="feed-items-timeline">{{item.dataName}}</div>
                    <div class="feed-item" v-repeat="item.data">
                        <div class="feed-thumb" style="background-image: url({{thumb}})">
                            <a href="{{url}}" target="_blank"><img src="{{thumb}}" alt="Flux – Joseph a avoué"></a>
                        </div>
                        <div class="feed-describe">
                            <h2 class="feed-title"><a href="{{url}}" target="_blank">{{title}}</a></h2>
                            <p class="feed-description">{{description}}</p>
                            <div class="feed-item-info">
                                <div class="feed-item-count">
                                    <span class="feed-fav">
                                        <i class="g-icon icon-fav favHandler"></i>
                                        <i class="feed-fav-total">{{faved}}</i>
                                    </span>
                                    <span class="feed-view">
                                        <i class="g-icon icon-viewed"></i>
                                        <i class="feed-view-total">{{click}}</i>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>
</div>
