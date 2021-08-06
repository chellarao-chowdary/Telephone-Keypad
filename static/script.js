var dialerVal = "";

var count = 0;

var downTime, upTime, timeDiff;  //current mousedown, mouseup, mouseup-mousedown time

var delayDiff;  // time diff between current mousedown and previous mouseup

var check = false;



function updateDialerVal(number){
    dialerVal += number;
    $('#dailer').val(dialerVal);
}

$(document).ready(() => {

    //on changing text-box 
    $("#dailer").on("input", function(e) {
        dialerVal = $("#dailer").val();
    });

    //clicks for *, 0, #
    $('.last_row').click( function(){
        var number =  $(this).val();
        updateDialerVal(number);
    });

    // clicks for 1-9
    $("button:not('.last_row')").mousedown(function(e){

        downTime = e.timeStamp;
        return false;

    }).mouseup(function(e){

        delayDiff = downTime - upTime;
        delayDiff = isNaN(delayDiff)?0:delayDiff;
        console.log(`delay Diff is ${delayDiff}`);

        upTime = e.timeStamp;
        
        timeDiff = upTime - downTime;

        console.log(`Time Diff is ${timeDiff}`);
        var dialNum = $(this).val();

        if(timeDiff < 500 && delayDiff<=1100){
            // no delay
            count++;
            if(count == 1){
                dialerVal = (dialerVal=="" || check)?dialerVal:dialerVal.slice(0, -1);
                var firstChar = $(this).find("span").text().slice(0, 1);
                updateDialerVal(firstChar);
                // console.log(dialerVal);
                check = false;
            }
            else if(count == 2){
                dialerVal = dialerVal.slice(0, -1);
                // console.log(dialerVal);
                var secondChar = $(this).find("span").text().slice(2, 3);
                // console.log(secondChar);
                updateDialerVal(secondChar);
            }
            else if(count == 3){
                dialerVal = dialerVal.slice(0, -1);
                // console.log(dialerVal);
                var thirdChar = $(this).find("span").text().slice(4, 5);
                // console.log(thirdChar);
                updateDialerVal(thirdChar);
                if(dialNum != "7" && dialNum != "9"){
                    count = 0;
                }
            }
            else if(count == 4){
                dialerVal = dialerVal.slice(0, -1);
                // console.log(dialerVal);
                var fourthChar = $(this).find("span").text().slice(6, 7);
                // console.log(fourthChar);
                updateDialerVal(fourthChar);
                count = 0;
            }
        }
        else if(timeDiff < 500 && delayDiff>1100){
            // delay // add alag se new 
            count = 1;
            var firstChar = $(this).find("span").text().slice(0, 1);
            console.log(firstChar);
            updateDialerVal(firstChar);
        }

        else if(timeDiff >= 500){
            // long-press 
            count = 0;
            check = true;
            var number = $(this).val();
            updateDialerVal(number);
        }

        return false; 

    });

    $("button").mouseleave(function(e){
        count = 0;
        check = true;
    });

});
