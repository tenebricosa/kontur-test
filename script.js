$(document).ready(function(){
	function format(value) {
		value = parseFloat(value, 10) || 0
		value = String(value).split('').reverse()
		var a = []
		for (var i = 0; i < value.length; i++) {
        	if (i % 3 == 0) {
				a.push(' ')
			}
			a.push(value[i])
    	}
		return a.reverse().join('')
	}

	function get_sum(){
		var sum = 0
		$(".line__amount").each(function(){
			var v = $(this).text().replace(/\ /g,'')
			sum += parseFloat(v, 10) || 0
		})
		$('.summator__total__amount').text(format(sum))
	}

	function on_resize(){
		var height = $('.container').height() + $('.summator__total').height() * 2
		$('.summator__total').toggleClass("summator__total__fixed", height >= $(window).height())
	}

	function on_scroll() {
		var scroll = $(window).scrollTop() + $(window).height() == $(document).height()
		$('.summator__total').toggleClass("summator__total__fixed", !scroll)
	}

	on_resize()
	on_scroll()
	$(window).resize(on_resize)
	.scroll(on_scroll);

	$(".summator__new_line").click(function(){
		var summator = $(".summator tbody")
		var line = $("<tr>").addClass("summator__line summator__line__edit line").prependTo(summator)
		var cell = $("<td>").addClass("line__cell__col_1 line__cell").appendTo(line)
		var input = $("<input>").attr("type","text").addClass("line__editor").appendTo(cell).focus()
		var amount = $("<span>").addClass("line__amount").appendTo(cell)
		var cell = $("<td>").addClass("line__cell__col_2 line__cell").appendTo(line)
		var save = $("<input>").attr("type","button").attr("value","Сохранить").addClass("line__save").appendTo(cell)
		var del = $("<a>").attr("href","#").addClass("line__delete").appendTo(cell).text('Удалить')
		on_resize()
	})

	$('.summator').on('click','.line__delete', function(e){
		e.stopPropagation()
		e.preventDefault()
		$(this).parents('.line').remove()
		get_sum()
		on_resize()
	}).on('click', '.line:not(.summator__line__edit)', function(e){
		var val = $(this).find('.line__amount').text().replace(/\ /g,'')
		val = parseFloat(val, 10) || 0
		$(this).find('.line__editor').val(val)
		$(this).addClass('summator__line__edit')
	}).on('click', '.summator__line__edit .line__save', function(e) {
		e.stopPropagation()
		var line = $(this).parents('.line')
		var val = $(line).find('.line__editor').val()
		$(line).find('.line__amount').text(format(val))
		$(line).removeClass("summator__line__edit")
		get_sum()
	}).on('keypress', '.line__editor', function(e) {
	    if (e.which == 13) {
	        $(this).parents('.line').find('.line__save').click()
	    }
	})

})