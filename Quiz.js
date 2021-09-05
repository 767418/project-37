class Quiz {
  constructor(){}

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      contestant = new Contestant();
      var contestantCountRef = await database.ref('contestantCount').once("value");
      if(contestantCountRef.exists()){
        contestantCount = contestantCountRef.val();
        contestant.getCount();
      }
      question = new Question()
      question.display();
    }
  }

  play(){
    question.hide();    

    //write code to show a heading for showing the result of Quiz
    text("Result of the Quiz", 200, 200);

    //call getContestantInfo( ) here
    Contestant.getPlayerInfo();

    //write condition to check if contestantInfo is not undefined
    if (allContestants !== undefined) {
      var displayAnswers = 250;
      fill("blue");
      text("NOTE: player(s) who answered correctly are highlighted in green", 300, 250);

      for(var plr in allContestants) {
        var correctAnswer="2";
        if (correctAnswer === allContestants[plr].answer) {
          fill("green");
        } else {
          fill("red");
        }

        displayAnswers+=30;

        text(allContestants[plr].name+": "+allContestants[plr].answer, 350, displayAnswers);
      }
    }    
  }
}
