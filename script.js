document.addEventListener('DOMContentLoaded', ()=> {
    var cardsArray=[
        {
            name: 'card2',
            img: 'card2.png'
        },
        {
            name: 'card2',
            img: 'card2.png'
        },
        {
            name: 'card3',
            img: 'card3.png'
        },
        {
            name: 'card3',
            img: 'card3.png'
        },
        {
            name: 'card4',
            img: 'card4.png'
        },
        {
            name: 'card4',
            img: 'card4.png'
        },
        {
            name: 'card5',
            img: 'card5.png'
        },
        {
            name: 'card5',
            img: 'card5.png'
        },
        {
            name: 'card6',
            img: 'card6.png'
        },
        {
            name: 'card6',
            img: 'card6.png'
        },
        {
            name: 'card7',
            img: 'card7.png'
        },
        {
            name: 'card7',
            img: 'card7.png'
        },
        
    ]
    cardsArray.sort(()=>0.5-Math.random())
    var game=document.querySelector('.game');
    var resultDisplay = document.querySelector('#result')
    var cardChosen=[];
    var cardChosenId=[];
    var cardWon=[];
    var click=0;
    var person="";
    var score=0;
    var click_counter = document.querySelector('#counter')
    var start_button_click=false;
    var textArea='';
    const downloadToFile = (content, filename, contentType) => {
        const a = document.createElement('a');
        const file = new Blob([content], {type: contentType});
        a.href= URL.createObjectURL(file);
        a.download = filename;
        a.click();
        URL.revokeObjectURL(a.href);
      };
    //Funkcja tworząca calą grę na podstawie obiektów w tablicy
    function createBoard(){
        for(var i=0; i<cardsArray.length; i++){
            var card=document.createElement('img')
            card.setAttribute('src','card-deck.png')
            card.setAttribute('data-id',i)
            card.setAttribute('id',i)
            card.addEventListener('click', flipCard)
            game.appendChild(card)
        }
    }
    //Funkcja sprawdza czy dwie wybrane karty są takie same jeżeli są to w wybrane miejsca pojawiają się białe obrazki jeżeli nie to nadpisuje je podstawowym
    function checkForMatch(){
        var cards = document.querySelectorAll('img')
        var optionOneId = cardChosenId[0];
        var optionTwoId = cardChosenId[1];
        if(cardChosen[0]===cardChosen[1]){
            cards[optionOneId].setAttribute('src', 'blank.png')
            cards[optionTwoId].setAttribute('src', 'blank.png')
            cardWon.push(cards)
            score++;
            
        }else{
            cards[optionOneId].setAttribute('src', 'card-deck.png')
            cards[optionTwoId].setAttribute('src', 'card-deck.png')
        }
        cardChosen=[]
        cardChosenId=[]
        resultDisplay.textContent=cardWon.length
        if(cardWon.length === cardsArray.length/2){
            resultDisplay.textContent='Wygrałeś'
            person = prompt("Podaj nazwę gracza");
			if (person != null) {
                localStorage.setItem(person, click);   
                  //Funckja zapisuje dane ostatniego gracza do pliku txt
                  document.querySelector('#btnSave').addEventListener('click', () => {
                    textArea=person+" twój wynik to :"+click;
                    downloadToFile(textArea, 'my-new-file.txt', 'text/plain');
                  });
			  }else{
                  alert("Nie podałeś swojej nazwy")
              }
        }
    }
    //Funckja odwracająca karty
    function flipCard(){
        click++;
        var cardId =this.getAttribute('data-id')
        var cardIDD=document.getElementById(cardId)
        cardIDD.classList.add("animate"); 
        cardChosen.push(cardsArray[cardId].name)
        cardChosenId.push(cardId)
        this.setAttribute('src', cardsArray[cardId].img)
        click_counter.textContent=click
        if(cardChosen.length === 2){
            setTimeout(checkForMatch, 500)
        }
    }
    function start(){
        document.getElementById("start_button").addEventListener("click", function() {
                createBoard();
                start_button_click=true;
                if(start_button_click===true){
                    if(start_button_click===true){
                        document.getElementById("start_button").remove("click", function() {
                        }); 
                    }
                }
          }); 
    }
    function reset(){
        document.getElementById("reset_button").addEventListener("click", function() {
            location.reload(true);
          }); 
    }
    $( function() {
        
        for (var i = 0; i < localStorage.length; i++){
            var key   = localStorage.key(i);
			var value = localStorage.getItem(key);
            document.getElementById("dialog").innerHTML+=key + ": " + value+"<br>";
        }
        $( "#dialog" ).dialog({
          autoOpen: false,
          show: {
            effect: "blind",
            duration: 1000
          },
          hide: {
            effect: "explode",
            duration: 1000
          }
        });
     
        $( "#players" ).on( "click", function() {
          $( "#dialog" ).dialog( "open" );
        });
      } );

      
    start()
    reset()
})