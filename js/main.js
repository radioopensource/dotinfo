var 
  audioPlayer = $('audio')[0],
  audioSource = $('audio').find('source'),
  // servicesURL = 'http://www.publicradioservices.info',
  servicesURL = 'http://localhost:3000',
  newsModule = $('#newscasts');

// load default audio
loadAudio(newsModule.find('.bbc-headlines').data('url'));
// set default audio last update time
newsModule.find('.bbc-headlines .last-update-time').text(formatDateTime(getBBCHeadlinesLastUpdate()), true)
newsModule.find('.bbc-headlines').removeClass('spin');

// "loading" messaging
setInterval(function() { $('.loading .text').toggleClass('black') }, 400); // 0.5 second     
audioPlayer.oncanplay = function () {
  $('.loading').hide();
}

// Internet Radio
function addHtmlToNode(node, data) {
  var totalHtml = '';
  data.forEach(function ({description, donateurl, streamurl, title, url}) { 
    var html = 
    '<li data-url="' + streamurl +'">' +
      '<h5 class="station-title">' + title + '</h5>' +
      '<div class="description">' + description + '</div>' +
      '<div class="internet-links">' +      
          '<a href=' + url + ' target="_blank">Website</a> | ' + 
          '<a href=' + donateurl + ' target="_blank">Donate</a>' +
      '</div>' +
    '</li>';
    totalHtml += html;
  });
  $(node).html(totalHtml);
}

var internetRadioColumns = $('.internet-ul');
addHtmlToNode(internetRadioColumns[0], streams.slice(0, 5));
addHtmlToNode(internetRadioColumns[1], streams.slice(5, 10));
addHtmlToNode(internetRadioColumns[2], streams.slice(10, 15));

$('.news-ul li, .internet-ul li').on('click', function (e) { 
  if (e.target.tagName !== 'A') {
    playAudioHandler(e);
  }
});

// Podcasts

function addPodcastHtmlToNode(node, data) {
  var totalHtml = '';
  data.forEach(function ({showTitle, rssUrl, streamurl, episodeTitle, url, pubDate}) { 
    var html = 
    '<li data-url="' + url +'">' +
      '<h5 class="station-title">' + showTitle + '</h5>' +
      '<div class="description">' + episodeTitle + '</div>' +
      '<div class="last-update">' +
          'Last update: ' + formatDateTime(pubDate, false) +
      '</div>' +
      '<div class="internet-links">' +      
          '<a href=' + url + ' target="_blank">Website</a>  | ' + 
          '<a href=' + rssUrl + ' target="_blank">RSS</a>' +
      '</div>' +
    '</li>';
    totalHtml += html;
  });
  $(node).html(totalHtml);
}

$.ajax({
  url: servicesURL + '/podcasts',
  type: 'GET',
  dataType: 'JSON',
  success: function (data) {
    let podcasts = [];
    Object.keys(data.podcasts).forEach( function(key) { 
      podcasts.push(data.podcasts[key]);
    });
    var podcastColumns = $('.podcast-list');
    addPodcastHtmlToNode(podcastColumns[0], podcasts.slice(0, 5));
    addPodcastHtmlToNode(podcastColumns[1], podcasts.slice(5, 10));
    addPodcastHtmlToNode(podcastColumns[2], podcasts.slice(10, 15));

    $('.podcast-list li').on('click', function (e) { 
      if (e.target.tagName !== 'A') {
        playAudioHandler(e);
      }
    });
  }
});

function playAudioHandler (e) {
  e.preventDefault();

  if ($(e.target).parent().hasClass('spin')) {
    return;
  }

  var clickedAudio = e.currentTarget.getAttribute('data-url');

  if (clickedSameAudio(clickedAudio)) {
    if (audioPlayer.paused) {
      audioPlayer.play();
    } else {
      audioPlayer.pause();  
    }
    return;
  }

  if ($(e.target).hasClass('radio')) {
    $('.loading').show();
  }

  playAudio(clickedAudio);
}

function playAudio (audioUrl) {
  loadAudio(audioUrl);
  audioPlayer.oncanplaythrough = audioPlayer.play();
}

function loadAudio (audioUrl) {
  audioSource.attr('src', audioUrl);
  audioPlayer.pause();
  audioPlayer.load();
}

function clickedSameAudio (currentAudioSrc) {
  return !audioPlayer.ended && (0 < audioPlayer.currentTime)
  && currentAudioSrc === audioSource.attr('src');
}

window.addEventListener('keydown', onKeyDown, false);

