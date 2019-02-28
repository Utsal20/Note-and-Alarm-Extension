window.onload = function() {
    var table = document.getElementById("box");
    getData();
    
    function getData () {
        var texts = JSON.parse(localStorage.getItem('tasks'));
        
        var date = new Date();
        var row;
        if (texts != null) {
            for (var i=0; i < texts.length; i++) {
                row = table.insertRow(-1);
        
                var isToday = false;
                if ((date.getMonth() + 1 == parseInt(texts[i][0].slice(5,7))) && (date.getDate() == parseInt(texts[i][0].slice(8,10)))) {
                    isToday = true;
                }
        
                for (var j=0; j < texts[i].length; j++) {
                    var cell = row.insertCell(-1);
                    var tempCell = texts[i][j];
                    cell.innerHTML = tempCell;
                    if (isToday)
                        cell.style.backgroundColor = "#e2dede";
                    else
                        cell.style.backgroundColor = "#f2f2f2";
                }
            }
        }
    }

    var addFieldBtn = document.getElementById("addField");
    addFieldBtn.addEventListener("click", function(event) {
        var date = document.getElementById("dateField").value || '';
        var detail = document.getElementById("detailField").value || '';
        var out = document.getElementById("output");
        if ((date == '') || (detail == '')) {
            out.style.color="#e83e3e";
            out.innerHTML = "Fields left empty!";
        }
        else {
            try {
                out.style.color="#25c481";
                out.innerHTML = "Success!";

                let itemsArray = JSON.parse(localStorage.getItem('tasks')) || [];
                itemsArray.push([date, detail]);

                localStorage.setItem('tasks', JSON.stringify(itemsArray));
                location.reload();
            }
            catch(e) {
                out.style.color="#e83e3e";
                out.innerHTML = "Failed!";
                console.log(e);
            }
        }
    });

    var addAlarmBtn = document.getElementById("addAlarm");
    addAlarmBtn.addEventListener("click", function(event) {
        chrome.alarms.create('NoteAlarm', {
            delayInMinutes: 0.1,
            periodInMinutes: 0.1
        });
    });

    var delAlarmBtn = document.getElementById("delAlarm");
    delAlarmBtn.addEventListener("click", function(event) {
        chrome.alarms.clear('NoteAlarm');
    });
}
