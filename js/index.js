/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

$('.section-category .title li').on('tap', function() {
    $('.section-category .title li').removeClass('selected');
    $(this).addClass('selected');
    var index = $(this).index();
    var unit = 100;

    $('#J_slider').css({
        '-webkit-transform': 'translate(' + unit * index + '%, 0px) translateZ(0px)'
    })

    $('.section-category .sub-con').hide();
    $('.section-category .sub-con').eq(index).show();
})

var x1 = 0,
    y1 = 0,
    x2 = 0,
    y2 = 0,
    offset = [0, 0],
    currentOffset = 0,
    index = 0,
    t1 = 0,
    t2 = 0,
    carousel = $('.carousel-wp'),
    touchTimeout = null,
    indicators = $('.section-indicator span');
width = $('.section-carousel').width();

// init
carousel.css({
    '-webkit-transform': 'translate(-' + width + 'px, 0px) translateZ(0px)'
});
currentOffset = -width;

$('.section-carousel').on('touchstart', function(e) {
    e.stopPropagation();
    e.preventDefault();
    var touch = e.touches[0];
    x1 = touch.pageX;
    y1 = touch.pageY;
    t1 = (new Date()).getTime();
})

$('.section-carousel').on('touchmove', function(e) {
    e.stopPropagation();
    e.preventDefault();
    var touch = e.touches[0];
    x2 = touch.pageX;
    y2 = touch.pageY;
    offset = [x2 - x1, y2 - y1];
    var deltaX = (currentOffset + offset[0]);
    carousel.css({
        '-webkit-transform': 'translate(' + deltaX + 'px, 0px) translateZ(0px)'
    });

})

$('.section-carousel').on('touchend', function(e) {
    e.stopPropagation();
    e.preventDefault();

    t2 = (new Date()).getTime();

    if ((t2 - t1) < 200) {
        if (offset[0] > 0) {
            index += 1;
        } else if (offset[0] == 0) {

        } else {
            index -= 1;
        }
    } else {
        if (offset[0] > width / 2) {
            // index +1
            index += 1;
        } else if (offset[0] <= width / 2 && offset[0] >= -width / 2) {
            // index stays
        } else {
            // index -1
            index -= 1;
        }
    }



    currentOffset = (index - 1) * width;



    carousel.css({
        '-webkit-transform': 'translate(' + currentOffset + 'px, 0px) translateZ(0px)',
        '-webkit-transition': '300ms',
        'transition': '300ms'
    });
})

carousel.on('webkitTransitionEnd transitionend', function(e) {
    carousel.css({
        '-webkit-transition': '0ms',
        'transition': '0ms'
    });
    if (index == 1) {
        // go back
        index = -3;
        currentOffset = (index - 1) * width;
        carousel.css({
            '-webkit-transform': 'translate(' + currentOffset + 'px, 0px) translateZ(0px)'
        });
    }
    if (index == -4) {
        // go forward
        index = 0;
        currentOffset = (index - 1) * width;
        carousel.css({
            '-webkit-transform': 'translate(' + currentOffset + 'px, 0px) translateZ(0px)'
        });
    }
    indicators.removeClass('selected');
    indicators.eq(-index).addClass('selected');
})