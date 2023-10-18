function buildUI(thisObj){
    var main_wnd;

    if(thisObj instanceof Panel){
        main_wnd = thisObj ;
    }else{
        main_wnd = new Window("palette", "Marker-Time-Measure", undefined, {resizeable : true});
    }

    main_wnd.preferredSize = [200,200]

    var input_text = main_wnd.add("edittext", undefined, "",{multiline : true, readonly : true});
    input_text.alignment = ["fill","fill"];

    var ok_btn = main_wnd.add("button", undefined, "OK");
    ok_btn.alignment = ["fill","bottom"];

    main_wnd.layout.layout();

    ok_btn.onClick = function(){

        var text_data = input_text.text.replace(/\r?\n/g, '')
        var activeItem = app.project.activeItem;
        var comp_duration = activeItem.duration;
        var framerate = activeItem.frameRate;
        var marker_num = activeItem.markerProperty.numKeys;
        var result_text = "";
        var time_difference_start = "";
        var time_difference_end = "";
        var time_difference_all = "";

        if(activeItem){
            if(marker_num != 0){
                if(timeToCurrentFormat(activeItem.markerProperty.keyTime(1),framerate).indexOf(":") == -1){
                    for ( var i = 1;  i < marker_num;  i++){
                        
                        time_difference_start = String(timeToCurrentFormat(activeItem.markerProperty.keyTime(i),framerate));
                        time_difference_end = String(timeToCurrentFormat(activeItem.markerProperty.keyTime(i+1),framerate));
                        
                        if (time_difference_start != 0) time_difference_start = time_difference_start.replace(/^0+/, "");
                        if (time_difference_end != 0) time_difference_end = time_difference_end.replace(/^0+/, "");
                        
                        time_difference = String(parseInt(time_difference_end) - parseInt(time_difference_start));
                        result_text += "" + activeItem.markerProperty.keyValue(i).comment.replace(/\r?\n/g, '') + " - " +activeItem.markerProperty.keyValue(i+1).comment.replace(/\r?\n/g, '') + " : " + time_difference + "\n";
                    }
                }else{
                    alert("Change the timeline timecode display format to frames.");
                }
            }else{
                alert("Marker is not set.");
            }
        }else{
            alert("The active item is not selected.");
        }
    result_text += "" + activeItem.markerProperty.keyValue(marker_num).comment.replace(/\r?\n/g, '') + " - End : " +String((comp_duration*framerate) - parseInt(time_difference_end)) + "\n";
    input_text.text = result_text.replace(/\n+$/g,'');
    }

    main_wnd.onResize = function(){
        main_wnd.layout.resize();
    }

    return main_wnd;
}

var toolspanel = buildUI (this);

if(!(toolspanel instanceof Panel)){
    toolspanel.center();
    toolspanel.show();
}
