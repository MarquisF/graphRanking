($ => {
  let paginationFirstLoad = 1;
  $('body').pagination({
    dataSource: new Array( window.countInfo.allCount ),
    pageSize: window.pageCapacity,
    pageNumber: window.page,
    showGoInput: true,
    showGoButton: true,
    // formatGoInput: 'go to <%= input %> st/rd/th',
    // className: 'paginationjs-small',

    callback: function( data, pagination ) {
      const { pageNumber } = pagination;
      if ( !paginationFirstLoad ) {
        window.location.href = `/ranking/${pageNumber}`;
      } else {
        paginationFirstLoad = 0;
      }
    }


  })
})(jQuery)