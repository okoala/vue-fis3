<section class="c-selector">
	<ul>
		<li  v-repeat="items" v-class="active: isShown" class="lis" id="li{{$index}}">
			<h3 v-class="shown: isShown" v-tap="tap: onToggle(this,$index)">
				{{title}}
				<i v-class="icon-up: isShown,icon-down: !isShown"></i>
			</h3>
			<ul class="model" v-transition="" v-if="isShown">
				<li v-repeat="items" v-tap="choose-series-tap: nidong">{{content}}</li>
			</ul>
		</li>
	</ul>
</section>

