var elems = document.getElementsByClassName('bg-anim');

function getCoords(elem) {
    var box = elem.getBoundingClientRect();
    var scrollTop = window.pageYOffset;
    var top  = box.top + scrollTop;

    return { top: Math.round(top) };
}

function bgscroll() { 

	pageY = window.pageYOffset || document.documentElement.scrollTop;
	clientY = document.documentElement.clientHeight ;

	for (i=0; i<elems.length; i++){

	elemTop = getCoords(elems[i]).top;

	   if (elemTop < pageY+clientY && pageY < elemTop+elems[i].offsetHeight ) {
			elems[i].style.backgroundPosition = "0px " + Math.floor((pageY-elemTop)*0.4) +"px";
	   }
	}
}

window.onscroll = function(){
	firstAnim();
	bgscroll();
	showMenu();
}

function firstAnim(){
	var anim_block = document.getElementsByClassName('text-anim');

	if(anim_block[anim_block.length-1].style.opacity == ''){
		for (var i = 1; i < anim_block.length; i++) {
			if(getCoords(anim_block[i]).top - $(window).height()/1.3 < window.pageYOffset && anim_block[i].style.opacity == ''){
				thisAnim(anim_block[i], anim_block[anim_block.length-1], i);
			}
		}
	}
}

function thisAnim(animElem, lastElem, count){
	var count_block = document.getElementsByClassName('price');

	if(count % 2 == 0){
		console.log($(window).width() - animElem.getBoundingClientRect().right, 'yes');
		$(animElem).css('transform', 'translate(-' + $(window).width() + 'px, 0px)');
	} else {
		console.log($(window).width() - animElem.getBoundingClientRect().right);
		$(animElem).css('transform', 'translate(' + $(window).width()+ 'px, 0px)');
	}

	$(animElem).animate({
		opacity: 1
	}, 50, function(){
		var single_block = this.getElementsByClassName('description-item');
		for (var i = 0; i < single_block.length; i++) {
			setTimeout( function(locI){
				return function(){ $(single_block[locI]).css('transform', 'scale(1)'); }
			}(i), 500*i);
		}
		this.style.transform = 'translate(0px, 0px)';
	});

	if (animElem == lastElem) {
		for (var i = count_block.length - 1; i >= 0; i--) {
	  	showCount(count_block[i]);
	  	}
	}
}

function showMenu(){
	if( getCoords(elems[0]).top + elems[0].offsetHeight <= window.pageYOffset){
		document.querySelector(".navbar").style.top = '0px';
	} else {
		document.querySelector(".navbar").style.top = '-60px';
	}
}

function showCount(countElem){
	 var endCount = countElem.innerHTML;
	$({numberValue: 0}).animate({numberValue: +endCount}, { 
		duration: 2500,
		easing: "linear", 
		step: function(val) {  
			$(countElem).html(Math.ceil(val));
		}
	}); 
}

$(document).ready(function() {
	$("#phone").inputmask("+38(999)999-99-99")
});

$(document).ready(function(){
    $("body").on("click","a", function (event) {
        event.preventDefault();
        var id  = $(this).attr('href'),
            top = $(id).offset().top;
        $('body,html').animate({scrollTop: top}, 1000);
    });
});