/* https://github.com/ifightcrime/bootstrap-growl */

(function($) {

  $.bootstrapGrowl = function(message, options) {

    var options = $.extend({}, $.bootstrapGrowl.default_options, options);

    var $alert = $('<div>');

    $alert.attr('class', 'bootstrap-growl alert');

    if (options.type) {
        $alert.addClass('alert-' + options.type);
    }

    if (options.allow_dismiss) {
      $alert.append('<a class="close" data-dismiss="alert" href="#">&times;</a>');
    }

    if(options.type == null) {
      message = '<span class="label label-warning"><i class="icon-warning-sign icon-white"></i> Warning</span> ' + message;
    } else if (options.type == 'info') {
      message = '<span class="label label-info"><i class="icon-info-sign icon-white"></i> Info</span> ' + message;
    } else if (options.type == 'error') {
      message = '<span class="label label-important"><i class="icon-exclamation-sign icon-white"></i> Error</span> ' + message;
    } else if (options.type == 'success') {
      message = '<span class="label label-success"><i class="icon-ok-sign icon-white"></i> Success</span> ' + message;
    } 

    $alert.append(message);

    var top_offset = options.top_offset;
    var current = $('.bootstrap-growl', options.ele);

    // calculate any 'stack-up'
    $.each(current, function() {
      top_offset = top_offset + $(this).outerHeight() + options.stackup_spacing;
    });

    $alert.css({
      'position': 'absolute',
      'top': top_offset + 'px',
      'border': '1px solid ' + $alert.css('color'),
      'margin': 0,
      'z-index': '9999',
      'display': 'none'
    });

    if (options.width !== 'auto') {
      $alert.css('width', options.width + 'px');
    }

    // have to append before we can use outerWidth()
    $(options.ele).append($alert);

    switch(options.align) {
      case 'center':
        $alert.css({
          'left': '50%',
          'margin-left': '-' + ($alert.outerWidth() / 2) + 'px'
        });
        break;
      case 'left':
        $alert.css('left', '20px');
        break;
      default:
        $alert.css('right', '20px');
    }

    $alert.fadeIn();
    // Only remove after delay if delay is more than 0
    if(options.delay >= 0){
      $alert.delay(options.delay).fadeOut('slow', function() {
        $(this).remove();
      });
    }

  };

  $.bootstrapGrowl.default_options = {
    ele: 'body',
    type: null,
    top_offset: 20,
    align: 'right', // (left, right, or center)
    width: 250,
    delay: 4000,
    allow_dismiss: true,
    stackup_spacing: 10
  };

})(jQuery);
