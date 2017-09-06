// GLOBAL VARS
var 
  servicesURL = 'http://www.publicradioservices.info',
  // servicesURL = 'http://localhost:3000',
  audioPlayer = $('audio')[0],
  audioSource = $('audio').find('source');

/*
  NEWSCASTS
*/
var newsModule = $('section.newscasts');

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
    pubDate = newsType == 'bbc-headlines' ? getBBCHeadlinesLastUpdate() : news[newsType].pubDate;
    newsTypeSection.find('.last-update-time').text(formatDateTime(pubDate, true));
    newsTypeSection.removeClass('disabled');
  });

    // load BBC Headlines as default audio
  loadAudio(newsModule.find('.bbc-headlines').data('url'));

  // set BBC Headlines last update time
  // newsModule.find('.bbc-headlines .last-update-time').text(formatDateTime(getBBCHeadlinesLastUpdate()), true);
}

addEventHandlers(document.querySelectorAll('.news-ul li'));

/*
  INTERNET RADIO
*/

function titleComparator(titleAttr, a, b) {
    var articles = ['a', 'an', 'the'],
        re = new RegExp('^(?:(' + articles.join('|') + ') )(.*)$'), // e.g. /^(?:(foo|bar) )(.*)$/
        replacer = function ($0, $1, $2) {
            return $2 + ', ' + $1;
        };
    a = a[titleAttr].toLowerCase().replace(re, replacer);
    b = b[titleAttr].toLowerCase().replace(re, replacer);
    return a === b ? 0 : a < b ? -1 : 1;
}

function addHtmlToNode(node, data) {
  var totalHtml = '';
  data.forEach(function (el) { 
    var html = 
    '<li data-url="' + el.streamurl +'">' +
      '<div class="error-message">' +
        '<div>' +
          'Stream NOT WORKING in Chrome' +
        '</div>' +  
        '<div>' +
          'Try a different browser' +
        '</div>' +
      '</div>' +
      '<div class="content">' +
        '<h5 class="station-title">' + el.title + '</h5>' +
        '<div class="description">' + el.description + '</div>' +
        '<div class="internet-links">' +      
            '<a href=' + el.url + ' target="_blank">Website</a>' + 
            (el.donateurl !== null ? ' | <a href=' + el.donateurl + ' target="_blank">Donate</a>' : '') +
        '</div>' +
      '</div>'
    '</li>';
    totalHtml += html;
  });
  $(node).html(totalHtml);
}

var internetRadioColumns = $('.internet-ul');
var sortedStreams = streams.sort(titleComparator.bind(null, 'title'));

renderBalancedColumns(internetRadioColumns, sortedStreams, addHtmlToNode);

addEventHandlers(document.querySelectorAll('.internet-ul li'));

/*
  PODCASTS
*/

function addPodcastHtmlToNode(node, data) {
  var totalHtml = '';
  data.forEach(function (el) { 
    var html = 
    '<li data-url="' + el.url + '" class="' + (el.url === null ? 'disabled' : '') + '"">' +
      '<h5 class="station-title">' + el.showTitle + '</h5>' +
      '<div class="description">' + el.showDescription + ' ' +
        
      '</div>' +
      '<div class="last-update">' + el.episodeTitle + ' (' + formatDateTime(el.pubDate, false) + ')</div>' + 
      '<div class="internet-links">' +      
          '<a href=' + el.showUrl + ' target="_blank">Website</a>  | ' + 
          '<a href=' + el.sourceUrl + ' target="_blank">RSS</a>' +
      '</div>' +
    '</li>';
    totalHtml += html;
  });
  $(node).html(totalHtml);
}

_this = this;
$.ajax({
  url: servicesURL + '/podcasts',
  type: 'GET',
  dataType: 'JSON',
  success: function (data) {
    var podcasts = [];
    Object.keys(data.podcasts).forEach(function (key) { 
      podcast = data.podcasts[key];
      if (podcast !== null) {
        podcast['showDescription'] = _this.podDescriptions[key] !== undefined ? _this.podDescriptions[key] : "A good podcast.";
        podcasts.push(podcast);
      }
    });

    var podcastColumns = $('.podcast-list');

    // Sort by pub date
    /*
    var sortedPodcasts = podcasts.sort(function(a, b) { 
      var date1 = new Date(a.pubDate);
      var date2 = new Date(b.pubDate);
      if (date1 <  date2) return 1;
      if (date1 > date2) return -1; 
      return 0;
    });
    */

    // Sort alphabetically 
    var sortedPodcasts = podcasts.sort(titleComparator.bind(null, 'showTitle'));

    var twoMonthsAgo = new Date();
    twoMonthsAgo.setMonth(twoMonthsAgo.getMonth()-2);
    filteredPodcasts = sortedPodcasts.filter(function(el) {
      return new Date(el.pubDate) >= twoMonthsAgo;
    });
  
    renderBalancedColumns(podcastColumns, filteredPodcasts, addPodcastHtmlToNode);

    addEventHandlers(document.querySelectorAll('.podcast-list li'));
  }
});

