( $ => {
  const charts = window.charts;

  const checkStatus = () => {
    return [
      $('input[name=chart_1]').is(':checked'),
      $('input[name=chart_2]').is(':checked')
    ]
  }

  $('#chart_1>p.pic-container').click( event => {
    const status = checkStatus();
    $('input[name=chart_1]').prop('checked', !status[0]);
    $('input[name=chart_2]').prop('checked', status[0]);
  })

  $('#chart_2>p.pic-container').click( event => {
    const status = checkStatus();
    $('input[name=chart_1]').prop('checked', status[1]);
    $('input[name=chart_2]').prop('checked', !status[1]);
  })

  // $('#next').click( event => {
  $('p.pic-container').click( event => {
    const status = checkStatus();
    if (
      !( status[0] && status[1] ) &&
      ( status[0] || status[1] )
    ) {
      sendResult()
    } else {
      alert('One and only one picture should be chosen!')
    }
  })

  function sendResult () {
    const chosen = + !$('input[name=chart_1]').is(':checked');
    const chartKey = 'chart_' + ( chosen + 1 );
    const reqBody = {
      round: window.round,
      matchId: charts._id,
      inventoryId: charts[chartKey]['_id'],
      chosen: + !$('input[name=chart_1]').is(':checked')
    }

    $.post('/choice', reqBody)
    .done( res => {
      [
        () => {},
        () => {
          window.location.reload()
        },
        () => {
          alert('You have just finished this round, please wait the server a few seconds for generating the new match.')
          setTimeout(() => {
            window.location.reload()
          }, 2500)
        }
      ][res.success]();
    })
  }
})(jQuery)