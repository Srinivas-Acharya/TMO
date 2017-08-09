var mainMenu = (function() {

	var $listItems = $( '#mainmenu > ul > li.has-submenu' ),
		$menuItems = $listItems.children( 'a' ),
		$body = $( 'body' ),
		current = -1;

	function init() {
		$menuItems.on( 'mouseover', open );
		$listItems.on( 'mouseout', function( event ) { event.stopPropagation(); } );
	}

	function open( event ) {	
		var $item = $( event.currentTarget ).parent( 'li.has-submenu' ),
			idx = $item.index();
		if($item.length != 0){
			if( current !== -1 ) {
				$listItems.eq( current ).removeClass( 'mainmenu-open' );
			}

			if( current === idx ) {
				$item.removeClass( 'mainmenu-open' );
				current = -1;
			}
			else {
				$item.addClass( 'mainmenu-open' );
				current = idx;
				$body.off( 'mouseout' ).on( 'mouseout', close );
			}
			return false;
		}
		else window.location = $item.find('a').attr('href');
	}

	function close( event ) {
		if(current===-1){
			$listItems.removeClass( 'mainmenu-open' );
			$listItems.eq( 3).removeClass( 'mainmenu-open' );
			$listItems.eq( 4 ).removeClass( 'mainmenu-open' );
		}
		$listItems.eq( current ).removeClass( 'mainmenu-open' );
		current = -1;
	}

	return { init : init };

})();