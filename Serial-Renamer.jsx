function buildUI(thisObj){
    var main_wnd;

    if(thisObj instanceof Panel){
        main_wnd = thisObj ;
    }else{
        main_wnd = new Window("palette", "Serial-Renamer", undefined, {resizeable : true});
    }

    main_wnd.preferredSize = [200,200]

    var input_text = main_wnd.add("edittext", undefined, "",{multiline : true});
    input_text.alignment = ["fill","fill"];
    
    var check_is = main_wnd.add("checkbox", [30, 10, 220, 30],"Ignore space (recommend)");
    check_is.value = true
    check_is.alignment = ["fill","bottom"];

    var ok_btn = main_wnd.add("button", undefined, "OK");
    ok_btn.alignment = ["fill","bottom"];

    main_wnd.layout.layout();

    ok_btn.onClick = function(){

        var text_data = input_text.text.replace(/\r?\n/g, '')
        var activeItem = app.project.activeItem;
        
        if (check_is.value == true) text_data = text_data.replace(/\s+/g, "");

        if(activeItem){
            if(activeItem.selectedLayers.length <= text_data.length){
                for (var i = 0; i <= Number(activeItem.selectedLayers.length); i++) activeItem.selectedLayers[i].name = text_data.charAt(i);
            }else{
                alert("The number of characters is greater than the number of layers selected.");
            }
        }else{
            alert("The active item is not selected.");
        }
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
