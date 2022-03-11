$responseOption = $('.js-responseOption')
$responseCard = $('.js-responseCard')

$.Velocity.hook($('.js-responseCard'), 'translateY', '1rem')
$.Velocity.hook($('.js-responseCard'), 'opacity', 0)

$responseCard.velocity
  opacity: 1
  translateY: [0, [500, 20]]
,
  delay: 250
  complete: ->
    $(this).attr('style', '')

$(document).on 'click', '.js-responseOption', (e) ->
  $this = $(this)
  message = $this.text()
  $this.velocity
    opacity: 0.5
  ,
    duration: 25
    complete: ->
      $this.velocity({ 
        opacity: 0.5 
       }, 
         duration: 25
       ).velocity({ 
         opacity: 1 
       }, 
         duration: 40
       ).velocity({ 
         opacity: 0.5 
       }, 
         duration: 25
       ).velocity({ 
         opacity: 1 
       }, 
         duration: 40
         complete: ->
           appendMessage(message)
       )
      
  
appendMessage = (message) ->
  $('.js-responseCard').velocity
    scale: 1
    opacity: 0
    height: 0
    translateY: '-1rem'
  ,
    complete: ->
      $(this).remove()
      addExpertMessageTimeout = setTimeout(addExpertMessage(message), 100)

      addCustomerMessageTimeout = setTimeout(addCustomerMessage, 1600)
      
      addResponseCardTimeout = setTimeout(addResponseCard, 4600)
      
addExpertMessage = (message) ->
  $('.ChatWindow-inner').append('
    <div class="ChatItem ChatItem--expert is-added" style="opacity: 0;">
      <div class="ChatItem-chatContent">
        <div class="ChatItem-chatText">' + message + '</div>
        <div class="ChatItem-timeStamp"><strong>Me</strong> · Today 05:49</div>
      </div>
    </div>
  ')
  $('.ChatWindow').animate({scrollTop: $('.ChatWindow').prop("scrollHeight")}, 500)

  $.Velocity.hook($('.is-added'), 'translateY', '0.5rem')

  $('.is-added').velocity
    opacity: 1
    translateY: 0
  ,
    complete: ->
      $('.is-added').removeClass('is-added')    
        
addCustomerMessage = =>
  $('.ChatWindow-inner').append('
    <div class="ChatItem ChatItem--customer is-added" style="opacity: 0;">
      <div class="ChatItem-meta">
        <div class="ChatItem-avatar">
          <img class="ChatItem-avatarImage" src="https://image.ibb.co/eTiXWa/avatarrobot.png">
        </div>
      </div>
      <div class="ChatItem-chatContent">
        <div class="MessageLoading">
          <div class="MessageLoading-dot"></div>
          <div class="MessageLoading-dot"></div>
          <div class="MessageLoading-dot"></div>
        </div>
      </div>
    </div>
  ')
  
  $('.ChatWindow').animate({scrollTop: $('.ChatWindow').prop("scrollHeight")}, 500)

  $.Velocity.hook($('.is-added'), 'translateY', '0.5rem')

  $('.is-added').velocity
    opacity: 1
    translateY: 0
  ,
    complete: ->
      setTimeout(addRealMessage, 1000)
      
addRealMessage = ->
  randomMessage = new Array( "ok thx i'll try that", "i don't even know", "hold on i have to tell my husband to be quiet", "is this tray that pops out of my desktop computer a cup holder? hold one let me try it", "i have the hiccups, do you know a cure", "you ask a lot of questions", "give me a sec let me check")
  randomPick = randomMessage[Math.floor( Math.random() * randomMessage.length )]
  $('.is-added .MessageLoading').remove()
  $('.is-added .ChatItem-chatContent').append('
    <div class="RealMessage" style="opacity:0;">
      <div class="ChatItem-chatText">' + randomPick + '</div>
      <div class="ChatItem-timeStamp"><strong>Chat Bot</strong> • Today 05:49</div>
    </div>
  ')
  
  $('.ChatWindow').animate({scrollTop: $('.ChatWindow').prop("scrollHeight")}, 500)
  
  $('.RealMessage').velocity
    opacity: 1
  ,
    duration: 150
    complete: ->
      $('.is-added').removeClass('is-added')
    
addResponseCard = ->
  $('.ChatWindow-inner').append('
    <div class="ResponseCard js-responseCard is-added" style="opacity: 0">
      <div class="ResponseCard-option js-responseOption">Hi there! What time slots are available?</div>
      <div class="ResponseCard-option js-responseOption"Can I get the Working Hours?</div>
      <div class="ResponseCard-option js-responseOption">Hey, Want to know the fee structure here</div>
    </div>
  ')
  
  $('.ChatWindow').animate({scrollTop: $('.ChatWindow').prop("scrollHeight")}, 500)
  
  $.Velocity.hook($('.is-added'), 'translateY', '0.5rem')
  $.Velocity.hook($('.is-added'), 'opacity', '0')
  
  $('.is-added').velocity
    opacity: 1
    translateY: [0, [500, 20]]
  ,
    delay: 550
    complete: ->
      $(this).attr('style', '')
      $('.is-added').removeClass('is-added')    