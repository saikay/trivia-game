var game = {
    total: 0,
    correct: 0,
    wrong: 0,
    questions: [],
    questionsIndex:0,
    start: function(){
        var shuffledQuestions = this.shuffle(questions);
        $("button").css("display","none");
        this.questions = shuffledQuestions;
        this.displayQuestion();
        
        
    },
    stop: function(){
        
    },
    setTimer: function(counter){
        var stopWatch = setInterval(function(){
            counter--;
            if(counter ==0){
                // time up show results;
                game.showResult();
                clearInterval(stopWatch);
            }
        },1000);
    },
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
        var questionDiv = $("<div>").addClass("question").text(game.questions[game.questionsIndex].question);
        var answers = this.shuffle(game.questions[game.questionsIndex].answers);
        var a = $("<div>").text("A. " + answers[0]);
        var b = $("<div>").text("B. " + answers[1]);
        var c = $("<div>").text("C. " + answers[2]);
        var d = $("<div>").text("D. " + answers[3]);
        $(".playGame").append(questionDiv);
        $(".playGame").append(a);
        $(".playGame").append(b);
        $(".playGame").append(c);
        $(".playGame").append(d);
        this.questionsIndex++;
        this.setTimer(30);
    },
    showResult:function(){
        
        $(".playGame").empty();
        var message = $("<h1>").text("Time out");
        var totalDiv = $("<div>").text("total: " + game.total);
        var correctDiv = $("<div>").text("correct: " + game.correct);
        var wrongDiv = $("<div>").text("wrong: " + game.wrong);
        $(".playGame").append(message);
        $(".playGame").append(totalDiv);
        $(".playGame").append(correctDiv);
        $(".playGame").append(wrongDiv);
        var timeOut = setTimeout(function(){
            $(".playGame").empty();
            game.displayQuestion();
            clearTimeout(timeOut);
        }, 5000);
    }
}

$("button").click(function(){
    game.start();
});