/* 
  REQUESTS
*/

$('.button-primary').on('click', submitRequest);

function submitRequest (e) {
  e.preventDefault();
  $('.button-primary').attr('disabled','disabled');

  $.ajax({
      url: servicesURL + '/requests',
      type: 'POST',
      dataType: 'JSON',
      data: { 
        name : $('#request-name').val(), 
        url : $('#request-url').val(), 
        requestor : $('#request-requestor').val(),
        email : $('#request-email').val()
      },
      xhrFields: {
        withCredentials: true
      }
  }).fail(function(response) {
    showMessage(mapErrorCodesToMessages(response.responseJSON.errors));

  }).done(function() {
    showMessage('THANKS!');
    $("input:not(.button-primary)").val('');

  }).always(function() {
    $('.button-primary').removeAttr('disabled');
  });

  return false;
}

var timeout;
function showMessage (message) {
  $('.banner').addClass('show').html(message);
  clearTimeout(timeout);
  timeout = window.setTimeout(function() {  $('.banner').removeClass('show'); }, 3500);
}

// message banner dismissal
$(document).on('click', function (e) { 
  if ($('.banner').has(e.target).length === 0) {
    $('.banner').removeClass('show');
  }
});

function mapErrorCodesToMessages (codes) {
  var messages = [];

  if (codes.name) {
    if (codes.name === 'not-present') {
      messages.push('Program name is required.')
    }
    if (codes.name === 'too-long') {
      messages.push('Program name can\'t exceed 200 characters.');
    }
  }
  if (codes.url) {
    if (codes.url === 'not-valid') {
      messages.push('That url doesn\'t exist! :(');
    }
  }

  return messages.reduce(function(a, b) { return a + '</br>' + b; });
}

/*
  ABOUT
*/

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

function areCookiesEnabled () {
  var cookieEnabled = (navigator.cookieEnabled) ? true : false;
  if (typeof navigator.cookieEnabled == "undefined" && !cookieEnabled) { 
      document.cookie = 'testcookie';
      cookieEnabled = (document.cookie.indexOf("testcookie") != -1) ? true : false;
  }
  return cookieEnabled;
}

getVisitorCount();
setInterval(getVisitorCount, 60000); // 1 minute

/*
 Event handlers and utility functions
 */
function renderBalancedColumns(UIcolumns, media, renderFunction) {
  var columnSize = Math.round(media.length / 3)
  for (var i = 0; i < 3; i++) {
    renderFunction(
      UIcolumns[i], 
      media.slice(i*columnSize, i == 2 ? media.length : (i+1)*columnSize)
    );
  }
}

function addEventHandlers(elements) {
  for (var i = elements.length - 1; i >= 0; i--) {
    $el = $(elements[i]);
    addHoverStyling($el);
    addPlayAudioHandler($el);
  }
}

function addPlayAudioHandler($el) {
  $el.on('click', function (e) { 
    if (e.target.tagName !== 'A') { // because of the child 'A' tags
      playAudioHandler(e);
    }
  });
}

// Adds hover styling. 
// We need to do this via JS in order to bypass styling on touch devices
function addHoverStyling($el) {
    $el.on('touchstart mouseenter', function (e) {    
      $('li').removeClass('hover');
      e.currentTarget.classList.add('hover');
    });

    $el.on('mouseleave touchmove click taphold', function (e) {
      e.currentTarget.classList.remove('hover');
    });
}

// Adds styling for currently playing audio (when audio player clicked)
audioPlayer.onplay = function () {
  $('li').removeClass('now-playing');
  var url = $(audioPlayer).find('source').attr('src');
  $('li[data-url="' + url + '"]').addClass('now-playing');
}

// Removes styling for currently playing audio (when audio player clicked)
audioPlayer.onpause = function () {
  $('li').removeClass('now-playing');
}

function playAudioHandler (e) {
  e.preventDefault();

  if ($(e.target).parent().hasClass('disabled')) {
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
    case 32: // spacebar                    

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
    case 37: // back arrow
      audioPlayer.currentTime -= 15
      break;
    case 39: // forward arrow
      audioPlayer.currentTime += 15
      break;
    case 27: // esc key
      $('.banner').removeClass('show');
      break;
  }
  return false;
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

// Adds error messages superimposed above media

document.getElementsByTagName('source')[0].addEventListener('error', function (e) { 
  erroringUrl = e.currentTarget.src;
  erroringPanel = $('li[data-url="'+ erroringUrl + '"]');
  erroringPanel.find('.error-message').show();
  erroringPanel.find('.content').addClass('disabled');
}); 