function onKeyDown (e) {
  switch (e.keyCode) {
    case 32: //spacebar                    

      if ($('textarea, input').is(':focus')) {
        return;
      }

      e.preventDefault();
      if (audioPlayer.paused) {            
          audioPlayer.play();
      } else {
          audioPlayer.pause();
      } 
      break;
    case 37: //back arrow
      audioPlayer.currentTime -= 15
      break;
    case 39: //forward arrow
      audioPlayer.currentTime += 15
      break;
    case 27: //esc key
      $('.banner').hide();
      break;
  }
  return false;
}

$.ajax({
  url: servicesURL + '/newscasts',
  type: 'GET',
  dataType: 'JSON',
  success: function (data) {
    refreshNewsFor(data.newscasts);
  }
});

function refreshNewsFor (news) {
  Object.keys(news).forEach( function(newsType) { 
    var newsTypeSection = newsModule.find('li.' + newsType);
    newsTypeSection[0].setAttribute('data-url', news[newsType].url);
    newsTypeSection.find('.last-update-time').text(formatDateTime(news[newsType].pubDate, true));
    newsTypeSection.removeClass('spin');
  })
}

function formatDateTime (rawDateTimeString, includeTimeFlag) {
  function getFormattedTime (fourDigitTime) {
      var hours24 = parseInt(fourDigitTime.substring(0, 2), 10);
      var hours = ((hours24 + 11) % 12) + 1;
      var amPm = hours24 > 11 ? 'pm' : 'am';
      var minutes = fourDigitTime.substring(3, 5);

      return hours + ':' + minutes + amPm;
  }

  var dateTimeTokens = new Date(rawDateTimeString).toString().split(' ');
  var formattedDateTime = dateTimeTokens[1] + " " + dateTimeTokens[2];

  if (includeTimeFlag === false) {
    return formattedDateTime;
  }

  formattedDateTime = formattedDateTime +   
    ", " + getFormattedTime(dateTimeTokens[4]) + 
    " " + dateTimeTokens[6].replace(/[{()}]/g, '');

  return formattedDateTime;
};  

function getBBCHeadlinesLastUpdate () {
  var 
    minsToChangeTo = 35,
    now = new Date(),
    nowMins = now.getMinutes();

  now.setMinutes(minsToChangeTo);
  var changeToLastHour = (nowMins - minsToChangeTo < 0);
  if (changeToLastHour) { now.setHours(now.getHours()-1); }

  return now.toString();
}

$('.submit').on('click', submitRequest);

function submitRequest () {
  $('.submit').attr('disabled','disabled');
  showMessage('Submitting request...');

  $.ajax({
      url: servicesURL + '/requests',
      type: 'POST',
      dataType: 'JSON',
      data: { info : $('#info').val(), url : $('#url').val(), requestor : $('#requestor').val() },
      xhrFields: {
        withCredentials: true
      }
  }).fail(function(response) {
    showMessage(mapErrorCodesToMessages(response.responseJSON.errors));
  }).done(function() {
    showMessage('   THANKS!   ');
    $('input').val('');
  }).always(function() {
    $('.submit').removeAttr('disabled');
  })
}

function showMessage (message) {
  $('.banner').show().find('.text').html(message);
  setTimeout(function() {  $('.banner').hide(); }, 5000);
}

// message banner dismissal
$(document).on('click', function (e) { 
  if ($('.banner').has(e.target).length === 0) {
    $('.banner').hide();
  }
});

function mapErrorCodesToMessages (codes) {
  var messages = [];

  if (codes.info) {
    if (codes.info === 'not-present') {
      messages.push('Comment is required.')
    }
    if (codes.info === 'too-long') {
      messages.push('Comment can\'t exceed 200 characters.');
    }
  }
  if (codes.url) {
    if (codes.url === 'not-valid') {
      messages.push('That url doesn\'t exist! :(');
    }
  }

  return messages.reduce(function(a, b) { return a + '</br>' + b; });
}

function areCookiesEnabled () {
  var cookieEnabled = (navigator.cookieEnabled) ? true : false;
  if (typeof navigator.cookieEnabled == "undefined" && !cookieEnabled) { 
      document.cookie = 'testcookie';
      cookieEnabled = (document.cookie.indexOf("testcookie") != -1) ? true : false;
  }
  return cookieEnabled;
}

function getVisitorCount () {
  if (areCookiesEnabled()) {
    $.ajax({
      url: servicesURL + '/visitor-count',
      type: 'GET',
      dataType: 'JSON',
      xhrFields: {
        withCredentials: true
      },
      success: function (data) {
        $('.visitor-count').text(data.count);
      }
    });
  }
}

getVisitorCount();
setInterval(getVisitorCount, 60000); // 1 minute

window.onload = function () {
  var podToAutoplay = parseInt(window.location.search.replace('?pod=', ''));
  if (!Number.isNaN(podToAutoplay)) {
    playAudio($('.listen').get(podToAutoplay).href)
  }
};
