// Tandem Select jQuery plugin
// https://github.com/craic/tandem_select_jquery_plugin
// Copyright 2011 Robert Jones jones@craic.com 
// Freely distributed under the MIT license
// Version 0.1  March 2011

jQuery.fn.tandemSelect = function () {

	var select_dst = this;

	// Find the container div for this element
	var container = this.parents().filter('.tandem-select-container');

	// define objects for each of the elements in the container
	var select_src = container.find('.tandem-select-src-select');

	var button_src = container.find('.tandem-select-move-to-src');
	var button_dst = container.find('.tandem-select-move-to-dst');
	var search_src = container.find('.tandem-select-search-src');
	var search_dst = container.find('.tandem-select-search-dst');

	// Setup the button that moves a value to the dst select
	button_dst.click(function () {
		// find selected records in select_dst and enable them, remove from select_src
	    select_src.find(':selected')
			.filter(':not(.tandem-select-option-disabled)')
			.clone()
			.appendTo(select_dst);

	    select_src.find(':selected')
			.filter(':not(.tandem-select-option-disabled)')
			.addClass('tandem-select-option-disabled')
			.attr('selected', false);
			
		// todo - Clear the search windows when a button is clicked?
	});

	// Setup the button that moves a value back to the src select
	button_src.click(function () {
		// Find selected dst records in select_src and highlight them
	    select_dst.find(':selected').map(function (){
			select_src.find("option[value='" + jQuery(this).attr('value') + "']")
				.removeClass('tandem-select-option-disabled');
	    });
		// Remove selected records from select_dst
	    select_dst.find(':selected').remove();
	});
	
	// Search the query string in the src select menu
    if ( search_src.length == 1 ) {
		search_src.keyup(function () {
			var search_str = jQuery(this).val();

			select_src.children()
				.attr('selected', '')
				.filter(function () {
			    	if (search_str == '') {
			      		return false;
			    	}
			    	return jQuery(this)
			      		.text()
			      		.indexOf(search_str) > - 1;
			  		})
			  	.attr('selected', 'selected');
		});
	}

	// Search the query string in the dst select menu - included for completeness
    if ( search_dst.length == 1 ) {
		search_dst.keyup(function () {
			var search_str = jQuery(this).val();

			select_dst.children()
				.attr('selected', '')
				.filter(function () {
			    	if (search_str == '') {
			      		return false;
			    	}
			    	return jQuery(this)
			      		.text()
			      		.indexOf(search_str) > - 1;
			  		})
			  	.attr('selected', 'selected');
		});
	}

	// prior to submit, select everything in select_dst and deselect everything in select_src
    if ( select_src.form ) {
		var form_selector = '#' + select_src.form.id.toString();
		jQuery(form_selector).submit(function () {
			select_dst.children().attr('selected', 'selected');
			select_src.children().attr('selected', false);
		});	
	}
};
