var game = {
    total: 0,
    correct: 0,
    wrong: 0,
    questions: [],
    questionsIndex:0,
    stopWatch: null,
    isGameOver: false,
    start: function(){
        this.total =0;
        this.correct =0;
        this.wrong = 0;
        this.questions = [];
        this.questionsIndex = 0;
        this.stopWatch = null;
        this.isGameOver = false;
        var shuffledQuestions = this.shuffle(questions);
        $("button").css("display","none");
        this.questions = shuffledQuestions;
        this.displayQuestion();
        
        
    },
    setTimer: function(counter){
        clearInterval(game.stopWatch);

        game.stopWatch = setInterval(function(){
            counter--;
            game.showTimer(counter);
            if(counter ==0){
                // time up show results;
                game.showResult();
                clearInterval(game.stopWatch);
            }
        },1000);
    },
    showTimer: function(counter){
        $(".timer").text(counter);
    },

    //shuffle any array
    shuffle: function(arr){
        var index = 0;
        var temp;
        for(var i = arr.length - 1; i >0; i--){
            index = Math.floor(Math.random() * i);
            temp = arr[index];
            arr[index] = arr[i]
            arr[i] = temp; 
        }
        return arr;
    },

    displayQuestion: function(){ 
        if(!game.isGameOver){
            //clear click listener
            if(choiceListener != null){
                choiceListener = null;
            }

            var item = game.questions[game.questionsIndex];
            var timerDiv = $("<div>").addClass("timer").text("30");
            var questionDiv = $("<div>").addClass("question").text(item.question);
            var correctAnswerDiv = $("<div>").addClass("answer").text(item.correctAnswer).css("display","none");
            var choices = this.shuffle(item.answers);
            var a = $("<div>").addClass("choice").text(choices[0]);
            var b = $("<div>").addClass("choice").text(choices[1]);
            var c = $("<div>").addClass("choice").text(choices[2]);
            var d = $("<div>").addClass("choice").text(choices[3]);
            $(".playGame").append(timerDiv);
            $(".playGame").append(questionDiv);
            $(".playGame").append(correctAnswerDiv);
            $(".playGame").append(a);
            $(".playGame").append(b);
            $(".playGame").append(c);
            $(".playGame").append(d);
            this.questionsIndex++;
            this.setTimer(30);

            //set click listener
            var choiceListener = $(".choice").click(function(){
                var answer = $(this).text();
                game.showResult(answer);
            });

        }
    },
    showResult:function(answer){
        var message = "";
        game.total++;

        //clear timer from display question.
        clearInterval (game.stopWatch);

        //check answer
        if(answer == $(".answer").text()){
            game.correct++;
            message = $("<h1>").text("Correct answer");
        }else{
            game.wrong++;
            message = $("<h1>").text("Wrong Answer");
        }

        $(".playGame").empty();
        var totalDiv = $("<div>").text("total: " + game.total);
        var correctDiv = $("<div>").text("correct: " + game.correct);
        var wrongDiv = $("<div>").text("wrong: " + game.wrong);
        $(".playGame").append(message);
        $(".playGame").append(totalDiv);
        $(".playGame").append(correctDiv);
        $(".playGame").append(wrongDiv);
        
        //check if it last question.
        if(game.questions.length == game.questionsIndex){
            game.isGameOver =true;
        }
        if(game.isGameOver){
            $("button").css("display","block");
        }else{
            var timeOut = setTimeout(function(){
                $(".playGame").empty();
                game.displayQuestion();
                clearTimeout(timeOut);
            }, 5000);
        }
        
    }

}

$("button").click(function(){
    game.start();
});

