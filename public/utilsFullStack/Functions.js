class Functions {
  parse ( str ) {
    var args = [].slice.call(arguments, 1),
    i = 0;

    return str.replace(/%s/g, function() {
      return args[i++];
    });
  }

  adjustPosition ( targetId ) {
    const target = document.getElementById(targetId);
    window.scroll( 0, target.offsetTop - 70 );
  }

  USDateFormat ( timestamp ) {
    const monthNames = [ 'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    const date = new Date( timestamp );
    const month = monthNames[ date.getMonth() ];
    const day = date.getDate();
    const year = date.getFullYear();

    return [ month, day, year ].join(' ');
  }

  EventDelegation ( event, callback ) {
    let target = event.target || event.srcElement;
    const currentTarget = event.currentTarget;
    while ( target !== currentTarget ) {
      if ( typeof callback === 'function' ) {
        // exit while loop callback should return false
        if ( !callback( target ) ) return;
      }
      target = target.parentNode;
    }
  }

  FileSizeFormat ( bytes, decimals ) {
    if ( bytes == 0) return '0 Bytes';
    let k = 1024,
      dm = decimals || 2,
      sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
      i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }
}

// Add to exports for node, or window for browser
if ( typeof module !== 'undefined' && module.exports ) {
  module.exports = new Functions()
} else {
  this.Functions = new Functions()
}
