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
      console.log(pagination)
      if ( !paginationFirstLoad ) {
        window.location.href = `/progress/${pageNumber}`;
      } else {
        paginationFirstLoad = 0;
      }
        // template method of yourself
        // var html = template(data);
        // dataContainer.html(html);
    }


  })
})(jQuery)